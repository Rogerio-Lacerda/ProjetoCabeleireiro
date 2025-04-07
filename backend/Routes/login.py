from flask import Blueprint, Flask, request, jsonify
from Controller.loginController  import validacao_email

login_blueprint = Blueprint('login', __name__, url_prefix='/api')

@login_blueprint.route('/login', methods=['POST'])
def login():
    dados_login = request.json()
    validar_login = validacao_email(dados_login)
    return jsonify(validar_login), validar_login['status_code']
