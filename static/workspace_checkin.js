
//// initialization
_display_fbuttons(true);
_common_system_auto_change_color();

//// triggers
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ _change_obj_color(document.getElementById('_fb_1'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx", "color_2_border"); login_worker(); });

// system triggers


//// login worker
function login_worker(){
    cleanAlert();
    let username = _context_vars[5]+"."+document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let counter = 0
    if(username.length > 0 && password.length > 0){
        _display_wheel(true);
        let _req_string = window.btoa(unescape(encodeURIComponent(username+"_"+password)));
        getIp(); 
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=timeLog";
        let _obj = {
            "item": {
                "requestString": _req_string,
                "ip": _client_ip,
                "browser": _client_version
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            try
            {
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (xhr.readyState === 4) {
                    if(xhr.status === 202 && _parsed_data.token){
                        setAlert("_box_blue", "Logged"); 
                        document.cookie = "token="+_parsed_data.token;
                        document.cookie = "browserVersion="+_client_version;
                        document.cookie = "clientIP="+_client_ip;
                        _redirect("/workspace/"+_context_vars[5]+"/home", true)
                    }else if(xhr.status === 500 || xhr.status === 403){
                        _display_wheel(false);
                        setAlert("_box_red", "System error, try again later.");  
                        _change_obj_color(document.getElementById('_fb_1'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); 
                    }else if(xhr.status === 202 && _parsed_data.code){
                        _display_wheel(false);
                        setAlert("_box_red", _parsed_data.reason);  
                        _change_obj_color(document.getElementById('_fb_1'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); 
                    }
                }
            }
            catch(e)
            {
                if(counter === 1){
                    if(_logging){
                        console.log("-------------------")
                        console.log(e)
                        console.log("-------------------")
                    }
                    _errors++;
                    _change_obj_color(document.getElementById('_login_buttom'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); 
                    setAlert("_box_red", "Error login user.");
                    _display_wheel(false);
                }else{
                    counter++;
                }
            }
        };
        xhr.send(JSON.stringify(_obj));
    }else{
        setAlert("_box_yellow", "Missing username or password.");   
        _change_obj_color(document.getElementById('_login_buttom'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); 
    }
}