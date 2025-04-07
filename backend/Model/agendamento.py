from config.config import db
from sqlalchemy import Time, Date

class Agendamento(db.Model):
    __tablename__ = "agendamento"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clientes.id', ondelete="CASCADE"), nullable=False)
    barber_id = db.Column(db.Integer, db.ForeignKey('barbeiros.id', ondelete="CASCADE"), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('servicos.id', ondelete="CASCADE"), nullable=False)
    data_agend = db.Column(db.String(255), nullable=False, unique=True)
    inicio_agend = db.Column(db.String(255), nullable=False)
    data_agend = db.Column(Date, nullable=False)
    inicio_agend = db.Column(Time, nullable=False)
    fim_agend = db.Column(Time, nullable=False)


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


