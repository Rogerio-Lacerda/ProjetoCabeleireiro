from flask import Blueprint, Flask,request, jsonify
from Controller.barbeiroController import criar_barbeiro, get_barbeiro, alterar_barbeiro, deletar_barbeiro, get_barbeiros


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

@barbeiro_blueprint.route(('/barbeiro/alterar/<int:idBarbeiro>'), methods=['PUT'])
def alter_barber(idBarbeiro):
    forms_cadastro = request.get_json()
    barbeiro = alterar_barbeiro(forms_cadastro, idBarbeiro)
    return jsonify(barbeiro), barbeiro['status_code']

@barbeiro_blueprint.route(('/barbeiro/remover/<int:idBarbeiro>'), methods=['DELETE'])
def delete_barber(idBarbeiro):
    barbeiro = deletar_barbeiro(idBarbeiro)
    return jsonify(barbeiro), barbeiro['status_code']

@barbeiro_blueprint.route(('/barbeiros'), methods=['GET'])
def consulta_barbeiros():
    barbeiros = get_barbeiros()
    return jsonify(barbeiros), barbeiros['status_code']