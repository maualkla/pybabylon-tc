## Flask Front End app for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@maualkla)
## Date: May 2023.
## Current Version: 0.03
## Last Modification Date: jan 2024.
## More info at @intmau in twitter or in http://maualkla.com
## Description: Web app to serve adminde-tc project.
## flask run --host=0.0.0.0 --port=3000

## Imports
from flask import Flask, jsonify, request, render_template, redirect, make_response
from config import Config
from utilities.helpers import Helpers
from utilities.handlers import Handlers
import os, requests, base64

## Initialize Flask App
app = Flask(__name__)

## Setup env vars
app.config.from_object(Config)

## globals
_alx_url = str(app.config['CONF_URL']) + ":" + str(app.config['CONF_PORT'])

################################################################################################################
## apidocs menu
@app.route('/apidocs')
def apidocs():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        ## validate if _logged
        if _logged:
            context= {
                "_logged" : _logged
            }
            return render_template('apidocs.html', **context)
        else:
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "Error", "reason": str(e)}

## apidocs v0.01
@app.route('/apidocs/v0-1')
def apidocs_v0_1():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        ## validate if _logged
        if _logged:
            context= {
                "_logged" : _logged
            }
            return render_template('apidocs_v0_1.html', **context)
        else:
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "Error", "reason": str(e)}
    
## apidocs v0.01
@app.route('/apidocs/v0-2')
def apidocs_v0_2():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        ## validate if _logged
        if _logged:
            context= {
                "_logged" : _logged
            }
            return render_template('apidocs_v0_2.html', **context)
        else:
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "Error", "reason": str(e)}

################################################################################################################

# Landing page
@app.route('/')
def landing():
    try:
        _logged = False
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            ## user search
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            if _user_id:
                _logged = True
            else:
                _log = make_response(redirect('/logout'))
                return _log
        context = {
            "_logged": _logged,
            "_sample": "1234",
        }
        ## render and return the home page including the context variables.
        return render_template('home.html', **context)
    except Exception as e:
        return {"status": "Error", "reason": str(e)}

################################################################################################################

## Index page
@app.route('/index')
def index():
    ## Set a logged variable requesting the _id and _us cookies.
    _logged = True if request.cookies.get('_id') and request.cookies.get('_un') or 1 == 1 else False
    ## validate if _logged
    if _logged:
        return "<div class='_menu_box _box_main _box_main_bot'> Index Testing Page </div><br><a href='/index'>Click here to Reload</a>"
    else:
        response = make_response(redirect('/'))
    return response

################################################################################################################

## Login page
@app.route('/login')
def login():
    try:
        ## Set a logged variable requesting the sessionId cookie.
        _session = True if request.cookies.get('SessionId') else False
        ## validate if _logged
        if _session:
            ## in case status = valid create a redirection to the /dashboard service deleting all _flag cookies.
            _dash = make_response(redirect('/dashboard'))
            _dash.delete_cookie('_flag_status')
            _dash.delete_cookie('_flag_content')
            return _dash
        else:
            ## if _id and _un cookies are not present, validate id _flag cookies are present.
            if request.cookies.get('_flag_content') and request.cookies.get('_flag_status'):
                ## if _flag cookies are present, set the context object to the content of the cookies.
                context = {
                    "_flag_content": request.cookies.get('_flag_content'),
                    "_flag_status": request.cookies.get('_flag_status')
                }
            else:
                ## Else, set the context object as empty.
                context = {}
            ## Return the login template sending the context object.
            return render_template('login.html', **context)
    except Exception as e:
        return {"status": "An earror Occurred", "error": str(e)}

################################################################################################################

