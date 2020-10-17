from Models.MainModel import MainModel
import Utility.DbController as DbController

class User(MainModel):
    db_collection = DbController.connect()["user"]

    @property
    def find(self):
        return self.db_collection.find_one({"email": self.email})