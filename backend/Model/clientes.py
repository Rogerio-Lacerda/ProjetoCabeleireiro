from config.config import db
class Clientes(db.Model):
    __tablename__ = "clientes"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nome = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)
    numero_cel = db.Column(db.String(255), nullable=False)



def adicionar_cliente(form):
    print(form)
    usuario = Clientes(nome=form['nome'], email=form['email'], senha=form['senha'], numero_cel=form['celular'])
    db.session.add(usuario)
    db.session.commit()
    return 'Usuario Cadastrado'

def validacao_cliente(form):
    vendedor_email = Clientes.query.filter_by(email=form['email']).first()
    if vendedor_email:
        return 'Email já cadastrado.'
    return True


def alter_cliente(form, id):
    cliente = db.session.query(Clientes).filter_by(id=id).first()
    print(cliente)
    if cliente is None:
        return {'message': 'Cliente nao Existe', 'status_code': 400}

    if 'nome' in form and form['nome']:
        cliente.nome = form['nome']

    if 'email' in form and form['email']:
        cliente.email = form['email']
    
    if 'senha' in form and form['senha']:
        cliente.senha = form['senha']

    if 'numero_cel' in form and form['numero_cel']:
        cliente.numero_cel = form['numero_cel']

    db.session.commit()

    return {'message': 'Cliente atualizado com sucesso', 'status_code': 200}

def deletar_cliente(id):
    cliente = db.session.query(Clientes).filter_by(id=id).first()
    if cliente is None:
        return {'message': 'Cliente nao Existe', 'status_code': 400}
    else:
        db.session.delete(cliente)
        db.session.commit()
        return {'message': 'Cliente deletado com sucesso', 'status_code': 200}
    
def consultar_cliente(email):
    dados_cliente = db.session.query(Clientes).filter_by(email=email).first() 
    if dados_cliente is None:
        return {'message': 'E-mail Cliente não existe!', 'status_code': 404}
    else:
        return {'message': dados_cliente, 'status_code': 200}
    