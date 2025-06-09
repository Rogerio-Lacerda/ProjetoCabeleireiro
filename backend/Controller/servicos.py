from Model.servicos import listar_servicos, criar_servico, editar_servico, excluir_servico
import re

### Validação Cadastro de Serviço ###
def validacao_nome(form):
    if "nome" not in form:
        raise ValueError("Campo 'nome' não informado.")

    if not form['nome']:
        raise ValueError("Campo 'nome' está vazio.")

    if not isinstance(form['nome'], str):
        raise ValueError("Campo 'nome' deve ser uma string.")

    if len(form['nome']) > 100:
        raise ValueError("Campo 'nome' deve ter no máximo 100 caracteres.")

    return True

def validacao_descricao(form):
    if "descricao" not in form:
        return True  # opcional no cadastro
    
    if not isinstance(form['descricao'], str):
        raise ValueError("Campo 'descricao' deve ser uma string.")

    if len(form['descricao']) > 500:
        raise ValueError("Campo 'descricao' deve ter no máximo 500 caracteres.")

    return True

def validacao_preco(form):
    if "preco" not in form:
        raise ValueError("Campo 'preco' não informado.")

    if form['preco'] is None or not isinstance(form['preco'], (int, float)) or form['preco'] <= 0:
        raise ValueError("Campo 'preco' deve ser um número maior que zero.")

    return True

def validacao_duracao(form):
    if "duracao_minutos" not in form:
        raise ValueError("Campo 'duracao_minutos' não informado.")

    if not isinstance(form['duracao_minutos'], int) or form['duracao_minutos'] <= 0:
        raise ValueError("Campo 'duracao_minutos' deve ser um número inteiro maior que zero.")

    return True

def validacao_form_servico(form):
    errors = {}

    try:
        validacao_nome(form)
    except ValueError as e:
        errors['nome'] = str(e)

    try:
        validacao_descricao(form)
    except ValueError as e:
        errors['descricao'] = str(e)

    try:
        validacao_preco(form)
    except ValueError as e:
        errors['preco'] = str(e)

    try:
        validacao_duracao(form)
    except ValueError as e:
        errors['duracao_minutos'] = str(e)

    if errors:
        return errors
    else:
        return True

### Controller — Cadastro Serviço ###
def create_servico_controller(form):
    result_validacao = validacao_form_servico(form)
    if result_validacao != True:
        return {'message': 'Erro no cadastro do serviço', 'errors': result_validacao, 'status_code': 400}

    id_servico = criar_servico(form)

    if isinstance(id_servico, tuple):
        return {'message': id_servico[1], 'status_code': 400}

    return {'message': 'Serviço cadastrado com sucesso', 'id': id_servico, 'status_code': 201}

### Controller — Edição Serviço ###
def editar_servico_controller(id_servico, form):
    # Validação parcial — só valida se o campo existir no form
    errors = {}

    if 'nome' in form:
        try:
            validacao_nome(form)
        except ValueError as e:
            errors['nome'] = str(e)

    if 'descricao' in form:
        try:
            validacao_descricao(form)
        except ValueError as e:
            errors['descricao'] = str(e)

    if 'preco' in form:
        try:
            validacao_preco(form)
        except ValueError as e:
            errors['preco'] = str(e)

    if 'duracao_minutos' in form:
        try:
            validacao_duracao(form)
        except ValueError as e:
            errors['duracao_minutos'] = str(e)

    if errors:
        return {'message': 'Erro ao editar serviço', 'errors': errors, 'status_code': 400}

    sucesso, erro = editar_servico(id_servico, form)

    if erro:
        status = 404 if erro == 'Serviço não encontrado' else 400
        return {'message': erro, 'status_code': status}

    return {'message': 'Serviço atualizado com sucesso', 'status_code': 200}
