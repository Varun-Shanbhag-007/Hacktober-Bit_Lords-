from app.Org import bp
from Models.Org import Org
from flask import jsonify, make_response, abort,request
from bson.json_util import dumps

@bp.route('/org/addOrgData', methods = ['POST'])
def saveData():
    val = request.get_json(force=True)
    data = {"org_key": val["org_key"]}
    org = Org(data)
    if org.find:
        query = Org(val)
        result = query.update
    else:
        query = Org(val)
        result = query.save

    return make_response(jsonify({"status":"success"}), 200)


@bp.route('/org/getOrg/<email>')
def getOrg(email):
    data = {"org_key": email }
    org = Org(data)
    val = org.find
    if val is None:
        abort(404)
    else:
        return make_response(dumps(val), 200)