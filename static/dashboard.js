/* 
    JS functions for the dashboard.html file.
*/
// System vars


// Triggers 
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_profile_en')) document.getElementById('_profile_en').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_profile_es')) document.getElementById('_profile_es').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_ws_view_en')) document.getElementById('_ws_view_en').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_ws_view_es')) document.getElementById('_ws_view_es').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_apidocs_en')) document.getElementById('_apidocs_en').addEventListener('click', function (){ window.location.replace('/apidocs') });
if(document.getElementById('_apidocs_es')) document.getElementById('_apidocs_es').addEventListener('click', function (){ window.location.replace('/apidocs') });

// Boxes triggers
if(document.getElementById('_redirect_last_ws')) document.getElementById('_redirect_last_ws').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_redirect_wss')) document.getElementById('_redirect_wss').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_redirect_help')) document.getElementById('_redirect_help').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_redirect_tutorials')) document.getElementById('_redirect_tutorials').addEventListener('click', function (){  window.alert("No tutorials found, Try later again.")  });

if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){  if(_pinpad_num.length === 6){ _send_pin() }else{window.alert("Pin has to be at least 6 digits long.")} });
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ window.location.replace("/logout"); });

if(document.getElementById('_trx_mgr_en')) document.getElementById('_trx_mgr_en').addEventListener('click', function (){ window.location.replace("/transactions"); });
if(document.getElementById('_trx_mgr_es')) document.getElementById('_trx_mgr_es').addEventListener('click', function (){ window.location.replace("/transactions"); });
if(document.getElementById('_usr_mgr_en')) document.getElementById('_usr_mgr_en').addEventListener('click', function (){ window.location.replace("/users"); });
if(document.getElementById('_usr_mgr_es')) document.getElementById('_usr_mgr_es').addEventListener('click', function (){ window.location.replace("/users"); });

// send pin function
function _send_pin(){
    if(_pinpad_num.length === 6){
        _display_wheel(true);
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=user";
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        let _obj = {"item":{"pin": parseInt(_pinpad_num), "email": _context_vars[0]}};
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    document.getElementsByClassName("_main_block_numpad")[0].classList.add("_hidden");
                    document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
                    setAlert("_box_green", "Pin Set Successfully");
                    _display_wheel(false);
                }else if(xhr.readyState === 4 && (xhr.status === 500 || xhr.status === 403)){
                    setAlert("_box_red", "Error setting pin. Error code: ERR-V003-025-01");
                    _display_wheel(false);
                }
            }
            catch(e)
            {
                if(_logging){
                    console.log("-------------------")
                    console.log(e)
                    console.log("-------------------")
                }
                errors++;
                setAlert("_box_red", "Error setting pin. Error code: ERR-V003-025-02");
                _display_wheel(false);
            }
        };
        xhr.send(JSON.stringify(_obj));
    }
}