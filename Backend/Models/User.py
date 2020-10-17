from Models.MainModel import MainModel
import Utility.dbController as dbController

class User(MainModel):
    db_collection = dbController.connect()["user"]