from app.Org import bp
from Models.Org import Org
from flask import jsonify, make_response, abort

@bp.route('/addData', methods = ['POST'])
def saveData():
    data = {}
    org = Org(data)
    org.save()
   
    return make_response(jsonify({"status":"success"}), 200)