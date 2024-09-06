from flask_mail import Mail
import requests, base64, re
import mailtrap as mt

########################################
### Class Helpers ######################
########################################
class Helpers:

    ## common email sent 
    def emailSender(email_list_to = False, template_id = False, api_token = False, template_variables = False ):
        try:
            if email_list_to and template_id and api_token and template_variables:
                print(" >> emailSender() helper.")
                mail = mt.MailFromTemplate(
                    sender=mt.Address(email="no-reply@adminde.com", name="Adminde Support"),
                    to=[mt.Address(email=email_list_to)],
                    template_uuid=template_id,
                    template_variables=template_variables
                )
                client = mt.MailtrapClient(token=api_token)
                response = client.send(mail)
                return True
            else: 
                return False
        except Exception as e:
            print("(!) Exception in emailSender(): ")
            print(str(e))
            return False


    ## Base64 encode
    def b64Encode(_string):
        try:
            print(" >> b64Encode() helper.")
            _out = base64.b64encode(_string.encode('utf-8'))
            _r_out = str(_out, "utf-8")
            return _r_out
        except Exception as e:
            print(" (!) Exception in b64Encode(): ")
            print(str(e))
            return False

    ## Auth
    def auth(_id, _un, _alx_url):
        try:
            print(" >> auth() helper.")
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
            print(" (!) Exception in auth(): ")
            print(str(e))
            return False
        
    ## generate URL 
    ## function receives the parts of a urrl with parameters and makes it work together.
    ## base_url:    (required) base url string
    ## _service:    (required) service string
    ## _id:         (optional) parameter to be added to the url
    ## _filter:     (optional) parameter to be added to the url
    def generateURL(_base_url, _service, _id = False, _filter = False):
        try:
            print(" >> generateURL("+_base_url+"/ "+_service+") helper.")
            ## sets base url w/o parameters
            _url = _base_url+"/"+_service
            if _id:
                ## if id param present, validate if filter param is also present. If yes sets both else sets only id.
                _url += '?id='+_id+'&filter='+_filter if _filter else '?id='+_id 
            else:
                ## if id param no present, validates if filter present, if not, returns empty.
                _url += '?filter='+_filter if _filter else ""
            return _url
        except Exception as e:
            print(" (!) Exception in generateURL(): ")
            print(str(e))
            return False
        
    ## Validates a password based on the following criteria:
    ## - At least 12 characters long
    ## - Contains at least one uppercase letter
    ## - Contains at least one lowercase letter
    ## - Contains at least one number
    ## - Contains at least one special character
    ##
    ## Args:
    ##    password: The password to validate.
    ##
    ## Returns:
    ##    True if the password is valid, False otherwise.
    def validatePasswordFormat(_pass):
        try:
            print(" >> validatePassword() helper.")
            pattern = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$"
            return Helpers.validatePattern(_pass, pattern)
        
        except Exception as e:
            print(" (!) Exception in validatePassword(): ")
            print(str(e))
            return False
        
    ## Validate email format email1909_@company.domain
    def validateEmailFormat(_string):
        try:
            print(" >> validateEmailFormat() helper.")
            pattern = r"^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)*$"
            return Helpers.validatePattern(_string, pattern)
        
        except Exception as e:
            print(" (!) Exception in validateEmailFormat(): ")
            print(str(e))
            return False

    ## Validate date format. dd.mm.yyyy
    def validateDateFormat(_string):
        try:
            print(" >> validateDateFormat() helper.")
            pattern = r"^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$"
            return Helpers.validatePattern(_string, pattern)
        
        except Exception as e:
            print(" (!) Exception in validateDateFormat(): ")
            print(str(e))
            return False

    ## Validate phone number format 10 digits
    def validatePhoneFormat(_string):
        try:
            print(" >> validatePhoneFormat() helper.")
            pattern = r"^\d{10}$"
            return Helpers.validatePattern(_string, pattern)
        
        except Exception as e:
            print(" (!) Exception in validatePhoneFormat(): ")
            print(str(e))
            return False
    
    ## Validate postal code format. depends on country
    def validatePostalCodeFormat(_string, _countryCode):
        try:
            print(" >> validatePhoneFormat() helper.")
            if _countryCode == "MX": 
                pattern = r"^\d{5}$"
            elif _countryCode == "US": 
                pattern = r"^\d{5}(-\d{4})?$"
            elif _countryCode == "DE":
                pattern = r"^\d{5}$"
            else: 
                pattern = r"^\d{5}$"
            return Helpers.validatePattern(_string, pattern)
        
        except Exception as e:
            print(" (!) Exception in validatePhoneFormat(): ")
            print(str(e))
            return False

    ## Validate pattern 
    ## Generic function 
    ## args: 
    ## _string: A string to be validated
    ## _pattern: A patter to compare. it includes a regex.
    def validatePattern(_string, _pattern):
        try: 
            print(" >> validatePattern() helper.")
            match = re.match(_string, _pattern)
            return bool(match)
        
        except Exception as e:
            print(" (!) Exception in validatePattern(): ")
            print(str(e))
            return False


    ## Return Date or Time in a formated way.
    ## Generic function
    ## Args: 
    ## none
    def generateDateTime(minus_time = False):
        from datetime import datetime, timedelta
        _now = datetime.now()
        if minus_time: 
            _now = _now - timedelta(days=minus_time)
        dt = [0,0]
        dt[0] = _now.strftime("%H:%M:%S")
        dt[1] = _now.strftime("%d.%m.%Y")
        return dt