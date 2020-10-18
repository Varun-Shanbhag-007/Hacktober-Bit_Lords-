import sys
sys.path.append("../../../")
import pandas as pd
from app.Engine.OrgSearch.OrganisationSearch import OrganisationSearch
from Models.nOrg import nOrg
from Models.Categories import Categories
import os
import re
from collections import Counter
import json
from bson import ObjectId
import mpu
import zipcodes
from app.Engine.OrgSearch.WordAssoc import Domain_Words_Map

def separateToLemma(data, orgSearch):
    data = re.sub(r"[0-9*()?/.,]+", " ", str(data).lower())
    data = re.sub(r"\s+", " ", data)
    words = data.split(" ")
    data = []
    for i in words:
        if "/" in i:
            for j in i.split("/"):
                data.append(j)
        else:
            data.append(i)
    words = data
    words = [word.split(",") for word in words]
    splitWords = []
    for word in words:
        for w in word:
            if len(w) > 2:
                splitWords.append(w)
    ref, lem = orgSearch.refine_words(splitWords)
    return ref, lem

def addCustomWordAssociations(data):
    for key, value in Domain_Words_Map.items():
        if key in data:
            data+=" " + " ".join(value)
    return data

def processSupportWords(df, orgSearch):
    mainList = []
    for i in list(df["program_category"]):
        i = addCustomWordAssociations(i)
        ref, lem = separateToLemma(i, orgSearch)
        mainList.append([ref, lem])
    return mainList

def processCountyColumn(df, counties):
    countyData = []
    for i in list(df["program_req_geo_area"]):
        words = str(i).lower().split(" ")
        available = []
        added = False
        for j in words:
            if j in counties:
                added = True
                break
        if not added:
            countyData.append(["all"]) # consider no option means all counties supported
        else:
            for j in counties:
                for k in words:
                    if k in j:
                        available.append(j)
            countyData.append(available)
    return countyData

def createSetOfLemma(listOfData):
    setData = []
    for i in listOfData:
        for j in i[1]:
            setData.append(j)
    counter = Counter(setData)
    return counter

def getCountyList():
    countyList = []
    with open("county.txt", 'r') as f:
        for line in f:
           countyList.append(line[:-1].lower())
    return countyList

def calculateDistance(zip1, zip2):
    zipcode1 = zipcodes.matching(str(zip1))
    zipcode2 = zipcodes.matching(str(zip2))
    z1 = (float(zipcode1[0]["lat"]),float(zipcode1[0]["long"]))
    z2 = (float(zipcode2[0]["lat"]),float(zipcode2[0]["long"]))

    dist = mpu.haversine_distance(z1,z2)

    dist =round((dist/2) + (((dist/2))/4),2)
    return dist


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)



if __name__=="__main__":
    df = pd.read_excel(os.getcwd() + "/data.xlsx", index_col=0)
    orgSearch = OrganisationSearch()
    orgData = [{} for i in range(df.shape[0])]
    counties = getCountyList()
    countyData = processCountyColumn(df, counties)
    supportWords = processSupportWords(df, orgSearch)
    
    indices = list(df.index)
    columns = list(df.columns)

    for i in range(len(orgData)):
        for j in range(-1, 32):
            if j==-1:
                orgData[i]["timestamp"] = str(indices[i])
            elif j == 17:
                orgData[i][columns[j]] = str(df.iloc[i][j])
                orgData[i]["refWords"] = supportWords[i][0]
                orgData[i]["lemmaWords"] = supportWords[i][1]
            elif j==26:
                orgData[i]["county"] = countyData[i]
            elif j==13 or j==14 or j==15:
                orgData[i][columns[j]] = list(str(df.iloc[i][j]).split(","))
            else:
                orgData[i][columns[j]] = str(df.iloc[i][j])

    allCategories = Categories(createSetOfLemma(supportWords))
    allCategories.save()
    for i in orgData:
        norg = nOrg(i)
        norg.save()