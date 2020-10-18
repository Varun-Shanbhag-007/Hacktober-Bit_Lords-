from Models.MainModel import MainModel
import Utility.dbController as dbController

class Categories(MainModel):
    db_collection = dbController.connect()["categories"]