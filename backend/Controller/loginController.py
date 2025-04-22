import re
from Model.adminModel import consultar_admin_email
from Model.barbeiroModel import consultar_barbeiro_email
from Model.clientes import consultar_cliente

def validacao_email(dados_login):
    dados_admin = consultar_admin_email(dados_login)
    dados_barbeiro = consultar_barbeiro_email(dados_login)
    dados_cliente = consultar_cliente(dados_login) 

    if dados_cliente['status_code'] == 200:
        return dados_cliente
    elif dados_cliente['status_code'] == 400:
        return dados_cliente

    elif dados_barbeiro['status_code'] == 200:
        return dados_barbeiro
    elif dados_barbeiro['status_code'] == 400:
        return dados_barbeiro

    elif dados_admin['status_code'] == 200:
        return dados_admin
    elif dados_admin['status_code'] == 400:
        return dados_admin
    
    else:
        return {'message': 'Usuário não encontrado!', 'status_code': 404}
