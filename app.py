## Flask Front End app for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@intmau)
## Date: May 2023.
## Current Version: 0.05
## Last Modification Date: sep 2024.
## More info at @intmau in twitter or in http://themudev.com
## Description: Web app to serve adminde-tc project.
## flask run --host=0.0.0.0 --port=3001

## Imports
import json
from flask import Flask, jsonify, request, render_template, redirect, make_response, url_for
from config import Config
from utilities.helpers import Helpers
from utilities.handlers import Handlers
from models.levels import levels
from models.plans import plans
from models.severityLevels import severityLevels
from io import StringIO
import requests
import csv, stripe




## Initialize Flask App
app = Flask(__name__)

## Setup env vars
app.config.from_object(Config)

## globals
_alx_url = str(app.config['CONF_URL']) + ":" + str(app.config['CONF_PORT'])

## set logging variables
logging = app.config['LOGGING'] 

## stripe keys
stripe_keys = {
    "secret_key": app.config["CONF_STRIPE_SEC_KEY"],
    "publishable_key": app.config["CONF_STRIPE_PUB_KEY"],
    "endpoint_secret": app.config["CONF_STRIPE_ENDPOINT_SECRET"], # new
}
## product prices
stripe_prices = [ app.config["CONF_STRIPE_SUBS_0"], app.config["CONF_STRIPE_SUBS_1"], app.config["CONF_STRIPE_SUBS_2"]]

## setup stripe api key
stripe.api_key = stripe_keys["secret_key"]

################################################################################################################
## apidocs menu
@app.route('/apidocs')
def apidocs():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        ## validate if _logged
        if _required_cookies:
            context= {
                "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                "_logged" : True if _required_cookies else False,
                "host_url": request.host_url
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
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        ## validate if _logged
        if _required_cookies:
            context= {
                "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                "_logged" : True if _required_cookies else False,
                "host_url": request.host_url
            }
            return render_template('apidocs_v0_1.html', **context)
        else:
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "Error", "reason": str(e)}
    
## apidocs v0.02
@app.route('/apidocs/v0-2')
def apidocs_v0_2():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        ## validate if _logged
        if _required_cookies:
            context= {
                "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                "_logged" : True if _required_cookies else False,
                "host_url": request.host_url
            }
            return render_template('apidocs_v0_2.html', **context)
        else:
            _log = make_response(redirect('/login'))
            _log.delete_cookie('_id')
            _log.delete_cookie('_un')
            return _log
    except Exception as e:
        return {"status": "Error", "reason": str(e)}
    
## apidocs v0.04
@app.route('/apidocs/v0-4')
def apidocs_v0_4():
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        ## validate if _logged
        if _required_cookies:
            context= {
                "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                "_logged" : True if _required_cookies else False,
                "host_url": request.host_url
            }
            return render_template('apidocs_v0_4.html', **context)
        else:
            _log = make_response(redirect('/login'))
            return _log
    except Exception as e:
        return {"status": "Error", "reason": str(e)}

################################################################################################################

# Landing page
@app.route('/')
def landing():
    try:
        _logged = False
        _cookies_policy = True if request.cookies.get('cookies_policy') else False
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
            "_cookies_policy": _cookies_policy,
            "_logged": _logged,
            "_sample": "1234",
            "host_url": request.host_url
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
                    "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                    "_flag_content": request.cookies.get('_flag_content'),
                    "_flag_status": request.cookies.get('_flag_status'),
                    "host_url": request.host_url
                }
            else:
                ## Else, set the context object as empty.
                context = {
                    "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                    "host_url": request.host_url
                }
            ## Return the login template sending the context object.
            return render_template('login.html', **context)
    except Exception as e:
        return {"status": "An earror Occurred", "error": str(e)}
    

################################################################################################################

## reset password for user
## service to serve the reset pass view for users
@app.route('/reset_pass_user', methods=['GET', 'POST'])
def reset_pass_user():
    try:
        ## we validate the method for the service request.
        if request.method == 'GET':
            ## We validate the email_sent cookie
            if request.cookies.get('email_sent') == '1':
                ## on this case, the emails has been sent and the notification is triggered.
                context={"_cookies_policy": True if request.cookies.get('cookies_policy') else False,"_flag_status": "_box_green", "_flag_content": "Reset Pass Email Sent", "host_url": request.host_url,"recaptcha_key": app.config["RECAPTCHA_SITE_KEY"]}
            elif request.cookies.get("email_sent") == '2':
                ## on this case, the link used was expired and it is required to set a new reset token.
                context={"_cookies_policy": True if request.cookies.get('cookies_policy') else False,"_flag_status": "_box_red", "_flag_content": "Link expired, send a new email.", "host_url": request.host_url,"recaptcha_key": app.config["RECAPTCHA_SITE_KEY"]}
            elif request.cookies.get("email_sent") == '3':
                ## in this case, the email was alredy sent.
                context={"_cookies_policy": True if request.cookies.get('cookies_policy') else False,"_flag_status": "_box_red", "_flag_content": "Reset password email already sent, please review your inbox or try again later.", "host_url": request.host_url,"recaptcha_key": app.config["RECAPTCHA_SITE_KEY"]}
            else:
                ## in this case, there is no flag presented, only the host url and the recaptcha key.
                context={"_cookies_policy": True if request.cookies.get('cookies_policy') else False,"host_url": request.host_url, "recaptcha_key": app.config["RECAPTCHA_SITE_KEY"]}
            ## return the reset_pass_user.html template and delete the cookie.
            resp = make_response(render_template('reset_pass_user.html', **context))
            resp.delete_cookie('email_sent')
            return resp
        ## when method is post this is true.
        elif request.method == 'POST':
            ## get the form parameters [email, recaptchaResponse]
            email = request.form['email']
            captcha_response = request.form['recaptchaResponse']
            ## call the function is_human sending the captcha_response and getting a number for the validation. 
            humanValidation = is_human(captcha_response)
            if humanValidation:
                ## if humanValidation > .5 means it is probably a real user, else is probably a bot.
                if humanValidation > 0.5:
                    ## gets the current user data.
                    userdata = Handlers.get_data(_alx_url, request, "user",  email.upper(), False, True, app.config['PRIVATE_SERVICE_TOKEN'])
                    ## if current user search contains data
                    if userdata['containsData']:
                        ## get the user data
                        userdata = userdata['items'][0]
                        ## set the date format, also calls the datetime lib is called
                        date_format = "%d.%m.%Y"
                        from datetime import datetime
                        path = 0
                        ## here we validate the expiracy date, if False path=1
                        if userdata['rp_email_exp_date'] == False:
                            path = 1
                            ## generate the new code and expdate
                        ## if is true, the path=3 that means we need to clear the variables.
                        elif userdata['rp_email_exp_date'] == True:
                            path = 3
                        else:
                            ## set userdate and current date.
                            user_date = datetime.strptime(userdata['rp_email_exp_date'], date_format)
                            current_date = datetime.strptime(Helpers.generateDateTime()[1], date_format)
                            ## When user date is smaller or equal to current date, we set the path=1
                            if user_date >= current_date:
                                ## generate new token
                                path = 1
                            ## else path=2
                            else: 
                                ## reuse old token
                                path = 2
                        ## path=1 means we generate a new token and update it to the userdata in firebase.
                        if path == 1:
                            reset_token = Helpers.randomString(65)
                            exp_date = Helpers.generateDateTime(-1)[1]
                            updres = Handlers.put_data(_alx_url, request, "user", {"email": email.upper(), "rp_email_token": reset_token, "rp_email_exp_date": exp_date})
                        ## path=2 return the current token.
                        elif path == 2:
                            reset_token = userdata['rp_email_token']
                        ## path=3 return to /reset_pass_user and sending the 3 param.
                        else: 
                            resp = make_response(redirect('/reset_pass_user'))
                            resp.set_cookie('email_sent', '3')  
                            return resp
                        ## template parameters set to be sent to the email template.
                        template_vars = {
                            "user_email": email,
                            "pass_reset_link": request.host_url+"reset_password?type=1&token="+str(reset_token)
                        }
                        ## send the emailSender function to send the required email.
                        response = Helpers.emailSender(email, app.config["MAIL_TEMPLATE_RESET"] , app.config["MAIL_API_TOKEN"], template_vars)
                        if logging: print(response)
                        status = "All smooth, email was sent with a reset_pass link."
                    else:
                        status = "Account not found."
                else: 
                    status = "Score not valid"
            else:
                status = "Sorry ! Bots are not allowed."
            if logging: print(status)
            ## here we return a response for /reset_pass_user
            resp = make_response(redirect('/reset_pass_user'))
            resp.set_cookie('email_sent', '1')  
            return resp
        else:
            return jsonify({"status": "error"}), 405
    except Exception as e:
        print("(!) Expection in reset_pass_user() "+str(e))
        return {"status": "An error Occurred", "error": str(e)} 

