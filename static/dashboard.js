/* 
    JS functions for the dashboard.html file.
*/
// System vars
let _pinpad_num = "";


// Triggers 
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_manage_ws_en')) document.getElementById('_manage_ws_en').addEventListener('click', function (){window.alert("No workspaces found")});
if(document.getElementById('_manage_ws_es')) document.getElementById('_manage_ws_es').addEventListener('click', function (){ window.alert("No hay Workspaces en tu perfil") });
if(document.getElementById('_profile_en')) document.getElementById('_profile_en').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_profile_es')) document.getElementById('_profile_es').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_create_ws_en')) document.getElementById('_create_ws_en').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_create_ws_es')) document.getElementById('_create_ws_es').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_help_en')) document.getElementById('_help_en').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_help_es')) document.getElementById('_help_es').addEventListener('click', function (){ window.open('/help', '_blank') });

// Boxes triggers
if(document.getElementById('_opt_new_ws')) document.getElementById('_opt_new_ws').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_opt_manage_ws')) document.getElementById('_opt_manage_ws').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_opt_help')) document.getElementById('_opt_help').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_opt_tuto')) document.getElementById('_opt_tuto').addEventListener('click', function (){  window.alert("No tutorials found, Try later again.")  });

// pinpad triggers
if(document.getElementById('_num_button_1')) document.getElementById('_num_button_1').addEventListener('click', function (){  _add_pinpad(1)  });
if(document.getElementById('_num_button_2')) document.getElementById('_num_button_2').addEventListener('click', function (){  _add_pinpad(2)  });
if(document.getElementById('_num_button_3')) document.getElementById('_num_button_3').addEventListener('click', function (){  _add_pinpad(3)  });
if(document.getElementById('_num_button_4')) document.getElementById('_num_button_4').addEventListener('click', function (){  _add_pinpad(4)  });
if(document.getElementById('_num_button_5')) document.getElementById('_num_button_5').addEventListener('click', function (){  _add_pinpad(5)  });
if(document.getElementById('_num_button_6')) document.getElementById('_num_button_6').addEventListener('click', function (){  _add_pinpad(6)  });
if(document.getElementById('_num_button_7')) document.getElementById('_num_button_7').addEventListener('click', function (){  _add_pinpad(7)  });
if(document.getElementById('_num_button_8')) document.getElementById('_num_button_8').addEventListener('click', function (){  _add_pinpad(8)  });
if(document.getElementById('_num_button_9')) document.getElementById('_num_button_9').addEventListener('click', function (){  _add_pinpad(9)  });
if(document.getElementById('_num_button_0')) document.getElementById('_num_button_0').addEventListener('click', function (){  _add_pinpad(0)  });
if(document.getElementById('_num_button_del')) document.getElementById('_num_button_del').addEventListener('click', function (){  _substract_pinpad()  });
if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){  if(_pinpad_num.length === 6){ _send_pin() }else{window.alert("Pin has to be at least 6 digits long.")} });
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ window.location.replace("/logout"); });


// add pinpad num function
function _add_pinpad(_num){
    console.log(_pinpad_num.length)
    if(_pinpad_num.length < 6 && _pinpad_num.length > -1){
        _pinpad_num = _pinpad_num.toString() + _num.toString();
        console.log(_pinpad_num);
        _display_pinpad(_pinpad_num)
        if(_pinpad_num.length === 6){
            document.getElementById("_set_pin_button").classList.remove("_gray");
            document.getElementById("_set_pin_button").classList.add("_altern");
        }
    }else if(_pinpad_num.length === 6){
        window.alert("Pin has to be max 6 digits long.");
    }else{
        _display_pinpad("Set Pin");
    }
}

// delete pinpad num function
function _substract_pinpad(){
    if(_pinpad_num.length > 0){
        _pinpad_num = _pinpad_num.substring(0, _pinpad_num.length - 1);
        document.getElementById("_set_pin_button").classList.add("_gray");
        document.getElementById("_set_pin_button").classList.remove("_altern");
        if(_pinpad_num.length === 0){
            _display_pinpad("Set Pin");
        }else{
            _display_pinpad(_pinpad_num)
        }
    }
    console.log(_pinpad_num)
}

// display pinpad
function _display_pinpad(_message){
    document.getElementsByClassName("_numpad_box")[0].innerHTML = "<p>" + _message + "</p>";
}

// send pin function
function _send_pin(){
    // Logic to send a request to save pin.
    console.log(" Saving pin: "+_pinpad_num)
}