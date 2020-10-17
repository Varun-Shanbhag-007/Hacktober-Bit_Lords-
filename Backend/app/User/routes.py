from app.User import bp
from Models.User import User
from flask import jsonify, make_response, abort

@bp.route('/login/<email>', methods = ['GET'])
def login(email):
    data = { "email": email }
    #Validate data
    user = User(data)
    if user.find is None:
        abort(404)
    return make_response(jsonify({"status":"success"}), 200)