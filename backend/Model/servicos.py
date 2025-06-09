from config.config import db

class BarbeariaServico(db.Model):
    __tablename__ = 'servicos'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(500))
    preco = db.Column(db.Float, nullable=False)
    duracao_minutos = db.Column(db.Integer, nullable=False)

def listar_servicos():
    servicos = BarbeariaServico.query.all()
    return [{
        'id': s.id,
        'nome': s.nome,
        'descricao': s.descricao,
        'preco': s.preco,
        'duracao': s.duracao_minutos
    } for s in servicos]

def criar_servico(forms):
    nome = forms['nome']
    descricao = forms['descricao']
    preco = forms['preco']
    duracao = forms['duracao_minutos']

    if not nome or preco is None or preco <= 0 or duracao is None or duracao <= 0:
        return None, 'Dados inválidos'

    novo_servico = BarbeariaServico(
        nome=nome,
        descricao=descricao,
        preco=preco,
        duracao_minutos=duracao
    )

    db.session.add(novo_servico)
    db.session.commit()

    return novo_servico.id

def editar_servico(id_servico, forms):
    servico = BarbeariaServico.query.get(id_servico)
    if not servico:
        return False, 'Serviço não encontrado'

    if 'nome' in forms:
        servico.nome = forms['nome']
    if 'descricao' in forms:
        servico.descricao = forms['descricao']
    if 'preco' in forms:
        if forms['preco'] <= 0:
            return False, 'Preço deve ser maior que zero'
        servico.preco = forms['preco']
    if 'duracao' in forms:
        if forms['duracao'] <= 0:
            return False, 'Duração deve ser maior que zero'
        servico.duracao_minutos = forms['duracao']

    db.session.commit()
    return True, None

def excluir_servico(id_servico):
    servico = BarbeariaServico.query.get(id_servico)
    if not servico:
        return False, 'Serviço não encontrado'

    db.session.delete(servico)
    db.session.commit()
    return True, None