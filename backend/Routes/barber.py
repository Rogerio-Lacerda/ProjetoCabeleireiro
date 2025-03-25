from flask import Blueprint, Flask,request, jsonify
from Controller.barbeiroController import criar_barbeiro, get_barbeiro

barbeiro_blueprint = Blueprint('barbeiro', __name__, url_prefix='/api')

@barbeiro_blueprint.route(('/barbeiro/cadastro/<int:idBarbeiro>'), methods=['POST'])
def cadastro(idBarbeiro):
    forms_cadastro = request.get_json()
    barbeiro = criar_barbeiro(forms_cadastro,idBarbeiro)
    return jsonify(barbeiro), barbeiro['status_code']

@barbeiro_blueprint.route(('/barbeiro/<int:idBarbeiro>'), methods=['GET'])
def consulta(idBarbeiro):
    barbeiro = get_barbeiro(idBarbeiro)
    return jsonify(barbeiro), barbeiro['status_code']

