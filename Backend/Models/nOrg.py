from Models.MainModel import MainModel
import Utility.dbController as dbController

class nOrg(MainModel):
    db_collection = dbController.connect()["nOrg"]

    @property
    def findAll(self):
        data = list(map(nOrg, self.db_collection.find(self)))
        return data