from bson import ObjectId

class MainModel(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.db_collection.insert(self)
        else:
            self.db_collection.update(
                { "_id": ObjectId(self._id) }, self)

    def reload(self):
        if self._id:
            self.update(self.db_collection.find_one({"_id": ObjectId(self._id)}))

    def remove(self):
        if self._id:
            self.db_collection.remove({"_id": ObjectId(self._id)})
            self.clear()