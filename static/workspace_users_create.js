
// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();


// required view variables
let counter = 0;


/// triggers: 
if(document.getElementById('_back_ws_en')) document.getElementById('_back_ws_en').addEventListener('click', function (){ _ws_users_create_goback(); });
if(document.getElementById('_back_ws_es')) document.getElementById('_back_ws_es').addEventListener('click', function (){ _ws_users_create_goback(); });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _ws_users_update_goback(); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _ws_users_update_goback(); });
if(document.getElementById('_input_pass')) document.getElementById('_input_pass').addEventListener('click', function (){ if(_view === 0) { _ws_users_update_display_passview(true); } });

// floating buttons 
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    _ws_users_create(1);
});
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ 
    _ws_users_create_goback();
});


/* JS functions specific for the switch function */

const toggleSwitch = document.getElementById("switch");
const toggleStatus = document.getElementById("switch-status");

function onCheckboxToggle() {
  const isChecked = this.hasAttribute("checked");

  /* 1. Update toggle switch visual state. */
  this.toggleAttribute("checked");

  /* 2. Update toggle switch status text. */
  toggleStatus.innerText = isChecked ? "Regular User" : " Admin User";
}

toggleSwitch.addEventListener("change", onCheckboxToggle);
/* end of switch function */


// get main params: 
const _ws_users_create_get_params = () => {
    if(document.getElementById("_input_fname").value.length > 3){
        if(document.getElementById("_input_username").value.length > 3 && document.getElementById("_input_username").value.length < 20){
            if(_common_email_string_validation(document.getElementById("_input_email").value) ){
                if(document.getElementById("_input_password").value.length >= 10 && document.getElementById("_input_password").value.length < 30 && document.getElementById("_input_password").value == document.getElementById("_input_repeat_password").value){
                    let _json_obj = {};
                    _json_obj['Id'] = _context_vars[5]+'.'+document.getElementById("_input_username").value;
                    _json_obj['FullName'] = document.getElementById("_input_fname").value;
                    _json_obj['Username'] = document.getElementById("_input_username").value;
                    _json_obj['Email'] = document.getElementById("_input_email").value;
                    _json_obj['Type'] = (document.getElementById("switch").hasAttribute("checked")) ? 1 : 0;
                    _json_obj['CreatedBy'] = _context_vars[0];
                    _json_obj['Manager'] = document.getElementById('selectManager').value;
                    _json_obj['rp_email_token'] = false;
                    _json_obj['rp_email_exp_date'] = false;
                    _json_obj['Active'] = true;
                    _json_obj['Tenant'] = _context_vars[5];
                    _json_obj['Password'] = window.btoa(unescape(encodeURIComponent(document.getElementById("_input_password").value)));
                    if (_logging) console.log(_json_obj);
                    return _json_obj;
                }else{
                    setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['001']); 
                    return false;
                }
            }else{
                setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['004']); 
                return false;
            }
        }else{
            setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['003']); 
            return false;
        }
    }else{
        setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['012']); 
        return false;
    }
}

// create user
const _ws_users_create = ( path ) => {
    let _params = {};
    if (path === 1 ){
        _params =  _ws_users_create_get_params();
    }else{
        _params = false;
    }
    if(_params){
        _display_wheel(true);
        let _json_out = {};
        _json_out["item"] = _params;
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=tenantUser";
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    let _data = xhr.responseText;
                    let _parsed_data = JSON.parse(_data);
                    if (_logging){
                        console.group('Response Data: ')
                        console.log(_parsed_data)
                        console.groupEnd
                    }
                    if(_parsed_data.code == 200){
                        _display_wheel(false);
                        setAlert("_box_green", "Workspace User Created");
                        _ws_users_create_goback();
                    }else{
                        _display_wheel(false);
                        setAlert("_box_red", _parsed_data.reason);
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
                    setAlert("_box_red", "Error creating Tenant User.");
                    _display_wheel(false);
                }else{
                    counter++;
                }
            }
        };
        var data = JSON.stringify(_json_out);
        xhr.send(data);
    }

}

// clean params 
const _ws_users_update_clean_password_params = () => {
    document.getElementById("_input_new_pass").value = "";
    document.getElementById("_input_new_pass_repeat").value = "";
}


const _ws_users_create_goback = () => {
    _display_wheel(true);
    let x = window.location.pathname;
    x = x.substr(0, x.indexOf('/users/'));
    _redirect(x+'/users', 1);
}