from Models.MainModel import MainModel
import Utility.dbController as dbController

class Org(MainModel):
    db_collection = dbController.connect()["org"]

    @property
    def find(self):
        return self.db_collection.find_one({"org_key": self.org_key})