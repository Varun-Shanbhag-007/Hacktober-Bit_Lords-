from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin@hacktober.odrlq.mongodb.net/HackStruct?retryWrites=true&w=majority")


def connect():
    db = client["HackStruct"]
    return db