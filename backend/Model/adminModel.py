from config.config import db

class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nome = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)


def adicionar_admin(data):
    admin = Admin(nome = data['nome'], email = data['email'], senha = data['senha'])
    db.session.add(admin)
    db.session.commit()
    return {'message': 'Administrador cadastrado com sucesso', 'status_code': 200}

def validacao_admin(data):
    email_validado = Admin.query.filter_by(email=form['email']).first()
    if email_validado:
        return {'message': 'Email já cadastrado!', 'status_code': 400}
    return True

def consultar_admin(id):
    admin = db.session.query(Admin).filter_by(id=id).first()
    if admin is None:
        return {'message': 'Administrador não existe!', 'status_code': 404}
    else:
        return {'message': admin, 'status_code': 200}