import requests, base64

########################################
### Class Helpers ######################
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
    def generateURL(_base_url, _service, _id = False, _filter = False):
        try:
            print(" >> generateURL() helper.")
            _url = _base_url+"/"+_service
            if _id:
                _url = '?id='+_id+'&filter='+_filter if _filter else '?id='+_id 
            else:
                _url = '?filter='+_filter if _filter else _url
            return _url
        except Exception as e:
            print(" (!) Exception in generateURL(): ")
            print(str(e))
            return False