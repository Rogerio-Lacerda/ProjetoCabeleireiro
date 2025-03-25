import datetime
import re
from Model.adminModel import consultar_admin
from Model.barbeiroModel import adicionar_barbeiro, alterar_barbeiro, validacao_barbeiro, deletar_barbeiro, buscar_barbeiro

def validacao_nome(data):
    if "nome" not in data:
        raise ValueError("Campo não informado.")

    if data['nome'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(data['nome'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(data['nome']) > 255:
        raise ValueError("Campo deve ter no máximo 255 caracteres.")
    
    return True

def validacao_email(data):
    if "email" not in data:
        raise ValueError("Campo não informado.")
    
    if data['email'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(data['email'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(data['email']) > 255:
        raise ValueError("Campo deve ter no máximo 255 caracteres")
    
    valid_email = r"@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"

    if re.search(valid_email, data['email']) is None:
        raise ValueError("Campo inválido")
    
    return True
    
def validacao_senha(data):
    if "senha" not in data:
        raise ValueError("Campo não informado.")
    
    if data['senha'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(data['senha'], str):
        raise ValueError("Campo deve ser uma String")
    
    valid_senha = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$'
    
    if len(data['senha']) < 8 and re.search(valid_senha, data['senha']) is None :
        raise ValueError("Campo deve ter no mínimo 8 caracteres com maiusculas, minusculas e um caractere especial")
    
    return True

def validacao_celular(data):
    if "celular" not in data:
        raise ValueError("Campo não informado.")
    
    if data['celular'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(data['celular'], str):
        raise ValueError("Campo deve ser uma String")
    
    valid_num = r"^\+\d{1,3}\d{2}\d{8,9}$"

    if re.search(valid_num, data['celular']) is None:
        raise ValueError("Número inválido. Use o formato: +DDIDDDNÚMERO (ex: +5511912345678)")
    
    return True

def validacao_especialidade(data):
    if "especialidade" not in data:
        raise ValueError("Campo não informado.")
    
    if data['especialidade'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(data['especialidade'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(data['especialidade']) > 255:
        raise ValueError("Campo deve ter no máximo 255 caracteres")
    
    valid_especialidade = r"@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"

    if re.search(valid_especialidade, data['especialidade']) is None:
        raise ValueError("Campo inválido")
    
    return True

def validacao_data_nascimento(data):
    if "data_nascimento" not in data:
        raise ValueError("Campo não informado.")
    
    if data['data_nascimento'] is None:
        raise ValueError("Campo está vazio.")

    valid_data_nascimento = datetime.strptime(data['data_nascimento'], "%d/%m/%Y")

    if re.search(valid_data_nascimento, data['data_nascimento']) is None:
        raise ValueError("Campo inválido")
    
    return True

def validacao_form(form):
    errors = {}
    
    try:
        validacao_nome(form)
    except ValueError as e:
        errors['nome'] = str(e)

    try:
        validacao_email(form)
    except ValueError as e:
        errors['email'] = str(e)

    try:
        validacao_senha(form)
    except ValueError as e:
        errors['senha'] = str(e)

    try:
        validacao_celular(form)
    except ValueError as e:
        errors['celular'] = str(e)
    
    try:
        validacao_especialidade(form)
    except ValueError as e:
        errors['especialidade'] = str(e)

    try:
        validacao_data_nascimento(form)
    except ValueError as e:
        errors['nascimento'] = str(e)

    if errors:
        return errors
    else:
        return True

def criar_barbeiro(form, idAdmin):
    validar_admin = consultar_admin(idAdmin)
    if validar_admin['status_code'] == 200:
        result_validacao = validacao_form(form)
        if result_validacao != True:
            return {'message': 'Erro no cadastro do barbeiro', 'errors': result_validacao, 'status_code': 400}
        
        existe_barbeiro = validacao_barbeiro(form)

        if existe_barbeiro != True:
            return existe_barbeiro

        response = adicionar_barbeiro(form)
        return response
    return validar_admin

def alter_validacao_nome(form):
    if 'nome' not in form:
        return True
    
    if not isinstance(form['nome'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(form['nome']) > 255:
        raise ValueError("Campo deve ter no máximo 255 caracteres.")
    
    return True

def alter_validacao_email(form):
    if "email" not in form:
        return True
    
    if form['email'] is None:
        raise ValueError("Campo está vazio.")

    if not isinstance(form['email'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(form['email']) > 255:
        raise ValueError("Campo deve ter no máximo 255 caracteres")
    
    valid_email = r"@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"

    if re.search(valid_email, form['email']) is None:
        raise ValueError("Campo inválido")
    
    return True
    
def alter_validacao_senha(form):
    if 'senha' not in form:
        return True
    
    if not isinstance(form['senha'], str):
        raise ValueError("Campo deve ser uma String")
    
    valid_senha = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$'
    
    if len(form['senha']) < 8 and re.search(valid_senha, form['senha']) is None :
        raise ValueError("Campo deve ter no mínimo 8 caracteres com maiusculas, minusculas e um caractere especial")
    
    return True

def alter_validacao_celular(form):
    if 'celular' not in form:
        return True
    
    if not isinstance(form['celular'], str):
        raise ValueError("Campo deve ser uma String")
    
    valid_num = r"^\+\d{1,3}\d{2}\d{8,9}$"

    if re.search(valid_num, form['celular']) is None:
        raise ValueError("Número inválido. Use o formato: +DDIDDDNÚMERO (ex: +5511912345678)")
    
    return True

def alter_validacao_especialidade(data):
    if "especialidade" not in data:
        return True

    if not isinstance(data['especialidade'], str):
        raise ValueError("Campo deve ser uma String")
    
    if len(data['especialidade']) > 255:
        raise ValueError("Campo deve ter no máximo 255 caracteres")
    
    valid_especialidade = r"@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"

    if re.search(valid_especialidade, data['especialidade']) is None:
        raise ValueError("Campo inválido")
    
    return True

def alter_validacao_data_nascimento(data):
    if "data_nascimento" not in data:
        return True

    valid_data_nascimento = datetime.strptime(data['data_nascimento'], "%d/%m/%Y")

    if re.search(valid_data_nascimento, data['data_nascimento']) is None:
        raise ValueError("Campo inválido")
    
    return True

def alter_validacao_form(form):
    errors = {}
    
    try:
        alter_validacao_nome(form)
    except ValueError as e:
        errors['nome'] = str(e)

    try:
        alter_validacao_email(form)
    except ValueError as e:
        errors['email'] = str(e)

    try:
        alter_validacao_senha(form)
    except ValueError as e:
        errors['senha'] = str(e)

    try:
        alter_validacao_celular(form)
    except ValueError as e:
        errors['celular'] = str(e)

    try:
        alter_validacao_especialidade(form)
    except ValueError as e:
        errors['especialidade'] = str(e)

    try:
        alter_validacao_data_nascimento(form)
    except ValueError as e:
        errors['data_nascimento'] = str(e)

    if errors:
        return errors
    else:
        return True

def alter_dados_barbeiro(form, idBarbeiro, idAdmin):
    validar_admin = consultar_admin(idAdmin)
    if validar_admin['status_code'] == 200:
        result_validacao = alter_validacao_form(form)
        if result_validacao != True:
            return {'message': 'Erro ao alterar dados do barbeiro', 'errors': result_validacao, 'status_code': 400}
        
        response = alterar_barbeiro(form, idBarbeiro)
        return response
    return validar_admin

def remover_barbeiro(idBarbeiro, idAdmin):
    validar_admin = consultar_admin(idAdmin)
    if validar_admin['status_code'] == 200:
        response = deletar_barbeiro(idBarbeiro)
        return response
    return validar_admin

def get_barbeiro(id):
    response = buscar_barbeiro(id)
    return response