################################################################################################################

### reset_password
@app.route('/reset_password', methods=['GET', 'PUT'])
def reset_password():
    try:
        out = make_response(redirect('/'))
        ## when method is GET
        if request.method == 'GET':
            ## require the token and type params in the get call.
            if 'token' in request.args and 'type' in request.args:
                ## generate the filter to search for the token
                _filter = "resetToken:"+request.args.get('token')
                ## set user if type=1 else set tenantUser
                service_name = "user" if request.args.get('type') == '1' else "tenantUser"
                ## get userdata from filter
                userdata = Handlers.get_data(_alx_url, request, service_name, False, _filter, True, app.config['PRIVATE_SERVICE_TOKEN'])
                ## if contains data
                if userdata['containsData']:
                    ## get userdata
                    userdata = userdata['items'][0]
                    ## set the date format and import the datetime
                    date_format = "%d.%m.%Y"
                    from datetime import datetime
                    ## set userdate and current date.
                    user_date = datetime.strptime(userdata['rp_email_exp_date'], date_format)
                    current_date = datetime.strptime(Helpers.generateDateTime()[1], date_format)
                    ## compare the currentdate and userdate
                    if user_date >= current_date:
                        ## set the template to be sent to the email 
                        temp_json = {"email": userdata['email'].upper(), "rp_email_token": True, "rp_email_exp_date": True} if request.args.get('type') == '1' else {"Tenant": userdata['Id'].split(".")[0].upper(), "currentUser": "System", "Id": userdata['Id'].upper(), "rp_email_token": True, "rp_email_exp_date": True}
                        ## update the data
                        updres = Handlers.put_data(_alx_url, request, service_name, temp_json )
                        ## set a context for the id, type and host_url 
                        context = {
                            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                            "id": userdata['email'] if request.args.get('type') == '1' else userdata['Id'],
                            "type": 1 if request.args.get('type') == '1' else 2,
                            "host_url": request.host_url
                        }
                        ## return reset_pass_form.html and the context
                        return render_template('reset_pass_form.html', **context)
                    else:
                        ## depending the type, return each type.
                        if request.args.get('type') == '1':
                            out = make_response(redirect('/reset_pass_user'))
                        else: 
                            out = make_response(redirect('/reset_pass_tuser'))
                        out.set_cookie('email_sent', '2')
                        return 
                else: 
                    return out
            else:
                return out
        ## when method equals PUT
        if request.method == 'PUT':
            ## validate the type and if there is a Id or Email present.
            if 'type' in request.args and ('Id' in request.json or 'email' in request.json):
                ## set the user and tenatUser
                service_name = "user" if request.args.get('type') == '1' else "tenantUser"
                ## get the data
                userdata = Handlers.get_data(_alx_url, request, service_name,  request.json['email'].upper() if request.args.get('type') == '1' else request.json['Id'].upper(), False, True, app.config['PRIVATE_SERVICE_TOKEN'])
                ## set the user password
                response = Handlers.put_user_password(_alx_url, request, service_name, request.json['email'].upper() if request.args.get('type') == '1' else request.json['Id'].upper(), request.json, app.config['PRIVATE_SERVICE_TOKEN'])
                ## validate the response code
                if response['code'] == '202' or response['code'] == 202:
                    ## set the temp_json
                    temp_json = {"email": request.json['email'].upper(), "rp_email_token": False, "rp_email_exp_date": False} if request.args.get('type') == '1' else {"Tenant": request.json['Id'].split(".")[0].upper(), "Id": request.json['Id'].upper(), "currentUser": "System", "rp_email_token": False, "rp_email_exp_date": False}
                    updres = Handlers.put_data(_alx_url, request, service_name, temp_json )
                    return jsonify(response), 200
                else:
                    return jsonify({"status": "error", "reason": "Error while updating data, please reach support@adminde.com for help."}), 409
            else: 
                return jsonify({"status": "error", "reason": "Missing parameters"}), 403
        else:
            return out

    except Exception as e:
        print("(!) Exception in reset_password() "+str(e))
        return {"status": "An error Occurred", "error": str(e)}

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
            context = {"_cookies_policy": True if request.cookies.get('cookies_policy') else False,"host_url": request.host_url}
            ### In case _id and _un not presnt, renders signup.html page.
            return render_template('signup.html', **context)
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
                ## get data del user
                _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                if _userdata['containsData']:
                    ## get data del ws del user.
                    _filter = ":"+_user_id+";limit:50"
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", False, "owner"+_filter)
                    if _wsdata['containsData']:
                        _ws = _wsdata['items'][0] if _wsdata['containsData'] else False
                    else: 
                        _ws = False
                        ## get last login from the user.
                    _trxdata = Handlers.get_data(_alx_url, request, "transaction", False, "userId"+_filter)
                    _tenantuserdata = Handlers.get_data(_alx_url, request, "tenantUser", False, "createdBy:"+_user_id)
                    ## define context
                    _user = _userdata['items'][0]
                    _llog = _trxdata['items'][0] if _trxdata['containsData'] else False
                    context = {
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "user_id": _user_id,
                        "user_name": _user['username'],
                        "user_type": _user['type'],
                        "user_fname": _user['fname'],
                        "user_plan": _user['plan'],
                        "user_pin": _user['pin'] if _user['pin'] > 0 else False,
                        "ws_informal_name": _ws['InformalName'] if _ws else False,
                        "ws_color_code": _ws['AlterHexColor'] if _ws else False,
                        "ws_tax_id": _ws['TaxId'] if _ws else False,
                        "trx_last_login_date": _llog['dateTime'] if _llog else False,
                        "ws_count": _wsdata['count'],
                        "tu_count": _tenantuserdata['count'],
                        "user_activated": _user['activate'],
                        "_flag_status": "_box_red" if _user['activate'] == False else "" ,
                        "_flag_content": "You need to activate your account." if _user['activate'] == False else "",
                        "host_url": request.host_url
                    }
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
                ## get status 
                _full_user_data = Handlers.get_data(_alx_url, request, "user", _user_id)
                _user_data = _full_user_data["items"][0]
                context = {
                    "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                    "email": _user_id,
                    "fname": _user_data["fname"],
                    "username": _user_data["username"],
                    "phone": _user_data["phone"],
                    "bday": _user_data["bday"], 
                    "postalCode": _user_data["postalCode"],
                    "pin": _user_data["pin"],
                    "host_url": request.host_url
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

## workspace empty
@app.route('/workspace/')
def workspace_empty():
    _ws = make_response(redirect('/workspace'))
    return _ws

## Workspace Id
@app.route('/workspace/<_id>')
def workspace_option(_id = False):
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
            _user = _userdata['items'][0]
            if _id == 'new':
                context = {
                    "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                    "user_id": _user_id,
                    "user_name": _user['username'],
                    "user_type": _user['type'],
                    "user_fname": _user['fname'],
                    "user_pin": _user['pin'],
                    "_flag_status": "",
                    "_flag_content": "",
                    "host_url": request.host_url
                }
                return render_template('new_workspace.html', **context)
            elif _id:
                _filter = ":"+_user_id
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                if _wsdata['containsData'] == True:
                    _ws = _wsdata["items"][0]
                    context = {
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "user_id": _user_id,
                        "user_name": _user['username'],
                        "user_type": _user['type'],
                        "user_fname": _user['fname'],
                        "user_pin": _user['pin'],
                        "wsdata": _ws,
                        "_flag_status": "",
                        "_flag_content": "",
                        "currentDate": Helpers.generateDateTime()[1],
                        "currentTime": Helpers.generateDateTime()[0],
                        "host_url": request.host_url
                    }
                    return render_template('manage_workspace.html', **context)
                else: 
                    _ws = make_response(redirect('/workspace'))
                    return _ws
            else: 
                _ws = make_response(redirect('/workspace'))
                return _ws
        else: 
            return _out
    ## validate the user is allowed to see this page. 
    ## check username
    ## check if workspace id is of this user.
    ## if it is, display info
    ## if not, return to /worspace/<id>/checkin
    else:
        _ws = make_response(redirect('/workspace/'+_id+'/checkin'))
        return _ws

## Tenant Users reset password
@app.route('/workspace/<_id>/reset_pass', methods=['GET', 'POST'])
def reset_password_tuser_process(_id = False):
    try: 
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _required_token = True if request.cookies.get('token') else False
        _out = make_response(redirect('/workspace/'+_id))
        ## validate if _logged
        if _required_cookies:
            return _out
        else: 
            ## validate the _id param and required token
            if _id and _required_token == False:
                ## search for the workspace data
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, False, True, app.config['PRIVATE_SERVICE_TOKEN'])
                ## if method is GET
                if request.method == 'GET':
                    ## set context 
                    context={
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "host_url": request.host_url, 
                        "recaptcha_key": app.config["RECAPTCHA_SITE_KEY"],
                        "ws_data": _wsdata['items'][0]
                    }
                    ## display alerts depending on the email_sent params
                    if request.cookies.get('email_sent') == '1':
                        context["_flag_status"] = "_box_green"
                        context["_flag_content"] = "Reset Pass Email Sent" 
                    elif request.cookies.get("email_sent") == '2':
                        context["_flag_status"] = "_box_red"
                        context["_flag_content"] = "Link expired, send a new email." 
                    elif request.cookies.get("email_sent") == '3':
                        context["_flag_status"] = "_box_red"
                        context["_flag_content"] = "Reset password email already sent, please review your inbox or try again later."
                    ## return the template
                    resp = make_response(render_template('reset_pass_tuser.html', **context))
                    resp.delete_cookie('email_sent')
                    return resp
                ## of method is POST
                elif request.method == 'POST':
                    ## set the form variables
                    tuserid = request.form['tuserid']
                    captcha_response = request.form['recaptchaResponse']
                    ## validate the captcha and to know if it is human
                    humanValidation = is_human(captcha_response)
                    if humanValidation:
                        ## in case .5 or more, it means it is probably a human, else it is probably a robot
                        if humanValidation > 0.5:
                            ## get the userdata
                            userdata = Handlers.get_data(_alx_url, request, "tenantUser",  tuserid.upper(), "tenant:"+_wsdata['items'][0]['TaxId'], True, app.config['PRIVATE_SERVICE_TOKEN'])
                            ## if present
                            if userdata['containsData']:
                                ## set the data
                                userdata = userdata['items'][0]
                                ## set the format and import the datetime
                                date_format = "%d.%m.%Y"
                                from datetime import datetime
                                path = 0
                                ## search for the path
                                if userdata['rp_email_exp_date'] == False:
                                    path = 1
                                    ## generate the new code and expdate
                                elif userdata['rp_email_exp_date'] == True:
                                    path = 3
                                else:
                                    ## set the userdate and currentdate
                                    user_date = datetime.strptime(userdata['rp_email_exp_date'], date_format)
                                    current_date = datetime.strptime(Helpers.generateDateTime()[1], date_format)
                                    if user_date >= current_date:
                                        ## generate new token
                                        path = 1
                                    else:
                                        ## reuse old token
                                        path = 2
                                ## save the path
                                if path == 1:
                                    reset_token = Helpers.randomString(65)
                                    exp_date = Helpers.generateDateTime(-1)[1]
                                    updres = Handlers.put_data(_alx_url, request, "tenantUser", {"Tenant": _wsdata['items'][0]['TaxId'], "Id": tuserid.upper(), "rp_email_token": reset_token, "rp_email_exp_date": exp_date})
                                elif path == 2:
                                    reset_token = userdata['rp_email_token']
                                else: 
                                    resp = make_response(redirect('workspace/'+_id+'/reset_pass'))
                                    resp.set_cookie('email_sent', '3')  
                                    return resp
                                ## return template variables
                                template_vars = {
                                    "company_name": _wsdata['items'][0]['InformalName'],
                                    "user_email": userdata['Email'],
                                    "pass_reset_link": request.host_url+"workspace/"+_id+"/reset_password?type=2&token="+str(reset_token)
                                }
                                ## send the emailSender function to send the required email.
                                response = Helpers.emailSender(userdata['Email'], app.config["MAIL_TEMPLATE_RESET_TU"] , app.config["MAIL_API_TOKEN"], template_vars)
                                status = "All smooth, email was sent with a reset_pass link."
                            else:
                                status = "Account not found."
                        else:   
                            status = "Score not valid"
                    else:
                        status = "Sorry ! Bots are not allowed."
                    resp = make_response(redirect('/workspace/'+_id+'/reset_pass'))
                    resp.set_cookie('email_sent', '1')  
                    return resp
                else:
                    return jsonify({"status": "error"}), 405
            else:
                return _out

    except Exception as e:
        print("(!) Exception in reset_pass_tuser(): "+str(e))
        return {"status": "An error Occurred", "error": str(e)}

