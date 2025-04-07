from config.config import db

class StatusAgendamento(db.Model):
    __tablename__ = "status_agendamento"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(50), nullable=False, unique=True)

def data_status():
    status_list = ['confirmado', 'cancelado', 'finalizado', 'não compareceu']
    if StatusAgendamento.query.first():
        print("Status de agendamento já cadastrados.")
        return

    for nome in status_list:
        status = StatusAgendamento(nome=nome)
        db.session.add(status)
    
    db.session.commit()
    print("Status de agendamento inseridos com sucesso!")