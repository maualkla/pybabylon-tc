## Flask Front End app for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@maualkla)
## Date: May 2023.
## More info at @intmau in twitter or in http://maualkla.com
## Description: Web app to serve adminde-tc project.
## flask run --host=0.0.0.0 --port=3000

## Imports
## Imports
from flask import Flask, jsonify, request, render_template, redirect, make_response
import os, requests, base64


## globals
_alx_url = 'http://127.0.0.1:3000/'

## Initialize Flask App
app = Flask(__name__)


## @TO_BE_DELETED 
# sample helloworld
@app.route('/postman', methods=['POST'])
def postman():
    url = request.json['url']
    method = request.json['method']
    key1 = request.json['key1']
    val1 = request.json['val1']
    key2 = request.json['key2']
    val2 = request.json['val2']
    key3 = request.json['key3']
    val3 = request.json['val3']

    data = {
        key1: val1,
        key2: val2,
        key3: val3
        }
    print(data)
    headers = {'Content-type': 'application/json'}
    print("validando")
    if method == 'post':
        print("go to post")
        response = requests.post(url, json=data, headers=headers)
    else: 
        print("go to get")
        response = requests.get(url, headers=headers)
    
    print(response.json())
    return response.json()

## @TO_BE_DELETED 
# sample helloworld
@app.route('/helloworld')
def hello_world():
    import requests

    url = 'http://localhost:3000/login?u=jp@adminde.com&p=aG9sYTEyMw=='
    headers = {'Content-type': 'application/json'}

    response = requests.get(url, headers=headers)
    ##print(response.json())
    
    ##print(response.json())
    return response.json()

## @TO_BE_DELETED
# Landing page
@app.route('/')
def landing():
    return render_template('index.html')

@app.route('/index')
def index():
    local_ip = request.remote_addr
    response = make_response(redirect('/status'))
    response.set_cookie('local_ip', local_ip)
    response.delete_cookie('_u')
    return response

## Login page
@app.route('/login')
def login():
    try:
        if request.cookies.get('_id') and request.cookies.get('_un'):
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            _auth_obj = auth(_id, _un)
            _status = _auth_obj.json().get('status')
            if _status == 'valid':
                _dash = make_response(redirect('/dashboard'))
                _dash.delete_cookie('_flag')
                return _dash
            else:
                _log = make_response(redirect('/login'))
                _log.delete_cookie('_id')
                _log.delete_cookie('_un')
                return _log
        else:
            return render_template('login.html')
    except Exception as e:
        return {"status": "An error Occurred", "error": e}
    

## Login process
@app.route('/s_login')
def s_login():
    try:
        import requests
        if request.cookies.get('_u') and request.cookies.get('_p'):
            _u = request.cookies.get('_u')
            _p = request.cookies.get('_p')
            url = _alx_url+'/login?u='+_u+'&p='+_p
            headers = {'Content-type': 'application/json'}
            _response = requests.get(url, headers=headers)
            _json_r = _response.json()
            _status = _response.status_code
            if _status == 200:
                response = make_response(redirect('/dashboard'))
                _id = _json_r.get('id')
                _un = _json_r.get('username')
                response.set_cookie('_id', _id)
                response.set_cookie('_un', _un)
                response.delete_cookie('_u')
                response.delete_cookie('_p')
                response.delete_cookie('_flag')
                return response
            else:
                _home = make_response(redirect('/login'))
                _home.delete_cookie('_u')
                _home.delete_cookie('_p')
                _home.set_cookie('_flag', 'Error user not found')
                return _home
        else:
            _home = make_response(redirect('/login'))
            return _home
    except Exception as e:
        return {"status": "An error Occurred", "error": e}

## Dashboard Service.
@app.route('/dashboard')
def dashboard():
    try:
        if request.cookies.get('_id') and request.cookies.get('_un'):
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            _auth_obj = auth(_id, _un)
            _status = _auth_obj.json().get('status')
            if _status == 'valid':
                return render_template('dashboard.html')
            else:
                _log = make_response(redirect('/login'))
                _log.delete_cookie('_id')
                _log.delete_cookie('_un')
                return _log
        else:
            _log = make_response(redirect('/login'))
            return _log
                
    except Exception as e:
        return {"status": "An error Occurred", "error": e}
    
