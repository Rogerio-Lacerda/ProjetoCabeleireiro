from flask import Blueprint, Flask,request, jsonify
from config.config import app
from Controller.clientes import create_user, alter_dados_cliente, remover_cliente

clientes_blueprint = Blueprint('clientes', __name__, url_prefix='/api')

@clientes_blueprint.route(('/clientes/cadastro'), methods=['POST'])
def cadastro():
    forms_cadastro = request.get_json()
    cliente = create_user(forms_cadastro)
    return jsonify(cliente), cliente['status_code']

@clientes_blueprint.route(('/clientes/alterar/<int:id>'), methods=['PUT'])
def alter_cliente(id):
    forms_client = request.get_json()
    cliente = alter_dados_cliente(forms_client, id)
    return jsonify(cliente), cliente['status_code']

@clientes_blueprint.route(('clientes/remover/<int:id>'), methods=['DELETE'])
def remov_cliente(id):
    cliente = remover_cliente(id)
    return jsonify(cliente), cliente['status_code']