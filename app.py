## Flask Front End app for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@maualkla)
## Date: May 2023.
## More info at @intmau in twitter or in http://maualkla.com
## Description: Web app to serve adminde-tc project.

## Imports
## Imports
from flask import Flask, jsonify, request, render_template
import os 


## Initialize Flask App
app = Flask(__name__)


## @TO_BE_DELETED 
# sample helloworld
@app.route('/helloworld')
def hello_world():
    import requests

    url = 'http://localhost:3000/vlogin'
    data = {
        "user": "maualkla",
        "email": "mauricio@adminde.com",
        "word": "helloadminde2024"
        }
    headers = {'Content-type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)
    print(response.json())
    
    ##print(response.json())
    return response.json()

## @TO_BE_DELETED
# Landing page
@app.route('/')
def landing():
    return render_template('index.html')

## @TO_BE_DELETED
# Sample service
@app.route('/service', methods=['GET'])
def service():
    data = request.get_json()
    if data:
        return jsonify({
            "status": "connected",
            "code": 200
        })
    else:
        return jsonify({
            "status": "Error",
            "code": 500
        })
    
## API Status
@app.route('/status')
def status():
    return "Running fine"

if __name__ == '__main__':
    app.run(debug=True, port=8001)