## Logout service
@app.route('/logout')
def logout():
    try:
        ## validate if Session Id present in cookies
        if request.cookies.get('SessionId'):
            ## in case present in cookies, send a delete /session request
            _session_id = request.cookies.get('SessionId')
            url = _alx_url+'/session'
            ## Create the headers for the request
            headers = {'SessionId': _session_id}
            ## Generates the call to the sevice. It is a GET call.
            _response = requests.delete(url, headers=headers)
            ## makes a response where delete all cookies and redirect to home
            _out = make_response(redirect('/'))
            _out.delete_cookie('SessionId')
            _out.delete_cookie('browserVersion')
            _out.delete_cookie('clientIP')
            return _out
        else:
            ## else redirects to home
            _out = make_response(redirect('/'))
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## Signup service
@app.route('/signup')
def signup():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            ## user search
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            ## if status valid, redirect to /dashboard and delete cookie flag, otherwise redirects to /login and deletes _id and _un cookies
            if _user_id:
                _dash = make_response(redirect('/dashboard'))
                _dash.delete_cookie('_flag_status')
                _dash.delete_cookie('_flag_content')
                return _dash
            else:
                _log = make_response(redirect('/login'))
                _log.delete_cookie('SessionId')
                _log.delete_cookie('browserVersion')
                _log.delete_cookie('clientIP')
                return _log
        else:
            ### In case _id and _un not presnt, renders signup.html page.
            return render_template('signup.html')
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## Dashboard Service.
@app.route('/dashboard')
def dashboard():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _log = make_response(redirect('/login'))
        _log.delete_cookie('SessionId')
        _log.delete_cookie('browserVersion')
        _log.delete_cookie('clientIP')
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            ## generate a auth object and save the response in _auth_obj
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            if _user_id:
                ## get data del useer
                _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                if _userdata:
                    ## get data del ws del user.
                    _filter = ":"+_user_id+";limit:1"
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", False, "owner"+_filter)
                    if _wsdata:
                        ## get last login from the user.
                        _trxdata = Handlers.get_data(_alx_url, request, "transaction", False, "userId"+_filter)
                        if _trxdata:
                            ## define context
                            _user = _userdata['items'][0]
                            _ws = _wsdata['items'][0] if _wsdata['containsData'] else False
                            _llog = _trxdata['items'][0] if _trxdata['containsData'] else False
                            context = {
                                "user_id": _user_id,
                                "user_name": _user['username'],
                                "user_type": _user['type'],
                                "user_fname": _user['fname'],
                                "user_pin": _user['pin'] if _user['pin'] > 0 else False,
                                "ws_informal_name": _ws['InformalName'] if _ws else False,
                                "ws_tax_id": _ws['TaxId'] if _ws else False,
                                "trx_last_login_date": _llog['dateTime'][0:2]+"-"+_llog['dateTime'][2:4]+"-"+_llog['dateTime'][4:8]+" "+_llog['dateTime'][8:] if _llog else False,
                                "_flag_status": "",
                                "_flag_content": ""
                            }
                            print(context)
                            return render_template('dashboard.html', **context)
                        else:
                            ## return to login 
                            return _log
                    else:
                        ## return to login 
                        return _log
                else:
                    ## return to login 
                    return _log
            else:
                ## return to login 
                return _log
        else:
            ## return to login 
            return _log
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################
    
## Account Service
@app.route('/account')
def account():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _log = make_response(redirect('/login'))
        _log.delete_cookie('SessionId')
        _log.delete_cookie('browserVersion')
        _log.delete_cookie('clientIP')
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            ## user search
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            ## if status valid, redirect to /dashboard and delete cookie flag, otherwise redirects to /login and deletes _id and _un cookies
            if _user_id:
                print(_user_id)
                ## get status 
                _full_user_data = Handlers.get_data(_alx_url, request, "user", _user_id)
                _user_data = _full_user_data["items"][0]
                context = {
                    "email": _user_id,
                    "fname": _user_data["fname"],
                    "username": _user_data["username"],
                    "phone": _user_data["phone"],
                    "bday": _user_data["bday"], 
                    "postalCode": _user_data["postalCode"],
                    "pin": _user_data["pin"]
                }
                return render_template('account.html', **context)
            else:
                ## return to login 
                return _log
        else:
            ## return to login 
            return _log
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

@app.route('/workspace/<_id>')
def workspace_option(_id):
    ## Set a logged variable requesting the _id and _us cookies.
    _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
    _out = make_response(redirect('/logout'))
    ## validate if _logged
    if _required_cookies:
        ## if present, save the _id and _un
        _session_id = request.cookies.get('SessionId')
        _client_bw = request.cookies.get('browserVersion')
        _client_ip = request.cookies.get('clientIP')
        _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
        if _user_id:
            print(_user_id)
            _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
            _user = _userdata['items'][0]
            print(_user)
            context = {
                "user_id": _user_id,
                "user_name": _user['username'],
                "user_type": _user['type'],
                "user_fname": _user['fname'],
                "user_pin": _user['pin'],
                "_flag_status": "",
                "_flag_content": ""
            }
            if _id == 'new':
                return render_template('new_workspace.html', **context)
            else:
                _filter = ":"+_user_id
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                if _wsdata['containsData'] == True:
                    return render_template('manage_workspace.html')
                else: 
                    _ws = make_response(redirect('/workspace'), **context)
                    return _ws
    ## validate the user is allowed to see this page. 
    ## check username
    ## check if workspace id is of this user.
    ## if it is, display info
    ## if not, return to /worspace
    else:
        return _id


