## Flask Front End app for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@maualkla)
## Date: May 2023.
## Current Version: 0.02
## Last Modification Date: Sept 2023.
## More info at @intmau in twitter or in http://maualkla.com
## Description: Web app to serve adminde-tc project.
## flask run --host=0.0.0.0 --port=3000

## Imports
from flask import Flask, jsonify, request, render_template, redirect, make_response
from config import Config
import os, requests, base64

## Initialize Flask App
app = Flask(__name__)

## Setup env vars
app.config.from_object(Config)

## globals
_alx_url = str(app.config['CONF_URL']) + ":" + str(app.config['CONF_PORT'])

## apidocs menu
@app.route('/apidocs')
def apidocs():
    return render_template('apidocs.html')

## apidocs v0.01
@app.route('/apidocs/v0-1')
def apidocs_v0_1():
    return render_template('apidocs_v0_1.html')

# Landing page
@app.route('/')
def landing():
    try:
        ## Set context values. 
        ## _logged is true in case the user is logged
        ## _sample is a test value.
        context = {
            "_logged": True,
            "_sample": "1234",
        }
        ## Set logged values in case the user is logged.
        _logged = True if request.cookies.get('_id') and request.cookies.get('_un') else False
        if _logged:
            ## Case where user is logged, save the _id and _un 
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            ## Create a auth object to validate the authentication of the user.
            _auth_obj = auth(_id, _un)
            ## save status of the auth object.
            _status = _auth_obj.json().get('status')
            ## if auth obj is = valid save a True in the context _logged variable, otherwise saves a false.
            if _status == 'valid':
                context['_logged'] = True
            else:
                context['_logged'] = False
        else:
            context['_logged'] = False
        ## render and return the home page including the context variables.
        return render_template('home.html', **context)
    except Exception as e:
        return {"status": "Error", "reason": str(e)}

## Index page
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
        ## Validate if _id and _un params are in the cookies. If thats the case validate the authentucation.
        if request.cookies.get('_id') and request.cookies.get('_un'):
            ## Save the cookies for _id and _un
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            ## Create a new auth object sending the _id and _un params
            _auth_obj = auth(_id, _un)
            ## save the status from the auth object.
            _status = _auth_obj.json().get('status')
            ## Validate if status = valid 
            if _status == 'valid':
                ## in case status = valid create a redirection to the /dashboard service deleting all _flag cookies.
                _dash = make_response(redirect('/dashboard'))
                _dash.delete_cookie('_flag_status')
                _dash.delete_cookie('_flag_content')
                return _dash
            else:
                ## in case of not valid, redirects to login and delete the _id and _un cookies
                _log = make_response(redirect('/login'))
                _log.delete_cookie('_id')
                _log.delete_cookie('_un')
                return _log
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
        return {"status": "An error Occurred", "error": str(e)}
    

## Login process
@app.route('/s_login')
def s_login():
    try:
        ## Validate if the cookies include the _u and _p 
        if request.cookies.get('_u') and request.cookies.get('_p'):
            ## saves _p and _u
            _u = request.cookies.get('_u')
            _p = request.cookies.get('_p')
            ## generates the url to call the service adding the -u and _p params
            url = _alx_url+'/login?u='+_u+'&p='+_p
            ## Create the headers for the request
            headers = {'Content-type': 'application/json'}
            ## Generates the call to the sevice. It is a GET call.
            _response = requests.get(url, headers=headers)
            ## Saves the response in _json_r
            _json_r = _response.json()
            ## Saves the status code in _status
            _status = _response.status_code
            ## Validate if the response status code is 200
            if _status == 200:
                ## Genetates a response object setting the redirection to /dashboard
                _dash = make_response(redirect('/dashboard'))
                ## saves the _id and _un params from the json object.
                _id = _json_r.get('id')
                _un = _json_r.get('username')
                ## Set the _id and _un cookies.
                _dash.set_cookie('_id', _id)
                _dash.set_cookie('_un', _un)
                ## delete any other possible cookie.
                _dash.delete_cookie('_u')
                _dash.delete_cookie('_p')
                _dash.delete_cookie('_flag')
                ## Returns the _dash response object.
                return _dash
            else:
                ## Generates a response object to /login
                _logi = make_response(redirect('/login'))
                ## Delete the _u and _p cookies to clean the status
                _logi.delete_cookie('_u')
                _logi.delete_cookie('_p')
                ## Set the _flag_content and _flag_status cookies to set a frontend alert
                _logi.set_cookie('_flag_content', 'Wrong username or password')
                _logi.set_cookie('_flag_status', '_box_yellow')
                ## return the response _login object.
                return _logi
        else:
            ## Generates a response object 
            _logi = make_response(redirect('/login'))
            ## Set the cookies for the flags to display a frontend alert.
            _logi.set_cookie('_flag_content', 'Missing username or password')
            _logi.set_cookie('_flag_status', '_box_red')
            ## Returns the response.
            return _logi
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Dashboard Service.
@app.route('/dashboard')
def dashboard():
    try:
        if request.cookies.get('_id') and request.cookies.get('_un'):
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            _auth_obj = auth(_id, _un)
            _status = _auth_obj.json().get('status')
            _pin_tb_set = True
            _lov = ['value1', 'value2', 'value3']
            context = {
                "user_name": _un,
                "values": _lov,
                "pin_tb_set": _pin_tb_set,
            }
            if _status == 'valid':
                return render_template('dashboard.html', **context)
            else:
                _log = make_response(redirect('/login'))
                _log.delete_cookie('_id')
                _log.delete_cookie('_un')
                return _log
        else:
            _log = make_response(redirect('/login'))
            return _log
                
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}
    
