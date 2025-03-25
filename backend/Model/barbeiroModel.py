from config.config import db

class Barbeiros(db.Model):
    __tablename__ = "barbeiros"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nome = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)
    celular = db.Column(db.String(255), nullable=False)
    especialidade = db.Column(db.String(255), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)


def adicionar_barbeiro(data):
    barbeiro = Barbeiros(
        nome = data['nome'], 
        email = data['email'], 
        senha = data['senha'],
        celular = data['celular'],
        especialidade = data['especialidade'],
        data_nascimento = data['data_nascimento']
        )
    db.session.add(barbeiro)
    db.session.commit()
    return {'message': 'Barbeiro cadastrado com sucesso', 'status_code': 200}

def validacao_barbeiro(data):
    email_validado = Barbeiros.query.filter_by(email=form['email']).first()
    if email_validado:
        return {'message': 'Email já cadastrado!', 'status_code': 400}
    return True

def alterar_barbeiro(data, id):
    barbeiro = db.session.query(Barbeiros).filter_by(id=id).first()
    if barbeiro is None:
        return {'message': 'Barbeiro não existe!', 'status_code': 404}

    if 'email' in data and data['email']:
        barbeiro.email = data['email']
    
    if 'senha' in data and data['senha']:
        barbeiro.senha = data['senha']

    if 'celular' in data and data['celular']:
        barbeiro.celular = data['celular']

    if 'especialidade' in data and data['especialidade']:
        barbeiro.especialidade = data['especialidade']

    db.session.commit()

    return {'message': 'Barbeiro atualizado com sucesso', 'status_code': 200}

def deletar_barbeiro(id):
    barbeiro = db.session.query(Barbeiros).filter_by(id=id).first()
    if barbeiro is None:
        return {'message': 'Barbeiro não existe', 'status_code': 404}
    else:
        db.session.delete(barbeiro)
        db.session.commit()
        return {'message': 'Barbeiro deletado com sucesso!', 'status_code': 200}

def buscar_barbeiro(id):
    barbeiro = db.session.query(Barbeiros).filter_by(id=id).first()
    if barbeiro is None:
        return {'message': 'Barbeiro não existe!', 'status_code': 404}
    else:
        return {'message': barbeiro, 'status_code': 200}