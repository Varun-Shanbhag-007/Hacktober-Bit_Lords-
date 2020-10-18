from app.Org import bp
from Models.Org import Org
from flask import jsonify, make_response, abort,request
from bson.json_util import dumps
import app.Engine.OrgSearch.processData as processData
from Models.nOrg import nOrg
from app.Engine.OrgSearch.OrganisationSearch import OrganisationSearch
from flask_cors import CORS, cross_origin
from datetime import datetime

@bp.route('/org/addOrgData', methods = ['POST'])
@cross_origin()
def saveData():
    val = request.get_json(force=True)
    current_time = str(datetime.now().date())
    val["last_updated"] = current_time
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
@cross_origin()
def getOrg(email):
    data = {"org_key": email }
    org = Org(data)
    val = org.find
    if val is None:
        return make_response(jsonify({"status":"new_user"}), 200)
    else:
        return make_response(dumps(val), 200)


@bp.route('/org/getNearbyOrg', methods=['POST'])
@cross_origin()
def getNearbyOrgs():
    if not request.json or "org_zip" not in request.json:
        abort(404)
    
    data = {}
    orgSearch = OrganisationSearch()
    stringFilters = ""
    if "program_category" in request.json:
         stringFilters+=",".join(request.json["program_category"])
    if "custom_string" in request.json and len(request.json["custom_string"]) > 0:
        stringFilters+="," + request.json["custom_string"]

    _, lemma = processData.separateToLemma(stringFilters, orgSearch)
    
    if len(stringFilters) > 0:
        data["lemmaWords"] ={"$in":lemma}

    norg = nOrg(data)
    allOrgs = norg.findAll
    result = []
    for i in allOrgs:
        dist = processData.calculateDistance(request.json["org_zip"], i["org_zip"])
        if dist <=100:
            i["distance"] = dist
            result.append(i)
    result = [eval(processData.JSONEncoder().encode(i)) for i in result]
    result = sorted(result, key=lambda x: x["distance"])
    return make_response(jsonify({"data": result}), 200)
