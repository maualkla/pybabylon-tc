from config import Config
import os, requests, base64
from utilities.helpers import Helpers

class Handlers():

    def get_data(_service_url, _request, _service, _id = False, _filter = False):
        print(" >> handlers.get_data() operation: ")
        _sessionId = _request.cookies.get('SessionId') if _request.cookies.get('SessionId') else False
        _browser = _request.cookies.get('browserVersion') if _request.cookies.get('browserVersion') else False
        _clientIp = _request.cookies.get('clientIP') if _request.cookies.get('clientIP') else False
        if _sessionId and _browser and _clientIp:
            _token = Handlers.__get_session_token(_service_url, _sessionId, _browser, _clientIp)
            if _token:
                _url = Helpers.generateURL(_service_url, _service, _id, _filter)
                _headers = {'SessionId': _sessionId, 'TokenId': _token}
                _response = requests.get(_url, headers=_headers)
                return _response.json()
            else:
                return {}
        else:
            return {}
    
    def __get_session_token(_service_url, _session_id, _browser, _clientIp):
        print(" >> handlers.__get_session_token() operation: ")
        url = Helpers.generateURL(_service_url, "session")
        ## Create the headers for the request
        headers = {'SessionId': _session_id, 'browserVersion': _browser, 'clientIP': _clientIp}
        ## Generates the call to the sevice. It is a GET call.
        _response = requests.get(url, headers=headers)
        ## Saves the response in _json_r
        _session = _response.json()
        ## Saves the status code in _status
        _status = _response.status_code
        ## Validate if the response status code is 200
        if _status == 200:
            _session = _session['items'][0]
            _token = _session['tokenId']
        else:
            _token = False
        return _token