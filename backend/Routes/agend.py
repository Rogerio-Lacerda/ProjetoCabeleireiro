from flask import Blueprint, request, jsonify
from Controller.agendamento import criar_agendamento, buscar_agend_cliente, buscar_agend_barbeiro, remover_agend, editar_agendamento

agendamento_blueprint = Blueprint('agendamento', __name__, url_prefix='/api')

@agendamento_blueprint.route(('/agendamento/cadastro'), methods=['POST'])
def agendar():
    form_agendamento = request.get_json()
    agendamento = criar_agendamento(form_agendamento)
    return jsonify(agendamento), agendamento['status_code']

@agendamento_blueprint.route(('/agendamento/cliente/<int:idCliente>'), methods=['GET'])
def list_agend_client(idCliente):
    agendamento = buscar_agend_cliente(idCliente)
    return jsonify(agendamento), agendamento['status_code']

@agendamento_blueprint.route(('/agendamento/barbeiro/<int:idBarber>'), methods=['GET'])
def list_agend_barber(idBarber):
    agendamento = buscar_agend_barbeiro(idBarber)
    return jsonify(agendamento), agendamento['status_code']

@agendamento_blueprint.route(('/agendamento/<int:id>'), methods=['DELETE'])
def del_agendamento(id):
    agendamento = remover_agend(id)
    return jsonify(agendamento), agendamento['status_code']

@agendamento_blueprint.route(('/agendamento/<int:id>'), methods=['PUT'])
def edit_agendamento(id):
    form_agendamento = request.get_json()
    agendamento = editar_agendamento(id, form_agendamento)
    return jsonify(agendamento), agendamento['status_code']