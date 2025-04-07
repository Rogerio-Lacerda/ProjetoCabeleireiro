from flask import Blueprint, request, jsonify
from Controller.agendamento import criar_agendamento

agendamento_blueprint = Blueprint('agendamento', __name__, url_prefix='/api')

@agendamento_blueprint.route(('/agendamento/cadastro'), methods=['POST'])
def agendar():
    form_agendamento = request.get_json()
    agendamento = criar_agendamento(form_agendamento)
    return jsonify(agendamento), agendamento['status_code']