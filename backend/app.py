from config.config import app, db
from Routes.clientes import clientes_blueprint
from Routes.admin import admin_blueprint
from Routes.barber import barbeiro_blueprint
from Routes.servicos import servicos_blueprint
from Routes.agend import agendamento_blueprint
from flask_cors import CORS

CORS(app) 

app.register_blueprint(clientes_blueprint)
app.register_blueprint(barbeiro_blueprint)
app.register_blueprint(admin_blueprint)
app.register_blueprint(servicos_blueprint)
app.register_blueprint(agendamento_blueprint)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host=app.config["HOST"], port = app.config['PORT'],debug=app.config['DEBUG'])