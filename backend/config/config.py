from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['HOST'] = '0.0.0.0'
app.config['PORT']= 8888
app.config['DEBUG']= True
app.config['JSON_SORT_KEYS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:admin@localhost:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = 'sua_chave_secreta_aqui'


db = SQLAlchemy(app)
jwt = JWTManager(app)  # Configuração do JWT