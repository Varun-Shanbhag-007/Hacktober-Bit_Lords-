from app.User import bp
from Models.User import User
from flask import jsonify, make_response, abort
from flask_cors import cross_origin

@bp.route('/login/<email>', methods = ['GET'])
@cross_origin()
def login(email):
    data = { "email": email }
    user = User(data)
    val = user.find
    if val is None:
        abort(404)
    else:
        return make_response(jsonify({"user_type":val['userType']}), 200)