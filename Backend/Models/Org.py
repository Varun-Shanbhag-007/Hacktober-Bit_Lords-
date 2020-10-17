from Models.MainModel import MainModel
import Utility.dbController as dbController

class Org(MainModel):
    db_collection = dbController.connect()["org"]