### Tenant users reset_password page
@app.route('/workspace/<_id>/reset_password', methods=['GET', 'PUT'])
def reset_password_tuser_logic(_id = False):
    try:
        out = make_response(redirect('/'))
        _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, False, True, app.config['PRIVATE_SERVICE_TOKEN'])
        if request.method == 'GET' and _wsdata['containsData']:
            if 'token' in request.args and 'type' in request.args:
                _filter = "resetToken:"+request.args.get('token')
                service_name = "user" if request.args.get('type') == '1' else "tenantUser"
                userdata = Handlers.get_data(_alx_url, request, service_name, False, _filter, True, app.config['PRIVATE_SERVICE_TOKEN'])
                if userdata['containsData']:
                    ## save the contains data
                    userdata = userdata['items'][0]
                    ## set the date format and import the datetime
                    date_format = "%d.%m.%Y"
                    from datetime import datetime
                    ## set the userdate and currentdate
                    user_date = datetime.strptime(userdata['rp_email_exp_date'], date_format)
                    current_date = datetime.strptime(Helpers.generateDateTime()[1], date_format)
                    ## compare the currentdate and userdate
                    if user_date >= current_date:
                        ## set the temp_json data
                        temp_json = {"email": userdata['email'].upper(), "rp_email_token": True, "rp_email_exp_date": True} if request.args.get('type') == '1' else {"Tenant": userdata['Id'].split(".")[0].upper(), "currentUser": "System", "Id": userdata['Id'].upper(), "rp_email_token": True, "rp_email_exp_date": True}
                        updres = Handlers.put_data(_alx_url, request, service_name, temp_json )
                        ## set the context
                        context = {
                            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                            "id": userdata['email'] if request.args.get('type') == '1' else userdata['Id'],
                            "type": 1 if request.args.get('type') == '1' else 2,
                            "host_url": request.host_url,
                            "ws_data" : _wsdata['items'][0]
                        }
                        ## return the template
                        return render_template('reset_pass_form.html', **context)
                    else:
                        ## validate the type
                        if request.args.get('type') == '1':
                            out = make_response(redirect('workspace/'+_id+'/reset_pass_user'))
                        else: 
                            out = make_response(redirect('workspace/'+_id+'/reset_pass_tuser'))
                        out.set_cookie('email_sent', '2')
                        return 
                else: 
                    return out
            else:
                return out
        ## validate the method to be PUT and the workspace data to be real
        if request.method == 'PUT' and _wsdata['containsData']:
            ## validate the type and the presence of an Id or Email in the request.json
            if 'type' in request.args and ('Id' in request.json or 'email' in request.json):
                ## set the name for user or tenantUser depending on the type
                service_name = "user" if request.args.get('type') == '1' else "tenantUser"
                ## get the user data and set the password
                userdata = Handlers.get_data(_alx_url, request, service_name,  request.json['email'].upper() if request.args.get('type') == '1' else request.json['Id'].upper(), False, True, app.config['PRIVATE_SERVICE_TOKEN'])
                response = Handlers.put_user_password(_alx_url, request, service_name, request.json['email'].upper() if request.args.get('type') == '1' else request.json['Id'].upper(), request.json, app.config['PRIVATE_SERVICE_TOKEN'])
                ## if correct the code is 202 or '202'
                if response['code'] == '202' or response['code'] == 202:
                    ## set the template
                    temp_json = {"email": request.json['email'].upper(), "rp_email_token": False, "rp_email_exp_date": False} if request.args.get('type') == '1' else {"Tenant": request.json['Id'].split(".")[0].upper(), "Id": request.json['Id'].upper(), "currentUser": "System", "rp_email_token": False, "rp_email_exp_date": False}
                    updres = Handlers.put_data(_alx_url, request, service_name, temp_json )
                    return jsonify(response), 200
                else:
                    return jsonify({"status": "error", "reason": "Error while updating data, please reach support@adminde.com for help."}), 409
            else: 
                return jsonify({"status": "error", "reason": "Missing parameters"}), 403
        else:
            return out

    except Exception as e:
        print("(!) Exception in reset_password() "+str(e))
        return {"status": "An error Occurred", "error": str(e)}

