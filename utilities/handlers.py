
import os, requests, base64
from utilities.helpers import Helpers

class Handlers():

    ## get_data operation
    ## generic function to make calls to backend.
    ## gets authorized and then calls to the specificated service.
    ## _service_url:    (required) service url ip+port
    ## _request:        (required) request object to get the headers and cookies.
    ## _service:        (requred) Service to be called /service
    ## _id:             (optional) id to search
    ## _filter:         (optional) query filter for the search.
    def get_data(_service_url, _request, _service, _id = False, _filter = False):
        try:
            print(" >> handlers.get_data() operation: ")
            ## validate if present and if present, set the parameters from the cookies of the request object.
            _sessionId = _request.cookies.get('SessionId') if _request.cookies.get('SessionId') else False
            _browser = _request.cookies.get('browserVersion') if _request.cookies.get('browserVersion') else False
            _clientIp = _request.cookies.get('clientIP') if _request.cookies.get('clientIP') else False
            ## if required cookies continue.
            if _sessionId and _browser and _clientIp:
                ## call to get_session_token to retrieve the token.
                _token = Handlers.__get_session_token(_service_url, _sessionId, _browser, _clientIp)
                ## if token, generates a call to the service. else return null
                if _token:
                    ## set the url of the service
                    _url = Helpers.generateURL(_service_url, _service, _id, _filter)
                    ## set the headers
                    _headers = {'SessionId': _sessionId, 'TokenId': _token}
                    ## generate the get call
                    _response = requests.get(_url, headers=_headers)
                    ## returns the json as response
                    return _response.json()
                else:
                    return {}
            else:
                return {}
        except Exception as e:
            print(" (!) Exception in get_data(): ")
            print(str(e))
            return False
    
    ## get_data operation
    ## generic function to make calls to backend.
    ## gets authorized and then calls to the specificated service.
    ## _service_url:    (required) service url ip+port
    ## _sessionid:      (required) Sessionid to be sent as header
    ## _browser:        (requred) browser version
    ## _clientIp:       (optional)ip from client.
    def __get_session_token(_service_url, _session_id, _browser, _clientIp):
        try:
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
                ## gets the specific token
                _session = _session['items'][0]
                _token = _session['tokenId']
            else:
                _token = False
            ## returns _token
            return _token
        except Exception as e:
            print(" (!) Exception in __get_session_token(): ")
            print(str(e))
            return False