## Logout service
@app.route('/logout')
def logout():
    try:
        if request.cookies.get('_id') and request.cookies.get('_un'):
            _un = request.cookies.get('_un')
            _un = b64Encode(_un)
            _id = request.cookies.get('_id')
            ## generates the url to call the service adding the -u and _p params
            url = _alx_url+'/logout?_id='+_id+'&_username='+_un
            ## Create the headers for the request
            headers = {'Content-type': 'application/json'}
            ## Generates the call to the sevice. It is a GET call.
            _response = requests.get(url, headers=headers)
            _out = make_response(redirect('/'))
            _out.delete_cookie('_id')
            _out.delete_cookie('_un')
            return _out
        else:
            _out = make_response(redirect('/'))
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Signup service
@app.route('/signup')
def signup():
    try:
        ## validate if _id and _un cookies present
        if request.cookies.get('_id') and request.cookies.get('_un'):
            ## if present, save them into vars 
            _id = request.cookies.get('_id')
            _un = request.cookies.get('_un')
            ## Create a auth object with the cookie values.
            _auth_obj = auth(_id, _un)
            ## Save the status from the auth object
            _status = _auth_obj.json().get('status')
            ## if status valid, redirect to /dashboard and delete cookie flag, otherwise redirects to /login and deletes _id and _un cookies
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
            ### In case _id and _un not presnt, renders signup.html page.
            return render_template('signup.html')
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Login process
@app.route('/s_signup', methods=['POST'])
def s_signup():
    try:
        ## Validate required values, first creating a list of all required
        req_fields = ['i_full_name', 'i_username', 'i_email', 'i_phone', 'i_birthday', 'i_postal_code', 'i_pass', 'i_plan', 'i_terms']
        ## go and iterate to find all of them, if not _go will be false
        _go = True
        for req_value in req_fields:
            if req_value not in request.json:
                _go = False
        ## Initialize the payload object
        _payload = {}
        ## validate if all the required params are present
        if _go:
            ## Create a list of the correct names 
            _correct_fields_name = ['fname', 'username', 'email', 'phone', 'bday', 'postalCode', 'pass', 'plan', 'terms']
            ## initialize a counter
            i = 0
            ## Create a for each in the _correct_fields
            for _corr in _correct_fields_name:
                ## for each loop, add a parameter and value to the payload object. Adds 1 to the counter for each iteration
                _payload[_corr] = request.json[req_fields[i]]
                i += 1
            ## Add extra values fixed.
            _payload['type'] = '2'
            _payload['pin'] = ''
            _payload['activate'] = True
            ## Set the url to be called.
            _url = _alx_url+'/user'
            ## Set the headers to call the service
            _headers = {'Content-type': 'application/json'}
            ## create a post request sending the _payload and headers
            _response = requests.post(_url, json=_payload, headers=_headers)
            ## Validate the response and if same as 202 retrieves a success and 202 status
            if str(_response.status_code) == str(202):
                return jsonify({"message": "user successfully created"}), 202
            ## Else, return a error message and the same error message returned by the alexandria api
            else:
                return jsonify({"status": "error", "code": _response.status_code, "reason": _response.json().get('reason')}), 200
        else: 
            return jsonify({"status": "error", "code": "403", "reason": "Missing required fields."}), 403 
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Update User process
@app.route('/user', methods=['PUT'])
def updateUser():
    try:
        return "False"
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

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
        return {"status": "An error Occurred", "error": str(e)}

if __name__ == '__main__':
    app.run(debug=True)


## Auth
def auth(_id, _un):
    try:
        import requests
        _url = _alx_url+'/auth'
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
        return {"status": "An error Occurred", "error": str(e)}