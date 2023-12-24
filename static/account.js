/* 
    JS functions for the account.html file.
*/

let _view = 0;
let _view_2 = 0;
_pinpad_num = "";

// Triggers
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function ()
{ 
    let _npass = document.getElementById("_input_new_pass");
    let _rnpass = document.getElementById("_input_new_pass_repeat");
    let _opass = document.getElementById("_input_old_pass");
    if(_view === 0) {
        _pinpad_visibility(true); 
    } 
    else if (_view === 1 && _npass.value.length > 3 && _opass.value.length > 3 && _npass.value == _rnpass.value) 
    { 
        _send_user_update(_view_1_params());
    }else{
        setAlert("_box_yellow", "New password dont match.");
        _npass.value = "";
        _rnpass.value = ""; 
    }
});
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ if(_view === 0) { window.location.replace("/dashboard") } else if (_view === 1) { display_pass_component(false); _view = 0; } });
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ window.location.replace("/logout") });

if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){  
    if(_pinpad_num.length === 6 && _view === 0){ 
        console.log(1)
       if (parseInt(_pinpad_num) == _context_vars[1]) _send_user_update(_view_0_params()); else setAlert("_box_red", "Pin Incorrect");
    } else if(_pinpad_num.length === 6 && _view === 2){
        console.log(2); let pass = false;
        if (_view_2 === 0 ){ 
            if (parseInt(_pinpad_num) == _context_vars[1]) { pass = true; _view_2 = 1; _display_pinpad("Type New Pin"); _pinpad_num = "";} else { pass = true; setAlert("_box_red", "Pin typed is incorrect. Try again."); }
        }else if (_view_2 === 1 && pass == false) {_send_user_update(_view_2_params());_view_2 = 0;}
    }else{
        window.alert("Pin has to be at least 6 digits long.")
    }
});
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ _pinpad_visibility(false); _pinpad_num = " "; _substract_pinpad();});
    
/* floating buttons activation */
if(document.getElementsByClassName("_floating_buttons")[0])document.getElementsByClassName("_floating_buttons")[0].classList.remove("_hidden");

/* Actions */
if(document.getElementById("_input_pass")) document.getElementById("_input_pass").addEventListener('click', function(){ _view = 1; display_pass_component(true); });
if(document.getElementById("_input_pin")) document.getElementById("_input_pin").addEventListener("click", function(){ _display_pinpad("Type Old Pin"); _view = 2; _pinpad_visibility(true); })

// display pinpad
function _pinpad_visibility(action){
    if(action){
        floating_buttons(false)
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_numpad")[0].classList.remove("_hidden");
    }else{
        floating_buttons(true)
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
        document.getElementsByClassName("_main_block_numpad")[0].classList.add("_hidden");
    }
}

// prepare main view parameters
function _view_0_params(){
    let _json_obj = {}
    let _fields = ['pass', 'username', 'bday', 'fname', 'phone', 'pin', 'postalCode']
    let _go = false;
    for(let x = 0; x < _fields.length ; x++){
        _json_obj[_fields[x]] = document.getElementById('_input_'+_fields[x]).value;
        _go = true;
    }
    return _json_obj;
}

// prepare passw params
function _view_1_params(){
    let _json_obj = {};
    _json_obj["oldPass"] = window.btoa(unescape(encodeURIComponent(document.getElementById("_input_old_pass").value)));
    _json_obj["pass"] = window.btoa(unescape(encodeURIComponent(document.getElementById("_input_new_pass").value)));
    return _json_obj;
}

// prepare pin params
function _view_2_params(){
    let _json_obj = {};
    _json_obj['pin'] = parseInt(_pinpad_num);
    return _json_obj;
}

// update user account function
function _send_user_update(_json_obj = False){
    if(_json_obj){
        _display_wheel(true);
        _json_obj['email'] = _context_vars[0];
        let json_out = {};
        json_out["item"] = _json_obj;
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=user";
        console.log(json_out);
        console.log(url);
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    //window.location.replace("/dashboard");
                    // hide views
                    display_pass_component(false);
                    _pinpad_visibility(false);
                    // clean vars
                    _view = 0;
                    _view_2 = 0;
                    _pinpad_num = "";
                    // clean textboxes
                    document.getElementById("_input_old_pass").value = "";
                    document.getElementById("_input_new_pass").value = "";
                    document.getElementById("_input_new_pass_repeat").value = "";
                    // show alert
                    setAlert("_box_green", "Changes Saved");
                    // hide wheel
                    _display_wheel(false);
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
                    setAlert("_box_red", "Error updating user.");
                    _display_wheel(false);
                }else{
                    counter++;
                }
            }
        };
        var data = JSON.stringify(json_out);
        xhr.send(data);
    }
}

/* show/hide floating buttons function */
function floating_buttons(show){
    if (show){
        document.getElementsByClassName("_floating_buttons")[0].classList.remove("_hidden");
    }else{
        document.getElementsByClassName("_floating_buttons")[0].classList.add("_hidden");
    }
}

/* show / hide password change component */
function display_pass_component(show){
    if(show){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content_pwd")[0].classList.remove("_hidden");
    }else{
        document.getElementsByClassName("_main_block_content_pwd")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
    }
}