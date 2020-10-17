import os
import Utility.dbController as dbController
from flask import Flask,request, jsonify
from Models.User import User

app = Flask(__name__)
db = dbController.connect()

@app.route('/register', methods = ['POST'])
def login():
    data = { "Name":"Ankur", "Password":"ankur872364782" }
    #Validate data
    newUser = User(data)
    newUser.save()
    return jsonify({"status":"success"})



@app.route('/hw')
def hw():
    return "Hello World"


if __name__ == "__main__":
    app.run()