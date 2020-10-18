import sys
sys.path.append("../../../")
import pandas as pd
from OrganisationSearch import OrganisationSearch
from Models.nOrg import nOrg
import os

def processSupportWords(df, orgSearch):
    mainList = []
    for i in list(df["program_category"]):
        words = i.lower().split(" ")
        words = [word.split(",") for word in words]
        splitWords = []
        for word in words:
            for w in word:
                if len(w) > 2:
                    splitWords.append(w)
        ref, lem = orgSearch.refine_words(splitWords)
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

def getCountyList():
    countyList = []
    with open("county.txt", 'r') as f:
        for line in f:
           countyList.append(line[:-1].lower())
    return countyList

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
    for i in orgData:
        norg = nOrg(i)
        norg.save()
            