from flask import Blueprint, Flask,request, jsonify
from config.config import app
from Model.servicos import criar_servico_db

servicos_blueprint = Blueprint('servicos', __name__, url_prefix='/api')

@servicos_blueprint.route(('/servicos/cadastro'), methods=['POST'])
def cadastro():
    forms_cadastro = request.get_json()
    cliente = criar_servico_db(forms_cadastro)
    return jsonify(cliente)