## Tenant Users Overview
@app.route('/workspace/<_id>/users')
def workspace_users(_id = False):
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
                _user = _userdata['items'][0]
                if _id:
                    _filter = ":"+_user_id
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                    if _wsdata['containsData'] == True:
                        _ws = _wsdata["items"][0]
                        _teanntuserdata = Handlers.get_data(_alx_url, request, "tenantUser", False, "tenant:"+_ws['TaxId'])
                        if _teanntuserdata:
                            i = 0
                            for _u in _teanntuserdata['items']:
                                _teanntuserdata['items'][i]['Type'] = levels._type_info(_u['Type'])[1]
                                i += 1
                            _items = _teanntuserdata['items']
                        else:
                            _items = False
                        context = {
                            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                            "user_id": _user_id,
                            "user_name": _user['username'],
                            "user_type": _user['type'],
                            "user_fname": _user['fname'],
                            "user_pin": _user['pin'],
                            "wsdata": _ws,
                            "users_list": _items ,
                            "levels": levels._type_all(), 
                            "_flag_status": "",
                            "_flag_content": "",
                            "currentDate": "January 20, 2023",
                            "currentTime": "20:24:03 CST (CENTRAL MEXICO)",
                            "host_url": request.host_url
                        }
                        return render_template('workspace_users_manage.html', **context)
                    else:
                        _ws = make_response(redirect('/workspace'))
                        return _ws
                else:
                    _ws = make_response(redirect('/workspace'))
                    return _ws
            else:
                _ws = make_response(redirect('/workspace'))
                return _ws
        else:
            _ws = make_response(redirect('/workspace'))
            return _ws
        
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Tenant Users empty
@app.route('/workspace/<_id>/users/')
def tusers_empty(_id):
    if _id: 
        _ws = make_response(redirect('/workspace/_id'))
        return _ws
    else: 
        _ws = make_response(redirect('/workspace'))
        return _ws

