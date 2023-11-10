from config import Config
import os, requests, base64

########################################
### Helpers ############################
########################################
class Helpers:
    
    ## Base64 encode
    def b64Encode(_string):
        try:
            print(" >> b64Encode() helper.")
            _out = base64.b64encode(_string.encode('utf-8'))
            _r_out = str(_out, "utf-8")
            return _r_out
        except Exception as e:
            return {"status": "An error Occurred", "error": str(e)}

    ## Auth
    def auth(_id, _un, _alx_url):
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