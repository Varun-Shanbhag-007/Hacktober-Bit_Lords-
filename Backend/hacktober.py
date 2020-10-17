import os
import Utility.dbController as dbController
from flask import Flask, request, jsonify
from Models.User import User
from Engine.ZipCode import get_zip_code_info

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


@app.route('/locate_using_zipcode')
def locate_using_zipcode():
    zipcode_str = request.args.get("zipcode")
    zipcode_info = get_zip_code_info(zipcode_str)
    return jsonify(zipcode_info)


if __name__ == "__main__":
    app.run()