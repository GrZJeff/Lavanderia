from app.models.order import Order
from app.database.db import db
from app.models.garment import Garment
from app.models.order_detail import OrderDetail
from app.models.service import Service

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(client_id= client_id, user_id= user_id, estimated_delivery_date=estimated_date, total= total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_garmen ( order_id, type, description, notes):
    garment = Garment(order_id = order_id, type= type,  description= description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detail (garment_id, service_id, quantity):
    order_detail = OrderDetail(garment_id=garment_id, service_id= service_id, quantity= quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail

def update_order_status (order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.state = new_status
    db.session.commit ()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state=status).all()
    data = [{
        "id":o.id,
        "client_id":o.client_id,
        "state": o.state,
        "estimated_delivery_date": o.estimated_delivery_date,
        "total": o.total,
        "pagado": o.pagado,   
    } for o in orders]
    return data