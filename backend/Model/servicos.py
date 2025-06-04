from config.config import db

class Servicos(db.Model):
    __tablename__ = 'servicos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(500))
    preco = db.Column(db.Float, nullable=False)
    duracao_minutos = db.Column(db.Integer, nullable=False)

def adicionar_servico(form):
    try:
        novo_servico = Servicos(
            nome=form['nome'],
            descricao=form.get('descricao'),
            preco=form['preco'],
            duracao_minutos=form['duracao_minutos']
        )
        
        db.session.add(novo_servico)
        db.session.commit()
        return "Serviço cadastrado com sucesso."
    
    except Exception as e:
        db.session.rollback()
        return f"Erro ao cadastrar serviço: {str(e)}"
            