from app.Org import bp
from Models.Org import Org
from flask import jsonify, make_response, abort,request

@bp.route('/org/addOrgData/', methods = ['POST'])
def saveData():
    val = request.get_json(force=True)
    data = val
    org = Org(data)
    org.save()
    return make_response(jsonify({"status":"success"}), 200)