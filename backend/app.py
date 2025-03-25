from config.config import app, db
from Routes.clientes import clientes_blueprint
from Routes.admin import admin_blueprint 

app.register_blueprint(clientes_blueprint)
app.register_blueprint(admin_blueprint)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host=app.config["HOST"], port = app.config['PORT'],debug=app.config['DEBUG'])