## Workspace Service.
@app.route('/workspace')
def workspace():
    try: 
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            if _user_id:
                _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                if _userdata:
                    ## get data del ws del user.
                    _filter = ":"+_user_id
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", False, "owner"+_filter)
                    _user = _userdata['items'][0]
                    _ws = _wsdata['items'] if _wsdata['containsData'] else False
                    context = {
                        "user_id": _user_id,
                        "user_name": _user['username'],
                        "user_type": _user['type'],
                        "user_fname": _user['fname'],
                        "user_pin": _user['pin'] if _user['pin'] > 0 else False,
                        "ws_list": _ws if _ws else False,
                        "_flag_status": "",
                        "_flag_content": ""
                    }
                    return render_template('workspace.html', **context)
                else:
                    _dash = make_response(redirect('/dashboard'))
                    return _dash
            else: 
                _out = make_response(redirect('/logout'))
                return _out
        else:
            ## return to login
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## Update User process
@app.route('/user', methods=['GET', 'PUT'])
def updateUser():
    try:
        if request.method == 'GET':
            _dash = make_response(redirect('/dashboard'))
            return _dash
        ## Validate if _un and _id are in the headers.
        if request.headers.get('_id') and request.headers.get('_un') and request.json['email']:
            ## save the _id and _un values
            _id = request.headers.get('_id')
            _un = request.headers.get('_un')
            ## generate a auth object.
            _auth_obj = Helpers.auth(_id, _un)
            ## get the status
            _status = _auth_obj.json().get('status')
            ## validate the status
            if _status == 'valid':
                ## Create the json object
                _json = {}
                ## Add email as a mandatory value
                _json['email'] = request.json['email']
                ## define the not mandatory fields
                req_fields = ['pass','activate', 'username', 'bday', 'fname', 'phone', 'pin', 'plan', 'postalCode', 'type']
                ## Set _go flag to false.
                _go = False
                ## go for all the possible fields to be send
                for req_value in req_fields:
                    ## In case required field in json payload 
                    if req_value in request.json:
                        ## update _json_payload object adding current field.
                        _json[req_value] = request.json[req_value]
                        ## update flag to update user
                        _go = True
                ## if any of the fields were processed and added to the json object, the _go flag will be true, else it will end the flow
                if _go:
                    ## preparate, the url, headers
                    _url = _alx_url+'/user'
                    _headers = {'Content-type': 'application/json'}
                    ## save the response of sending a put request to the service to update user.
                    _response = requests.put(_url, json=_json, headers=_headers)
                    ## Validate the status code as 202
                    if str(_response.status_code) == str(202):
                        return jsonify({"code": "202", "reason": "user successfully updated"}), 202
                    else:
                        return jsonify({"code": str(_response.status_code), "reason": "Error updating user"}), 500
                else:
                    return jsonify({"code": 403, "reason": "Missing required parameters"}), 403
            else:
                return jsonify({"code": 400, "reason": "Invalid authorization"}), 400
        else: 
            return jsonify({"code": 400, "reason": "Missing authorization."}), 400
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## Transactions service
@app.route('/transactions')
def transactions():
    try: 
        ## Set a logged variable requesting the _id and _us cookies.
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        ## validate if _logged
        if _logged:
            ## we need a function to know the user level...
            ## for now, we define the user level to 3
            _level = 3
            ## validate user level
            if _level > 2:
                ## If level > 2 request the data from last 10 trxs
                ## preparate, the url, headers
                _url = _alx_url+'/transaction'
                _headers = {'Content-type': 'application/json'}
                ## save the response of sending a put request to the service to update user.
                _response = requests.get(_url, headers=_headers)
                ## Validate the status code as 202
                if str(_response.status_code) == str(200):
                    ## save the items from backend in to the _items variable.
                    _items = _response.json().get('items')
                else:
                    ## set a dummy trx variable.
                    _items = [{
                        "date": "-",
                        "id": "NO TRX Available",
                        "user": "-"
                    }]
                ## Set the context variable.
                context = {
                    '_level': _level,
                    '_logged': '',
                    '_add': '', 
                    '_items': _items
                }
                ## returns the transactions.html view.
                return render_template('transactions.html', **context)
            else: 
                ## if not level 2> returns you to dasboard-
                _dash = make_response(redirect('/dashboard'))
                return _dash
        else:
            ## if not logged, returns you to login.
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## Users Manager Service
@app.route('/users')
def users():
    try: 
        ## Valdiate if logged.
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        if _logged:
            ## we need a function to know the user level...
            _level = 3
            if _level > 2:
                
                ## preparate, the url, headers
                _url = _alx_url+'/user'
                _headers = {'Content-type': 'application/json'}
                ## save the response of sending a put request to the service to update user.
                _response = requests.get(_url, headers=_headers)
                ## Validate the status code as 202
                if str(_response.status_code) == str(200):
                    ## return items 
                    _items = _response.json().get('items')
                else:
                    ## define sample json
                    _items = [{
                        "username": "NO USERS FOUND",
                        "email": "",
                        "postalCode": ""
                    }]
                context = {
                    '_level': _level,
                    '_logged': '',
                    '_add': '', 
                    '_items': _items
                }
                ## return users view
                return render_template('users.html', **context)
            else: 
                ## return to dashboard service
                _dash = make_response(redirect('/dashboard'))
                return _dash
        else:
            ## return to login service.
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## data operations
@app.route('/v1/admdata', methods=['GET', 'POST', 'PUT', 'DELETE'])
def data_ops():
    try:
        ## method GET
        if request.method == 'GET':
            ## get id and query params
            _id = request.args.get('id') if request.args.get('id') else False
            _query = request.args.get('filter') if request.args.get('filter') else False
            ## validate service
            if request.args.get('service'):
                ## call handlers service
                _response = Handlers.get_data(_alx_url, request, request.args.get('service'), _id, _query)
                if _response: 
                    return jsonify(_response), 200
                else:
                    return jsonify({"status": "error", "reason": "Service returned a invalid response.", "details": "review console logs for further details."}), 500
            else:
                return jsonify({}), 403
        ## method POST
        elif request.method == 'POST':
            ## validate service
            if request.args.get('service') and request.json['item']:
                ## call handlers service
                _response = Handlers.post_data(_alx_url, request, request.args.get('service'), request.json['item'])
                if _response: 
                    return jsonify(_response), 202
                else:
                    return jsonify({"status": "error", "reason": "Service returned a invalid response.", "details": "review console logs for further details."}), 500
            else:
                return jsonify({}), 403
        ## method PUT
        elif request.method == 'PUT':
            print("put generic service")
            ## validate service
            if request.args.get('service') and request.json['item']:
                print(" contains required args")
                ## call handlers service
                _response = Handlers.put_data(_alx_url, request, request.args.get('service'), request.json['item'])
                if _response: 
                    return jsonify(_response), 202
                else:
                    return jsonify({"status": "error", "reason": "Service returned a invalid response.", "details": "review console logs for further details."}), 500
            else:
                return jsonify({}), 403
        ## delete
        elif request.method == 'DELETE':
            ## get id and query params
            _id = request.args.get('id') if request.args.get('id') else False
            _query = request.args.get('filter') if request.args.get('filter') else False
            ## validate service
            if request.args.get('service'):
                ## call handlers service
                _response = Handlers.delete_data(_alx_url, request, request.args.get('service'), _id, _query)
                if _response: 
                    return jsonify(_response), 200
                else:
                    return jsonify({"status": "error", "reason": "Service returned a invalid response.", "details": "review console logs for further details."}), 500
            else:
                return jsonify({}), 403
    except Exception as e:
        return jsonify({"status": "An error Occurred", "error": str(e)}), 500

################################################################################################################

## API Status
@app.route('/status')
def status():
    _local_ip = request.remote_addr
    local_ip = request.cookies.get('local_ip')
    return "Running fine - IP: "+_local_ip

##### Service paths
## /legal
@app.route('/legal')
def legal():
    return '/legal in construction, go back to <a href="/"> home </a>'

##### Service paths
## /about
@app.route('/about')
def about():
    return '/about in construction, go back to <a href="/"> home </a>'

##### Service paths
## /jobs
@app.route('/jobs')
def jobs():
    return '/jobs in construction, go back to <a href="/"> home </a>'

##### Service paths
## /help
@app.route('/help')
def help():
    try:
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        context = {
                "_logged": _logged,
                "_sample": "1234",
            }
        return render_template('help.html', **context)
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}
