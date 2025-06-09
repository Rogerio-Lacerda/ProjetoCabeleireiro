from flask import Blueprint, request, jsonify
from Controller.servicos import (
    create_servico_controller,
    editar_servico_controller
)
from Model.servicos import listar_servicos, excluir_servico

# Blueprint
servicos_blueprint = Blueprint('servicos', __name__, url_prefix='/api')

# GET — Listar Serviços
@servicos_blueprint.route('/servicos', methods=['GET'])
def list_servicos():
    servicos = listar_servicos()
    return jsonify(servicos), 200

# POST — Criar Serviço
@servicos_blueprint.route('/servicos/cadastro', methods=['POST'])
def cri_servico():
    forms_servico = request.get_json()
    response = create_servico_controller(forms_servico)

    body = {'message': response['message']}
    if 'errors' in response:
        body['errors'] = response['errors']
    if 'id' in response:
        body['id'] = response['id']

    return jsonify(body), response['status_code']

# PUT — Editar Serviço
@servicos_blueprint.route('/servicos/<int:id_servico>', methods=['PUT'])
def edi_servico(id_servico):
    forms_servico = request.get_json()
    response = editar_servico_controller(id_servico, forms_servico)

    body = {'message': response['message']}
    if 'errors' in response:
        body['errors'] = response['errors']

    return jsonify(body), response['status_code']

# DELETE — Excluir Serviço
@servicos_blueprint.route('/servicos/<int:id_servico>', methods=['DELETE'])
def exclu_servico(id_servico):
    sucesso, erro = excluir_servico(id_servico)

    if erro:
        return jsonify({'message': erro}), 404

    return jsonify({'message': 'Serviço removido com sucesso'}), 200