## new tenant user
@app.route('/workspace/<_id>/users/new')
def tusers_new(_id = False):
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
            if _user_id and _id:
                _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                _user = _userdata['items'][0]
                _filter = ":"+_user_id
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                if _wsdata['containsData']:
                    _ws = _wsdata['items'][0]
                    _filter = "tenant:"+_id+";type:1"
                    _managers = Handlers.get_data(_alx_url, request, "tenantUser", False, _filter)
                    if _managers['containsData']:
                        _managers = _managers['items']
                    else:
                        _managers = False
                    context = {
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "user_id": _user_id,
                        "user_name": _user['username'],
                        "user_type": _user['type'],
                        "user_fname": _user['fname'],
                        "user_pin": _user['pin'],
                        "tmanagers_list": _managers,
                        "wsdata": _ws,
                        "_flag_status": "",
                        "_flag_content": "",
                        "currentDate": "January 20, 2023",
                        "currentTime": "20:24:03 CST (CENTRAL MEXICO)",
                        "host_url": request.host_url
                    }
                    return render_template('workspace_users_create.html', **context)
            else:
                return make_response(redirect('/workspace'))
        else:
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Tenant Users Management
@app.route('/workspace/<_id>/users/<_tusername>')
def tusers_management(_id = False, _tusername = False):
    try: 
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        _redirect = make_response(redirect('/workspace'))
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            if _user_id:
                _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                _user = _userdata['items'][0]
                if _id and _tusername:
                    _filter = ":"+_user_id
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                    if _wsdata['containsData']:
                        _ws = _wsdata['items'][0]
                        _filter = "tenant:"+_id
                        _tudata = Handlers.get_data(_alx_url, request, "tenantUser", _id+"."+_tusername, _filter)
                        if _tudata['containsData']:
                            ## save tenant user data
                            _tuserdata = _tudata['items'][0]
                            _filter = "tenant:"+_id+";type:1"
                            _managers = Handlers.get_data(_alx_url, request, "tenantUser", False, _filter)
                            if _managers['containsData']:
                                _managers = _managers['items']
                                _out_mgrs = []
                                for _x in _managers:
                                    if _x['Id'] != _tuserdata['Id']:
                                        _out_mgrs.append(_x)
                            else:
                                _out_mgrs = False
                            context = {
                                "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                                "user_id": _user_id,
                                "user_name": _user['username'],
                                "user_type": _user['type'],
                                "user_fname": _user['fname'],
                                "user_pin": _user['pin'],
                                "wsdata": _ws,
                                "tmanagers_list": _out_mgrs,
                                "users_list": _tuserdata ,
                                "levels": levels._type_all(), 
                                "_flag_status": "",
                                "_flag_content": "",
                                "currentDate": "January 20, 2023",
                                "currentTime": "20:24:03 CST (CENTRAL MEXICO)",
                                "host_url": request.host_url
                            }
                            """context = {
                                "email": _user_id,
                                "fname": _user_data["fname"],
                                "username": _user_data["username"],
                                "phone": _user_data["phone"],
                                "bday": _user_data["bday"], 
                                "postalCode": _user_data["postalCode"],
                                "pin": _user_data["pin"],
                                "host_url": request.host_url
                            }"""
                            return render_template('workspace_users_update.html', **context)
                        else:
                            return _redirect
                    else:
                        return _redirect
                else:
                    return _redirect
            else:
                return _out
        else:
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Tenant users working time view 
@app.route('/workspace/<_id>/workingTime')
def working_time(_id = False):
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
            ## get the username from the handlers object.
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            ## validate if parameters are present
            if _user_id and _id:
                ## get the user data from the handlers.
                _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                ## set the user from the items object [0]
                _user = _userdata['items'][0]
                ## set the filter variable
                _filter = ":"+_user_id
                ## set the wsdata object from the handlers object
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                ## if wsdata contains data is true
                if _wsdata['containsData'] == True:
                    ## set the ws from the items wsdata object
                    _ws = _wsdata["items"][0]
                    ### ge the datetime utility
                    _onlyDate8 = Helpers.generateDateTime(8)[1]
                    _onlyTime = Helpers.generateDateTime()[0]
                    _onlyDate = Helpers.generateDateTime()[1]
                    ## get the usrs object from the utility 
                    _usrs = custom_get_all_employees_worktime(_id, False, request, _onlyDate8, False)
                    ## set context object
                    context = {
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "user_id": _user_id,
                        "user_name": _user['username'],
                        "user_type": _user['type'],
                        "user_fname": _user['fname'],
                        "user_pin": _user['pin'],
                        "_flag_status": "",
                        "_flag_content": "",
                        "currentDate": _onlyDate,
                        "currentTime": _onlyTime,
                        "host_url": request.host_url,
                        "wsdata": _ws,
                        "usrs": _usrs##,
                        ##"levels": levels._type_all()
                    }
                    ## return the index 
                    return render_template('workspace_working_time.html', **context)
                else: 
                    ## redirect to /workspace
                    _ws = make_response(redirect('/workspace'))
                    return _ws
            else: 
                return _out
        else:
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}    

## Tenant users working time view 
@app.route('/workspace/<_id>/workingTime/<_tuser_id>')
def working_time_user_detail(_id = False, _tuser_id = False):
    try: 
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        _worlist = make_response(redirect('/workspace/'+_id+'/workingTime'))
        ## validate if _logged
        if _required_cookies:
            if _id and _tuser_id:
                ## if present, save the _id and _un
                _session_id = request.cookies.get('SessionId')
                _client_bw = request.cookies.get('browserVersion')
                _client_ip = request.cookies.get('clientIP')
                ## get the username from the handlers object.
                _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
                ## validate if parameters are present
                if _user_id and _id:
                    ## get the user data from the handlers.
                    _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                    ## set the user from the items object [0]
                    _user = _userdata['items'][0]
                    ## set the filter variable
                    _filter = ":"+_user_id
                    ## set the wsdata object from the handlers object
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                    ## if wsdata contains data is true
                    if _wsdata['containsData'] == True:
                        ## set the ws from the items wsdata object
                        _ws = _wsdata["items"][0]
                        ### ge the datetime utility
                        ## set the time and date variables.
                        _weekAgo = Helpers.generateDateTime(8)[1]
                        ## get the usrs object from the utility 
                        _times = custom_get_all_employees_worktime(_id, _id+"."+_tuser_id, request, _weekAgo, False)
                        if _times['containsData']:
                            context = {
                                "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                                "userdata": _user,
                                "wsdata": _ws,
                                "tlogdata": _times['items'],
                                "host_url": request.host_url
                            }
                            return render_template('workspace_working_time_detail.html', **context)
                        else: 
                            return _worlist
                    else:
                        return _worlist
                else: 
                    return _worlist
            else: 
                return _out
        else:
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

## Tenant users working time details
@app.route('/workspace/<_id>/workingTime/<_tuser_id>/<_tlog_id>')
def working_time_user_log_detail(_id = False, _tuser_id = False, _tlog_id = False):
    try:    
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        _out = make_response(redirect('/logout'))
        _worlist = make_response(redirect('/workspace/'+_id+'/workingTime/'+_tuser_id))
        ## validate if _logged
        if _required_cookies:
            ## if present we go and validate if the required parameters were sent.
            if _id and _tuser_id and _tlog_id:
                ## if present we search for the required view values.
                ## if present, save the _id and _un
                _session_id = request.cookies.get('SessionId')
                _client_bw = request.cookies.get('browserVersion')
                _client_ip = request.cookies.get('clientIP')
                ## get the username from the handlers object.
                _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
                ## validate if parameters are present
                if _user_id:    
                    ## get the user data from the handlers.
                    _userdata = Handlers.get_data(_alx_url, request, "user", _user_id)
                    ## set the user from the items object [0]
                    _userdata = _userdata['items'][0]
                    ## set the filter variable
                    _filter = ":"+_user_id
                    ## set the wsdata object from the handlers object
                    _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, "owner"+_filter)
                    ## if wsdata contains data is true
                    if _wsdata['containsData'] == True:
                        ## save only items data
                        _wsdata = _wsdata['items'][0]
                        ## get tuser data
                        _tuserdata = Handlers.get_data(_alx_url, request, "tenantUser", _id+'.'+_tuser_id)
                        ## validate if data found
                        if _tuserdata['containsData']: 
                            ## save only the tuser items data
                            _tuserdata = _tuserdata['items'][0]
                            ## search for the tlog data
                            _tlogdata = Handlers.get_data(_alx_url, request, "timeLog", _tlog_id)
                            if _tlogdata['containsData']:
                                ## save the tlog data
                                _tlogdata = _tlogdata['items'][0]
                                ## build the context object
                                context = {
                                    "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                                    "userdata": _tuserdata,
                                    "wsdata": _wsdata,
                                    "tuserdata": _tuserdata,
                                    "tlogdata": _tlogdata,
                                    "host_url": request.host_url
                                }
                                return render_template('workspace_working_time_detail_log.html', **context)
                                ##return '<h1> <a href="/workspace/'+_id+'/workingTime/'+_tuser_id+'"> Back </a> Welcome to the Log details of '+_tlog_id+' tlog id from the user '+_tuser_id+'</h1>'
                            else:
                                return _worlist
                        else: 
                            return _worlist
                    else: 
                        return _worlist
                else: 
                    return _worlist
            else: 
                return _worlist
        else:
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

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
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "user_id": _user_id,
                        "user_name": _user['username'],
                        "user_type": _user['type'],
                        "user_fname": _user['fname'],
                        "user_pin": _user['pin'] if _user['pin'] > 0 else False,
                        "ws_list": _ws if _ws else False,
                        "_flag_status": "",
                        "_flag_content": "",
                        "host_url": request.host_url
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

