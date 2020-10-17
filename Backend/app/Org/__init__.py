from flask import Blueprint

bp = Blueprint('Org', __name__)

from app.Org import routes