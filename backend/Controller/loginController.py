import re
from Model.adminModel import consultar_admin_email
from Model.barbeiroModel import consultar_barbeiro_email
from Model.clientes import consultar_cliente

def validacao_email(dados_login):
    # dados_admin = consultar_admin_email(dados_login['email'])
    # dados_barbeiro = consultar_barbeiro_email(dados_login['email'])
    dados_cliente = consultar_cliente(dados_login)

    return dados_cliente

    # if dados_cliente is not None:
    #     if dados_cliente['senha'] != dados_login['senha']:
    #         return {'message': 'Senha incorreta!', 'status_code': 400}
    #     return {'message': True, 'status_code': 200}

    # elif dados_barbeiro is not None:
    #     if dados_barbeiro['senha'] != dados_login['senha']:
    #         return {'message': 'Senha incorreta!', 'status_code': 400}
    #     return {'message': True, 'status_code': 200}

    # elif dados_admin is not None:
    #     if dados_admin['senha'] != dados_login['senha']:
    #         return {'message': 'Senha incorreta!', 'status_code': 400}
    #     return {'message': True, 'status_code': 200}

    # return {'message': 'Usuário não encontrado!', 'status_code': 404}