## workspace checkin
@app.route('/workspace/<_id>/checkin')
def workspace_checkin(_id):
    try:
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        ## validate the presence of a token
        _required_token = True if request.cookies.get('token') else False
        ## validate the presence of a expired cookie
        _expired = True if request.cookies.get('expired') else False
        ## set an out response
        _out = make_response(redirect('/workspace/'+_id))
        ## validate if _logged
        if _required_cookies:
            ## redirect to /workspace
            return _out
        else: 
            ## validate if _id && not required_token or expired cookie
            if _id and (_required_token == False or _expired):
                ## get wsdata
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, False, True, app.config['PRIVATE_SERVICE_TOKEN'])
                ## set a context in loop
                context ={
                    "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                    "ws_data": _wsdata['items'][0],
                    "host_url": request.host_url
                }
                ## set the response to workspace_checkin.html
                _out = make_response(render_template('workspace_checkin.html', **context))
                ## delete present cookies
                _out.delete_cookie('token')
                _out.delete_cookie('cookies_policy')
                _out.delete_cookie('clientIP')
                _out.delete_cookie('browserVersion')
                return _out
            elif _id and request.cookies.get('token') and not _expired :
                ## return a redirect to /workspace/id/home
                return(redirect('/workspace/'+_id+'/home'))
            else: 
                ## redirect to home
                _out = make_response(redirect('/'))
                ## delete all present cookies
                _out.delete_cookie('token')
                _out.delete_cookie('cookies_policy')
                _out.delete_cookie('clientIP')
                _out.delete_cookie('browserVersion')
                return _out
    except Exception as e:
        print("(!) Exception in workspace_checkin("+_id+"): "+str(e))
        return {"status": "An error Occurred", "error": str(e)}


## workspace checkin home
@app.route('/workspace/<_id>/home')
def workspace_home(_id):
    try:
        ## validate presence of the token
        _required_token = True if request.cookies.get('token') else False
        ## generate redirect to /workspace/id/checkin
        _out = make_response(redirect('/workspace/'+_id+'/checkin'))   
        ## delete the present cookies 
        _out.delete_cookie('token')
        _out.delete_cookie('cookies_policy')
        _out.delete_cookie('clientIP')
        _out.delete_cookie('browserVersion')
        ## set a expired cookie
        _out.set_cookie('expired', 'true', max_age=36000) 
        ## validate presence of token
        if _required_token:
            ## validate id presence.
            if _id:
                ## get wsdata from the id
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", _id, False, True, app.config['PRIVATE_SERVICE_TOKEN'])
                ## get timelog data from token present
                _tldata = Handlers.get_data(_alx_url, request, "timeLog", request.cookies.get('token'), False, True, app.config['PRIVATE_SERVICE_TOKEN'] )
                ## validate containsdata and timelog has an endTime value equals to False.
                if _tldata['containsData'] and _tldata['items'][0]['EndTime'] == False:
                    ## set current time and date
                    _onlyTime = Helpers.generateDateTime()[0]
                    _onlyDate = Helpers.generateDateTime()[1]
                    ## set context object
                    context = {
                        "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                        "user_id": "null",
                        "ws_data": _wsdata['items'][0],
                        "host_url": request.host_url,
                        "currentDate": _onlyDate,
                        "currentTime": _onlyTime,
                        "startDate": _tldata['items'][0]['StartTime'],
                        "tldata": _tldata['items'][0]
                    }
                    ## return workspace_tu_home.html template
                    return render_template('workspace_tu_home.html', **context)
                else: 
                    return _out
            else: 
                return _out
        else: 
            return _out
    except Exception as e:
        print("(!) Exception in workspace_home("+_id+"): "+str(e))
        return {"status": "An error Occurred", "error": str(e)}


## get worktime periods data
@app.route('/v1/periodsData', methods=['GET'])
def periodsData():
    try: 
        ## Set a logged variable requesting the _id and _us cookies.
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        ## validate if _logged
        if _required_cookies:
            ## if present, save the _id and _un
            _session_id = request.cookies.get('SessionId')
            _client_bw = request.cookies.get('browserVersion')
            _client_ip = request.cookies.get('clientIP')
            _user_id = Handlers.get_username(_alx_url, _session_id, _client_bw, _client_ip)
            if _user_id:
                if 'workspace' in request.args and 'type' in request.args: 
                    if request.args.get('type') == "0": 
                        _onlyDate = Helpers.generateDateTime(1)[1]
                    elif request.args.get('type') == "1": 
                        _onlyDate = Helpers.generateDateTime(8)[1]
                    elif request.args.get('type') == "2": 
                        _onlyDate = Helpers.generateDateTime(30)[1]
                    elif request.args.get('type') == "3":
                        _onlyDate = Helpers.generateDateTime(180)[1]
                    else: 
                        _onlyDate = Helpers.generateDateTime(365)[1]
                    tuser = False
                    if 'tuser' in request.args:
                        tuser = request.args.get('tuser')
                    _return_data = custom_get_all_employees_worktime(request.args.get('workspace'), tuser, request, _onlyDate, False)
                    _items = _return_data['items'][0]
                    _times = _items['times']
                    if 'format' in request.args:
                        if request.args.get('format') == 'csv':
                            data = [
                                ['Log_Id', 'Start_Date', 'Start_Time', 'End_Date', 'End_Time', 'Hours', 'Minutes']
                            ] 
                            for x in _times:
                                data.append([x['logid'], x['startDate'], x['startTime'], x['endDate'], x['endTime'], x['hours'], x['minutes']])
                            si = StringIO()
                            cw = csv.writer(si)
                            for row in data:
                                cw.writerow(row)
                            output = make_response(si.getvalue())
                            output.headers["Content-Disposition"] = "attachment; filename=my_file.csv"
                            output.headers["Content-type"] = "text/csv"
                            return output
                        else:
                            return jsonify(_return_data), 200
                    else:       
                        return jsonify(_return_data), 200
                else: 
                    return jsonify({"status": "error"}), 403
            else:
                return jsonify({"status": "error"}), 401
        else:
            return jsonify({"status": "error"}), 401
            
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}  

################################################################################################################

