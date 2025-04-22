from datetime import datetime, timedelta, date, time
from Model.servicos import BarbeariaServicos
from Model.agendamento import Agendamento, criar_agendamento_db, buscar_agend_barbeiro, buscar_agend_cliente, deletar_agend
from config.config import db

def validacao_client_id(form):
    if "client_id" not in form:
        raise ValueError("Campo 'client_id' não informado.")
    if form['client_id'] is None:
        raise ValueError("Campo 'client_id' está vazio.")
    if not isinstance(form['client_id'], int):
        raise ValueError("Campo 'client_id' deve ser um número inteiro.")
    return True

def validacao_barber_id(form):
    if "barber_id" not in form:
        raise ValueError("Campo 'barber_id' não informado.")
    if form['barber_id'] is None:
        raise ValueError("Campo 'barber_id' está vazio.")
    if not isinstance(form['barber_id'], int):
        raise ValueError("Campo 'barber_id' deve ser um número inteiro.")
    return True

def validacao_service_id(form):
    if "service_id" not in form:
        raise ValueError("Campo 'service_id' não informado.")
    if form['service_id'] is None:
        raise ValueError("Campo 'service_id' está vazio.")
    if not isinstance(form['service_id'], int):
        raise ValueError("Campo 'service_id' deve ser um número inteiro.")
    return True

def validacao_data_agend(form):
    if "data_agend" not in form:
        raise ValueError("Campo 'data_agend' não informado.")
    if form['data_agend'] is None:
        raise ValueError("Campo 'data_agend' está vazio.")
    if isinstance(form['data_agend'], (datetime, date)):
        return form['data_agend'] if isinstance(form['data_agend'], date) else form['data_agend'].date()
    try:
        return datetime.strptime(form['data_agend'], "%Y-%m-%d").date()
    except ValueError:
        raise ValueError("Formato de data inválido. Use 'YYYY-MM-DD'.")

def validacao_inicio_agend(form):
    if "inicio_agend" not in form:
        raise ValueError("Campo 'inicio_agend' não informado.")
    if form['inicio_agend'] is None:
        raise ValueError("Campo 'inicio_agend' está vazio.")
    if isinstance(form['inicio_agend'], time):
        return form['inicio_agend']
    try:
        return datetime.strptime(form['inicio_agend'], "%H:%M").time()
    except ValueError:
        raise ValueError("Formato de hora inválido. Use 'HH:MM'.")

def buscar_duracao_servico(service_id):
    servico = BarbeariaServicos.query.filter_by(id=service_id).first()
    if not servico:
        raise ValueError("Serviço não encontrado.")
    return servico.duracao_minutos  # em minutos

def calcular_fim_agend(inicio, duracao):
    if not isinstance(duracao, int):
        raise ValueError("Duração do serviço deve ser um número inteiro (minutos).")
    inicio_dt = datetime.combine(datetime.today(), inicio)
    fim_dt = inicio_dt + timedelta(minutes=duracao)
    return fim_dt.time()

def validacao_agendamento(form):
    errors = {}
    agendamento_formatado = {}

    try:
        validacao_client_id(form)
        agendamento_formatado["client_id"] = form["client_id"]
    except ValueError as e:
        errors["client_id"] = str(e)

    try:
        validacao_barber_id(form)
        agendamento_formatado["barber_id"] = form["barber_id"]
    except ValueError as e:
        errors["barber_id"] = str(e)

    try:
        validacao_service_id(form)
        agendamento_formatado["service_id"] = form["service_id"]
    except ValueError as e:
        errors["service_id"] = str(e)

    try:
        data_agend = validacao_data_agend(form)
        agendamento_formatado["data_agend"] = data_agend
    except ValueError as e:
        errors["data_agend"] = str(e)

    try:
        inicio_agend = validacao_inicio_agend(form)
        agendamento_formatado["inicio_agend"] = inicio_agend
    except ValueError as e:
        errors["inicio_agend"] = str(e)

    try:
        duracao = buscar_duracao_servico(form["service_id"])
        fim_agend = calcular_fim_agend(agendamento_formatado["inicio_agend"], duracao)
        agendamento_formatado["fim_agend"] = fim_agend
    except ValueError as e:
        errors["fim_agend"] = str(e)

    if errors:
        return errors
    return agendamento_formatado


def verificar_conflito_horario(barber_id, data_agend, inicio_agend, fim_agend):
    conflitos = Agendamento.query.filter(
        Agendamento.barber_id == barber_id,
        Agendamento.data_agend == data_agend,
        Agendamento.inicio_agend < fim_agend,
        Agendamento.fim_agend > inicio_agend
    ).all()

    if conflitos:
        return True, conflitos
    return False, None


def criar_agendamento(form):
    result_validacao = validacao_agendamento(form)

    if isinstance(result_validacao, dict) and 'client_id' not in result_validacao:
        return {
            'message': 'Erro no agendamento do serviço',
            'errors': result_validacao,
            'status_code': 400
        }

    dados = result_validacao

    conflito, _ = verificar_conflito_horario(
        dados["barber_id"],
        dados["data_agend"],
        dados["inicio_agend"],
        dados["fim_agend"]
    )

    if conflito:
        return {
            'message': 'Conflito de horário: o barbeiro já possui agendamento nesse horário.',
            'status_code': 409
        }

    try:
        agendamento = criar_agendamento_db(dados)
        return {
            'message': 'Agendamento criado com sucesso',
            'agendamento_id': agendamento.id,
            'status_code': 201
        }

    except Exception as e:
        return {
            'message': 'Erro interno ao criar agendamento',
            'error': str(e),
            'status_code': 500
        }
    
def listar_agend_barbeiro(id):
    response = buscar_agend_barbeiro(id)
    return response

def listar_agend_cliente(id):
    response = buscar_agend_cliente(id)
    return response


def remover_agend(id):
    status = deletar_agend(id)
    return status


def editar_agendamento(id, form):
    # Validar e formatar os dados do agendamento
    result_validacao = validacao_agendamento(form)

    if isinstance(result_validacao, dict) and 'client_id' not in result_validacao:
        return {
            'message': 'Erro na edição do agendamento',
            'errors': result_validacao,
            'status_code': 400
        }

    dados = result_validacao

    # Verificar se o agendamento existe
    agendamento = Agendamento.query.get(id)
    if not agendamento:
        return {
            'message': 'Agendamento não encontrado.',
            'status_code': 404
        }

    # Verificar se existe algum conflito de horário com o barbeiro
    conflito, _ = verificar_conflito_horario(
        dados["barber_id"],
        dados["data_agend"],
        dados["inicio_agend"],
        dados["fim_agend"]
    )

    if conflito:
        return {
            'message': 'Conflito de horário: o barbeiro já possui agendamento nesse horário.',
            'status_code': 409
        }

    try:
        # Atualizar os dados do agendamento
        agendamento.client_id = dados["client_id"]
        agendamento.barber_id = dados["barber_id"]
        agendamento.service_id = dados["service_id"]
        agendamento.data_agend = dados["data_agend"]
        agendamento.inicio_agend = dados["inicio_agend"]
        agendamento.fim_agend = dados["fim_agend"]

        db.session.commit()

        return {
            'message': 'Agendamento editado com sucesso',
            'agendamento_id': agendamento.id,
            'status_code': 200
        }

    except Exception as e:
        return {
            'message': 'Erro interno ao editar agendamento',
            'error': str(e),
            'status_code': 500
        }