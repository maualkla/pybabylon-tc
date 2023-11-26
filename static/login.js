/* 
    JS functions for the home.html file.

*/
/* triggers for the buttons */

if(document.getElementById('_signup_en')) document.getElementById('_signup_en').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_signup_es')) document.getElementById('_signup_es').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_login_buttom')) document.getElementById('_login_buttom').addEventListener('click', function (){ _change_obj_color(document.getElementById('_login_buttom'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx", "color_2_border"); login_worker(); });


// Login function
function login_worker(){
    cleanAlert();
    let username = document.getElementById('i_email').value;
    let password = document.getElementById('i_word').value;
    if(username.length > 0 && password.length > 0){
        _display_wheel(true);
        let _req_string = window.btoa(unescape(encodeURIComponent(username)))+'_'+window.btoa(unescape(encodeURIComponent(password)));
        getIp(); 
        // call /v1/admdata POST /session

        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata";
        let _obj = {
            "item": {
                "requestString": _req_string,
                "client": {
                    "ip": _client_ip,
                    "browser": _client_version
                }
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4) {
                    if(xhr.status === 200){
                        _display_wheel(false);

                    }else if(xhr.status === 500 || xhr.status === 403){
                        _display_wheel(false);
                        // display alert error
                        setAlert("_box_red", "Error login user.");  
                    }
                }
            }
            catch(e)
            {
                errors++;
                setAlert("_box_red", "Error login user.");
            }
        };
        xhr.send(JSON.stringify(payload));
    }else{
        setAlert("_box_yellow", "Missing username or password.");    
    }
}