## checkin service
@app.route('/v1/checkinValidation', methods=['GET'])
def validation():
    try:
        if logging: print(" >>> Entro a CheckinValidation [GET]")
        ## validate presence of id, action, code and wsid
        if 'id' in request.args and 'action' in request.args and 'code' in request.args and 'wsid' in request.args:
            ## if presence search for the corresponding ws
            _wsdata = Handlers.get_data(_alx_url, request, "workspace", request.args.get('wsid'), False, True, app.config['PRIVATE_SERVICE_TOKEN'])
            ## if ws search contains data.
            if _wsdata['containsData']:
                ## save only the items data
                _ws = _wsdata['items'][0]
                ## get the tldata from the id argument parameter.
                _tldata = Handlers.get_data(_alx_url, request, "timeLog", request.args.get('id'), False, True, app.config['PRIVATE_SERVICE_TOKEN'] )
                ## if the timelog contains data
                if _tldata['containsData']: 
                    ## save the items object from the timelog
                    _tldata = _tldata['items'][0]
                    ## set the date time  
                    _onlyTime = Helpers.generateDateTime()[0]
                    _onlyDate = Helpers.generateDateTime()[1]
                    ## validate action and the code in the request args parameters
                    if request.args.get('action') == "1" and request.args.get('code'):
                        ## validate the param code is the same as the wscode generated
                        if request.args.get('code') == Helpers.codeGenerator(_ws['CodeHash']):
                            ## generate an item object, set the startdate, startime, id
                            _item = {}
                            _item["StartTime"]= _onlyTime
                            _item["StartDate"]= _onlyDate
                            _item["Id"] = request.args.get('id')
                            ## set the update of the timelog
                            _response = Handlers.put_data(_alx_url, request, "timeLog", _item)
                            ## if success
                            if _response['code'] == 202:
                                ## return a success to the client. return the token id 
                                return jsonify({"validated": True, "StartTime": _onlyTime, "EndTime": False, "token": request.args.get('id')}), 200
                            else: 
                                ## return a error message to the client. return the reason of the error. 
                                return jsonify({"validated": False, "errorDesc": _response['reason']}), 403
                        else:
                            ## return an error indicating the invalid code. 
                            return jsonify({"validated": False, "errorDesc": "Invalid code. Try again."}), 401
                    ## case when action is 2 (close timelog)
                    elif request.args.get('action') == "2":
                        ## generate the item object, set the endTime, endDate, Id
                        _item = {}
                        _item["EndTime"]= _onlyTime
                        _item["EndDate"]= _onlyDate
                        _item["Id"] = request.args.get('id')
                        ## update endtime and date in the timelog
                        _response = Handlers.put_data(_alx_url, request, "timeLog", _item)
                        ## success
                        if _response['code'] == 202:
                            ## return a success message and the info of the timelog
                            return jsonify({"validated": True, "StartTime": _tldata['StartTime'], "EndTime": _onlyTime, "token": request.args.get('id')}), 200
                        else: 
                            ## return a error description
                            return jsonify({"validated": False, "errorDesc": _response['reason']}), 403
                    else:
                        ## return a error description of the invalid code.
                        return jsonify({"validated": False, "errorDesc": "Invalid Code"}), 403
                else: 
                    ## return error of false not valid data
                    return jsonify({"validated": False}), 404    
            else: 
                ## return a invalid auth
                return jsonify({"validated": False}), 404
        else: 
            ## return a invalid auth error.
            return jsonify({"validated": False}), 401
    except Exception as e:
        print("(!) Exception in checkinValidation(): "+str(e))
        return jsonify({"status": "An error Occurred", "error": str(e)}), 500

## Code generator receiver
@app.route('/v1/codeGenerator', methods=['GET'])
def codeGenerator():
    try:
        _required_cookies = True if request.cookies.get('SessionId') and request.cookies.get('clientIP') and request.cookies.get('browserVersion') else False
        if _required_cookies: 
            if request.args.get('wsid'): 
                _wsdata = Handlers.get_data(_alx_url, request, "workspace", request.args.get('wsid'), False)
                if 'containsData' in _wsdata:
                    _ws = _wsdata['items'][0]
                    ncode = Helpers.codeGenerator(_ws['CodeHash'])
                    return jsonify({"code": ncode}), 200
                else: 
                    return jsonify({"code": False}), 400
            else: 
                return jsonify({"code": False}), 404
        else:
            return jsonify({"code": False}), 401
    except Exception as e:
        print('(!) Exception ')
        return jsonify({"status": "An error Occurred", "error": str(e)}), 500

################################################################################################################
## Stripe payments flow
## stripe public key
@app.route("/v1/publicKey", methods=['GET'])
def get_publishable_key():
    try: 
        stripe_config = {"publicKey": stripe_keys["publishable_key"]}
        return jsonify(stripe_config), 200 
    except Exception as e:
        return jsonify({"status": "An error Occurred", "error": str(e)}), 500

## Checkuot API
@app.route("/v1/checkout")
def create_checkout_session():
    ## CONF_STRIPE_SUBS_1
    domain_url = request.host_url
    stripe.api_key = stripe_keys["secret_key"]
    try:
        if 'subscription' in request.args:
            # Create new Checkout Session for the order
            checkout_session = stripe.checkout.Session.create(
                ##client_reference_id=current_user.id if current_user.is_authenticated else None,
                success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=domain_url + "cancelled",
                payment_method_types=["card"],
                mode="subscription",
                line_items=[{
                    'price': stripe_prices[int(request.args.get('subscription'))], 
                    'quantity': 1,
                }]
            )
            return jsonify({"sessionId": checkout_session["id"]})
    except Exception as e:
        print("(!) Errorr in /v1/checkout")
        print(e)
        return jsonify(error=str(e)), 403

## Success flow
@app.route("/success")
def success():
    try:
        if 'session_id' in request.args:
            response = Handlers.put_data(_alx_url, request, "user", {"str_sess_id": request.args.get('session_id'), "activate": True})
            if response: 
                return render_template("payments_success.html")
            else: 
                return 'Error, try again later.'
        else: 
            return make_response(redirect('/'))
    except Exception as e:
        print("(!) Errorr in /v1/checkout")
        print(e)
        return jsonify(error=str(e)), 500

## Cancelled flow
@app.route("/cancelled")
def cancelled():
    try:
        return render_template("payments_cancelled.html")
    except Exception as e:
        print("(!) Errorr in /v1/checkout")
        print(e)
        return jsonify(error=str(e)), 500

# app.py
@app.route("/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature")
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, stripe_keys["endpoint_secret"]
        )
    except ValueError as e:
        # Invalid payload
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return "Invalid signature", 400
    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        print("Payment was successful.")
        # TODO: run some custom code here

    return "Success", 200

################################################################################################################

## Transactions service
@app.route('/transactions')
def transactions():
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
                    _user = _userdata['items'][0]
                    if int(_user['type']) > 2: 
                        _trxs = Handlers.get_data(_alx_url, request, "transaction")
                        if _trxs:
                            ## save the items from backend in to the _items variable.
                            ## return items
                            i = 0
                            for _u in _trxs['items']:
                                x = severityLevels._secutiryLevel_info(_trxs['items'][i]['severity'])
                                _trxs['items'][i]['severity'] = severityLevels._secutiryLevel_info(_trxs['items'][i]['severity'])
                                i += 1
                            _items = _trxs['items']
                        else:
                            ## set a dummy trx variable.
                            _items = [{
                                "date": "-",
                                "id": "NO TRX Available",
                                "user": "-"
                            }]
                        ## Set the context variable.
                        context = {
                            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                            "user_id": _user_id,
                            "user_name": _user['username'],
                            "user_type": _user['type'],
                            "user_fname": _user['fname'],
                            "user_pin": _user['pin'] if _user['pin'] > 0 else False,
                            "transactions_list": _items if _items else False,
                            "severityLevels": severityLevels._secutiryLevel_all(),
                            "_flag_status": "",
                            "_flag_content": "",
                            "host_url": request.host_url
                        }
                        ## returns the transactions.html view.
                        return render_template('transactions.html', **context)
                    else: 
                        ## return to dashboard service
                        _dash = make_response(redirect('/dashboard'))
                        return _dash
                else:
                    ## return to login service.
                    return _out
            else:
                ## return to login service.
                return _out
        else:
            ## return to login service.
            return _out
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################

