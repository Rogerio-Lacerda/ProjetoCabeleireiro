from config.config import db
from sqlalchemy import Time, Date

class Agendamento(db.Model):
    __tablename__ = "agendamento"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clientes.id', ondelete="CASCADE"), nullable=False)
    barber_id = db.Column(db.Integer, db.ForeignKey('barbeiros.id', ondelete="CASCADE"), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('servicos.id', ondelete="CASCADE"), nullable=False)
    data_agend = db.Column(Date, nullable=False)
    inicio_agend = db.Column(Time, nullable=False)
    fim_agend = db.Column(Time, nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "barber_id": self.barber_id,
            "service_id": self.service_id,
            "data_agend": self.data_agend.isoformat() if self.data_agend else None,
            "inicio_agend": self.inicio_agend.strftime('%H:%M') if self.inicio_agend else None,
            "fim_agend": self.fim_agend.strftime('%H:%M') if self.fim_agend else None
        }


def criar_agendamento_db(data):
    agendamento = Agendamento(
        client_id=data["client_id"],
        barber_id=data["barber_id"],
        service_id=data["service_id"],
        data_agend=data["data_agend"],
        inicio_agend=data["inicio_agend"],
        fim_agend=data["fim_agend"]
    )
    db.session.add(agendamento)
    db.session.commit()
    return agendamento


def verificar_conflito_horario(barber_id, data_agend, inicio_agend, fim_agend):
    conflitos = Agendamento.query.filter(
        Agendamento.barber_id == barber_id,
        Agendamento.data_agend == data_agend,
        Agendamento.inicio_agend < fim_agend,
        Agendamento.fim_agend > inicio_agend
    ).all()

    if conflitos:
        return True, conflitos
    return False, None


def buscar_agend_barbeiro(barbeiro_id):
    agendamentos = db.session.query(Agendamento).filter_by(barber_id=barbeiro_id).all()
    
    if not agendamentos:
        return {'message': 'Não há agendamentos para esse barbeiro!', 'status_code': 404}
    
    
    return {
    'message': "Agendamentos encontrados",
    'status_code': 200,
    'agendamentos': [a.to_dict() for a in agendamentos]
}


def buscar_agend_cliente(cliente_id):
    agendamentos = db.session.query(Agendamento).filter_by(client_id=cliente_id).all()
    
    if not agendamentos:
        return {'message': 'Não há agendamentos para esse cliente!', 'status_code': 404}

    return {
    'message': "Agendamentos encontrados",
    'status_code': 200,
    'agendamentos': [a.to_dict() for a in agendamentos]
}

def deletar_agend(id):
    agendamentos = db.session.query(Agendamento).filter_by(id=id).first()
    if agendamentos is None:
        return {'message': 'Agendamento nao Existe', 'status_code': 400}
    else:
        db.session.delete(agendamentos)
        db.session.commit()
        return {'message': 'Agendamento deletado com sucesso', 'status_code': 200}