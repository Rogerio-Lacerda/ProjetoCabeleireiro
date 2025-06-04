from Model import create_servico, 

### Validação Cadastro Serviço ###
def validacao_nome_servico(form):
    if "nome" not in form:
        raise ValueError("Campo não informado.")

    if form['nome'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(form['nome'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(form['nome']) > 100:
        raise ValueError("Campo deve ter no máximo 100 caracteres.")
    
    return True

def validacao_descricao_servico(form):
    if "descricao" not in form:
        return True

    if form['descricao'] is None:
        return True

    if not isinstance(form['descricao'], str):
        raise ValueError("Campo deve ser uma String")

    if len(form['descricao']) > 500:
        raise ValueError("Campo deve ter no máximo 500 caracteres.")
    
    return True

def validacao_preco_servico(form):
    if "preco" not in form:
        raise ValueError("Campo não informado.")

    if form['preco'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(form['preco'], (int, float)):
        raise ValueError("Campo deve ser um número (int ou float)")

    if form['preco'] < 0:
        raise ValueError("Preço não pode ser negativo.")

    return True

def validacao_duracao_servico(form):
    if "duracao_minutos" not in form:
        raise ValueError("Campo não informado.")

    if form['duracao_minutos'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(form['duracao_minutos'], int):
        raise ValueError("Campo deve ser um número inteiro")

    if form['duracao_minutos'] <= 0:
        raise ValueError("Duração deve ser maior que zero.")

    return True

### Validação geral do form ###
def validacao_form_servico(form):
    errors = {}

    try:
        validacao_nome_servico(form)
    except ValueError as e:
        errors['nome'] = str(e)

    try:
        validacao_descricao_servico(form)
    except ValueError as e:
        errors['descricao'] = str(e)

    try:
        validacao_preco_servico(form)
    except ValueError as e:
        errors['preco'] = str(e)

    try:
        validacao_duracao_servico(form)
    except ValueError as e:
        errors['duracao_minutos'] = str(e)

    if errors:
        return errors
    else:
        return True

### Exemplo de função para criar serviço ###
def create_servico(form):
    result_validacao = validacao_form_servico(form)
    if result_validacao != True:
        return {'message': 'Erro no Cadastro do Serviço', 'errors': result_validacao, 'status_code': 400}

    # Supondo que você tenha uma função adicionar_servico(form) para o insert no banco:
    status = adicionar_servico(form)
    return {'message': status, 'status_code': 200}