## Users Manager Service
@app.route('/users')
def users():
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
                    _user = _userdata['items'][0]
                    if int(_user['type']) > 2: 
                        ## preparate, the url, headers
                        _users = Handlers.get_data(_alx_url, request, "user")
                        ## Validate the status code as 202
                        if _users:
                            ## return items
                            i = 0
                            for _u in _users['items']:
                                _users['items'][i]['type'] = levels._type_info(_u['type'])[1]
                                _users['items'][i]['plan'] = plans._plan_info(_u['plan'])[0]
                                i += 1
                            _items = _users['items']
                        else:
                            ## define sample json
                            _items = [{
                                "username": "No users found",
                                "email": "Try again later",
                                "type": "0",
                                "plan": "0"
                            }]
                        context = {
                            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
                            "user_id": _user_id,
                            "user_name": _user['username'],
                            "user_type": _user['type'],
                            "user_fname": _user['fname'],
                            "user_pin": _user['pin'] if _user['pin'] > 0 else False,
                            "users_list": _items if _items else False,
                            "levels": levels._type_all(), 
                            "plans": plans._plan_all(),
                            "_flag_status": "",
                            "_flag_content": "",
                            "host_url": request.host_url
                        }
                        ## return users view
                        return render_template('users.html', **context)
                    else: 
                        ## return to dashboard service
                        _dash = make_response(redirect('/dashboard'))
                        return _dash
                else:
                    ## return to login service.
                    return _out
            else:
                ## return to login service.
                return _out
        else:
            ## return to login service.
            return _out
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
            ## validate service
            if request.args.get('service') and request.json['item']:
                print(request.json['item'])
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
        print("(!) Exception at admdata("+str(request.method)+"): "+str(e))
        return jsonify({"status": "An error Occurred", "error": str(e)}), 500

################################################################################################################
##  is_human() Validating recaptcha response from google server
##  Returns True captcha test passed for submitted form else returns False.
def is_human(captcha_response):
    try:
        print(">>> is_human()")
        ## save the recaptcha secret key
        secret = app.config['RECAPTCHA_SECRET_KEY']
        ## set the payload object
        payload = {'response':captcha_response, 'secret':secret}
        ## makes a call to /google recaptcha to return a number, which means the user is real or not
        response = requests.post("https://www.google.com/recaptcha/api/siteverify", payload)
        ## saves the response to json
        response_text = json.loads(response.text)
        ## returns the score
        return response_text['score']
    except Exception as e:
        print("(!) Exception in is_human(): "+str(e))


################################################################################################################

## service for 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/desktop')
def desktop():
    return render_template('desktop.html')


################################################################################################################

## API Status
@app.route('/status')
def status():
    try:
        context = {
            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
            "_logged": False,
            "_sample": "1234",
            "host_url": request.host_url
        }
        _local_ip = request.remote_addr
        local_ip = request.cookies.get('local_ip')
        return "Running fine - IP: "+_local_ip
    except Exception as e:
        return {"status": "Error", "reason": str(e)}
    

##### Service paths
## /legal
@app.route('/legal')
def legal():
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
            "_cookies_policy": True if request.cookies.get('cookies_policy') else False,
            "_logged": _logged,
            "_sample": "1234",
            "host_url": request.host_url
        }
        ## render and return the home page including the context variables.
        return render_template('legal.html', **context)
    
    except Exception as e:
        return {"status": "Error", "reason": str(e)}
    ##return '/legal in construction, go back to <a href="/"> home </a>'
    ##return render_template('legal.html')

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
                "host_url": request.host_url
            }
        return render_template('help.html', **context)
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)}

################################################################################################################
## service for users / hours working 
## utility to retrieve the list of users, gets a workspace 
def custom_get_all_employees_worktime(workspace_id = False, tenantUser = False, request_obj = False, startDate = False, endDate = False):
    try:
        ## invoke the datetime utileries
        from datetime import datetime
        ## validate if required parametesrs are present
        if workspace_id and request_obj:  
            ## set the emp_worktime output object
            emp_worktime = {"items": []}
            ## set the filter for the user search, to get the user from the tenant
            _filter = "tenant:"+workspace_id
            ## set the get_data handler to retrieve data from the user.
            _tusers = Handlers.get_data(_alx_url, request_obj, "tenantUser", tenantUser, _filter)
            if _tusers['containsData']:
                ## set the _tusers from the items object.
                _tusers = _tusers['items']
                ## initialize a counter for the object.
                i = 0
                ## iteratest for each tuser in the "items" object.
                for _tuser in _tusers:
                    ## set up the user object for each user 
                    _user = {"times": []}
                    ## set the 'id' value to the tenant user id including the workspace
                    _user['id'] = workspace_id.upper()+"."+_tuser['Username'].upper()
                    _user['fullname'] = _tuser['FullName'].upper()
                    _user['type'] = levels._type_info(_tuser['Type'])[1]
                    ## set the filter for the logs including the enddate
                    _filter = 'UserId:'+_user['id']##+";EndDate:22.08.2025"+";StartDate:22.08.2014"##
                    if startDate:
                        _filter += ";StartDate:"+startDate
                    if endDate: 
                        _filter += ";EndDate:"+endDate
                    ## get the timelogs from the user and the filter.
                    _timeLogs = Handlers.get_data(_alx_url, request_obj, "timeLog", False, _filter)
                    ## set the timelog from the items segment in the response.
                    _timeLogs = _timeLogs['items']
                    ## set the total hours and minutes.
                    total_hours = 0
                    total_minutes = 0
                    ## tl count
                    j = 0
                    ## iterate for each timelog in the timelogs object.
                    for _tl in _timeLogs:
                        ## define de tlogs object 
                        _tlogs = {}
                        ## validates if contains Endtime
                        if _tl['EndTime']: 
                            _tlogs['startTime'] = _tl['StartTime']
                            _tlogs['startDate'] = _tl['StartDate']
                            _tlogs['endTime'] = _tl['EndTime']
                            _tlogs['endDate'] = _tl['EndDate']
                            ## set the formats
                            date_format = "%d.%m.%Y"
                            time_format = "%H:%M:%S"
                            ## generate the combined two dates
                            combined_start_datetime = datetime.combine(datetime.strptime(_tl['StartDate'], date_format).date(), datetime.strptime(_tl['StartTime'], time_format).time())
                            combined_end_datetime = datetime.combine(datetime.strptime(_tl['EndDate'], date_format).date(), datetime.strptime(_tl['EndTime'], time_format).time())
                            ## get the difference beetween the dates.
                            diff_seconds = (combined_end_datetime - combined_start_datetime).total_seconds()
                            ## get the hours parameter.
                            hours = int(diff_seconds // 3600)
                            ## get the minutes parameter
                            minutes = minutes = int((diff_seconds % 3600) // 60)
                            ## get the total hours parameter
                            total_hours += hours
                            ## get the total_minutes parameter
                            total_minutes += minutes
                            _tlogs['hours'] = hours
                            _tlogs['minutes'] = minutes
                            _tlogs['logid'] = _tl['Id']
                            _user['times'].append(_tlogs)
                            j += 1
                    ## validate if minutes is more than 59: 
                    if total_minutes > 59:
                        ## calculate hours from the minutes remaining
                        add_hours = int(total_minutes / 60)
                        ## substract the minutes added from the total minutes count
                        total_minutes -= add_hours * 60
                        ## add hours to the hours count
                        total_hours += add_hours
                    ## set the parameters in the total_hours and the total_minutes
                    _user['total_hours'] = total_hours
                    _user['total_minutes'] = total_minutes
                    _user['records'] = j
                    ## set the object in the main object _user.
                    emp_worktime['items'].append(_user)
                    ##emp_worktime[i+1] = _user
                    ##print(_user)
                    i += 1
                emp_worktime['containsData'] = True
                emp_worktime['count'] = i
                return emp_worktime
            else:
                return {"containsData": False, "items": [], "count": 0}
        else: 
            return {"containsData": False, "items": [], "count": 0}
    
    except Exception as e:
        return {"status": "An error Occurred", "error": str(e)} 
    