from flask import jsonify, request, Blueprint
from app.controllers.client_controller import (
    create_client,
    search_client_by_name,
    search_client_by_phone,
    update_client,
    delete_client
)

client_bp = Blueprint("client_hp", __name__, url_prefix="/clients")

# Middleware para CORS en este blueprint
@client_bp.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response


@client_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    name = data.get('name')
    phone_number = data.get('phone_number')
    address = data.get('address')

    if not name or not phone_number or not address:
        return jsonify({"error": "Los datos básicos del cliente son obligatorios"}), 400

    client = create_client(name, phone_number, address)
    return jsonify({
        "msg": "Cliente creado con éxito",
        "client": client.to_dict()
    }), 200


@client_bp.route("/search/name", methods=["GET"])
def search_by_name():
    name = request.args.get("name")
    clients = search_client_by_name(name)
    data = [client.to_dict() for client in clients]
    return jsonify(data), 200


@client_bp.route("/search/phone", methods=["GET"])
def search_by_phone():
    phone = request.args.get("phone")
    client = search_client_by_phone(phone)
    if not client:
        return jsonify({"error": "Cliente no encontrado :/"}), 400
    return jsonify(client.to_dict()), 200


@client_bp.route("/update/<int:client_id>", methods=["PUT"])
def update(client_id):
    data = request.json
    client = update_client(client_id, data)
    if not client:
        return jsonify({"error": "Cliente no encontrado :/"}), 400
    return jsonify({"msg": "Cliente actualizado con éxito"}), 200


@client_bp.route("/delete/<int:client_id>", methods=["DELETE"])
def delete(client_id):
    client = delete_client(client_id)
    if not client:
        return jsonify({"error": "Cliente no encontrado :/"}), 400
    return jsonify({"msg": "Cliente eliminado con éxito"}), 200
