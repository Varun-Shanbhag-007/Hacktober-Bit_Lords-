from Models.MainModel import MainModel
import Utility.dbController as dbController

class User(MainModel):
    db_collection = dbController.connect()["user"]

    @property
    def find(self):
        return self.db_collection.find_one({"email": self.email})