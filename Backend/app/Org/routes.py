from app.Org import bp
from Models.Org import Org
from flask import jsonify, make_response, abort,request
from bson.json_util import dumps
import app.Engine.OrgSearch.processData as processData
from Models.nOrg import nOrg
from app.Engine.OrgSearch.OrganisationSearch import OrganisationSearch
from flask_cors import CORS, cross_origin

@bp.route('/org/addOrgData', methods = ['POST'])
@cross_origin()
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
@cross_origin()
def getOrg(email):
    data = {"org_key": email }
    org = Org(data)
    val = org.find
    if val is None:
        abort(404)
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
    if "custom_string" in request.json:
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

    return make_response({"data": processData.JSONEncoder().encode(result)}, 200)