## Logout service
@app.route('/logout')
def logout():
    try:
        _out = make_response(redirect('/'))
        _out.delete_cookie('_id')
        _out.delete_cookie('_un')
        return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": e}

## Signup service
@app.route('/signup')
def signup():
    try:
        if request.cookies.get('_id') and request.cookies.get('_un'):
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            _auth_obj = auth(_id, _un)
            _status = _auth_obj.json().get('status')
            if _status == 'valid':
                _dash = make_response(redirect('/dashboard'))
                _dash.delete_cookie('_flag')
                return _dash
            else:
                _log = make_response(redirect('/login'))
                _log.delete_cookie('_id')
                _log.delete_cookie('_un')
                _log.delete_cookie('_flag')
                return _log
        else:
            return render_template('signup.html')
    except Exception as e:
        return {"status": "An error Occurred", "error": e}

## Login process
@app.route('/s_signup')
def s_signup():
    try:
        _un = request.cookies.get('_un')
        _pw = request.cookies.get('_pw')
        _em = request.cookies.get('_em')
        _bd = request.cookies.get('_bd')
        _fn = request.cookies.get('_fn')
        _po = request.cookies.get('_po')
        _pn = request.cookies.get('_pn')
        _pc = request.cookies.get('_pc')
        _tr = request.cookies.get('_tr')
        _ty = request.cookies.get('_ty')
        print('username: '+_un+' password: '+_pw+' email: '+_em+' birthday: '+_bd+' fullname: '+_fn+' phone: '+_pn+' pin code: '+_pc+' terms: '+_tr+' type: '+_ty )

        url = _alx_url+'/signup'
        headers = {'Content-type': 'application/json'}
        _user = {
            "activate": True,
            "username": _un,
            "bday": _bd,
            "email": _em,
            "fname": _fn,
            "pass": _pw,
            "phone": _po,
            "pin": _pn,
            "plan": 1,
            "postalCode": _pc,
            "terms": _tr,
            "type": _ty
        }
        print(_user)

        _response = requests.post(url, json=_user, headers=headers) 

        print(_response)
        print(_response.status_code)
        ##_status = _response.status_code
        
        if _response.status_code == 202:
            ##return "Successfuly created."
            _logi = make_response(redirect('/login'))
            _logi.set_cookie('_flag', 'User created, login to start.')
            _logi.delete_cookie('_un')
            _logi.delete_cookie('_em')
            _logi.delete_cookie('_pw')
            _logi.delete_cookie('_bd')
            _logi.delete_cookie('_fn')
            _logi.delete_cookie('_po')
            _logi.delete_cookie('_pn')
            _logi.delete_cookie('_pc')
            _logi.delete_cookie('_tr')
            _logi.delete_cookie('_ty')
            return _logi
        else:
            _logi = make_response(redirect('/signup'))
            _logi.set_cookie('_flag', _response.json().get('status'))
            _logi.delete_cookie('_un')
            _logi.delete_cookie('_em')
            _logi.delete_cookie('_pw')
            _logi.delete_cookie('_bd')
            _logi.delete_cookie('_fn')
            _logi.delete_cookie('_po')
            _logi.delete_cookie('_pn')
            _logi.delete_cookie('_pc')
            _logi.delete_cookie('_tr')
            _logi.delete_cookie('_ty')
            return _logi
    except Exception as e:
        return {"status": "An error Occurred", "error": e}


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
    _local_ip = request.remote_addr
    local_ip = request.cookies.get('local_ip')
    return "Running fine - IP: "+local_ip


########################################
### Helpers ############################
########################################

## Base64 encode
def b64Encode(_string):
    try:
        print(" >> b64Encode() helper.")
        _out = base64.b64encode(_string.encode('utf-8'))
        _r_out = str(_out, "utf-8")
        return _r_out
    except Exception as e:
        return {"status": "An error Occurred", "error": e}

if __name__ == '__main__':
    app.run(debug=True)


## Auth
def auth(_id, _un):
    try:
        import requests
        _url = _alx_url+'/vauth'
        _headers = {'Content-type': 'application/json'}
        _json = {
            "id": _id,
            "username": _un
        }
        print(_json)
        _response = requests.post(_url, json=_json, headers=_headers)
        print(_response)
        return _response
    except Exception as e:
        return {"status": "An error Occurred", "error": e}