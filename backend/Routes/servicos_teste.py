
# from flask import request, jsonify
# from . import servicos_bp
# from Model.serviços import BarbeariaServicos

# servicos_blueprint = BarbeariaServicos()

# @servicos_bp.route('/servicos', methods=['GET'])
# def listar_servicos():
#     return jsonify(list(servicos_blueprint.servicos.values())), 200

# @servicos_bp.route('/servicos', methods=['POST'])
# def criar_servico():
#     data = request.get_json()
#     nome = data.get('nome')
#     descricao = data.get('descricao')
#     preco = data.get('preco')
#     duracao = data.get('duracao')

#     id_servico = servicos_blueprint.criar_servico(nome, descricao, preco, duracao)
#     if id_servico:
#         return jsonify({'id': id_servico}), 201
#     return jsonify({'erro': 'Dados inválidos'}), 400

# @servicos_bp.route('/servicos/<int:id_servico>', methods=['PUT'])
# def editar_servico(id_servico):
#     data = request.get_json()
#     sucesso = servicos_blueprint.editar_servico(id_servico, **data)
#     if sucesso:
#         return jsonify({'mensagem': 'Serviço atualizado com sucesso'}), 200
#     return jsonify({'erro': 'Não foi possível atualizar'}), 400

# @servicos_bp.route('/servicos/<int:id_servico>', methods=['DELETE'])
# def excluir_servico(id_servico):
#     sucesso = servicos_blueprint.excluir_servico(id_servico)
#     if sucesso:
#         return jsonify({'mensagem': 'Serviço removido com sucesso'}), 200
#     return jsonify({'erro': 'Serviço não encontrado'}), 404