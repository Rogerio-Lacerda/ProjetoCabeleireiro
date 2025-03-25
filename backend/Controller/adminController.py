import re
from Model.adminModel import consultar_admin, adicionar_admin, validacao_admin

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

    if errors:
        return errors
    else:
        return True


def criar_admin(form, idAdmin):
    validar_admin = consultar_admin(idAdmin)
    if validar_admin['status_code'] == 200:
        result_validacao = validacao_form(form)
        if result_validacao != True:
            return {'message': 'Erro no cadastro do administrador', 'errors': result_validacao, 'status_code': 400}
        
        existe_admin = validacao_admin(form)

        if existe_admin != True:
            return existe_admin

        response = adicionar_admin(form)
        return response
    return validar_admin

def get_admin(idAdmin):
    response = consultar_admin(idAdmin)
    return response