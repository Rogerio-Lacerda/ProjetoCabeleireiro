from flask import Blueprint, Flask,request, jsonify
from config.config import app
from Controller.adminController import criar_admin, get_admin

admin_blueprint = Blueprint('administrador', __name__, url_prefix='/api')

@admin_blueprint.route(('/admin/cadastro/<int:idAdmin>'), methods=['POST'])
def cadastro(idAdmin):
    forms_cadastro = request.get_json()
    admin = criar_admin(forms_cadastro,idAdmin)
    return jsonify(admin), admin['status_code']

@admin_blueprint.route(('/admin/cadastro/<int:idAdmin>'), methods=['GET'])
def consulta(idAdmin):
    admin = get_admin(idAdmin)
    return jsonify(admin), admin['status_code']