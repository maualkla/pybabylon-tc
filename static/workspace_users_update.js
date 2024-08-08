
// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();


// required view variables
let _view = 0, counter = 0;


/// triggers: 
if(document.getElementById('_back_ws_en')) document.getElementById('_back_ws_en').addEventListener('click', function (){ _ws_users_update_goback(); });
if(document.getElementById('_back_ws_es')) document.getElementById('_back_ws_es').addEventListener('click', function (){ _ws_users_update_goback(); });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _ws_users_update_goback(); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _ws_users_update_goback(); });
if(document.getElementById('_input_pass')) document.getElementById('_input_pass').addEventListener('click', function (){ if(_view === 0) { _ws_users_update_display_passview(true); } });

// floating buttons 
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    if(_view === 0) { 
        _ws_users_update_data(1);
    } else if(_view === 1){
        _ws_users_update_data(2);
    }
});
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ 
    if(_view === 0) { 
        //delete action
        _delete_transaction(_context_vars[6]);
    } else if(_view === 1){
        //
    }
});
if(document.getElementById('_fb_3')) document.getElementById('_fb_3').addEventListener('click', function (){ 
    if(_view === 0) { 
        _ws_users_update_goback();
    } else if(_view === 1){
        _ws_users_update_display_passview(false);
    }
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


// display pass view
const _ws_users_update_display_passview = ( action ) => {
    if (action){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content_pwd")[0].classList.remove("_hidden");
        _view = 1;
    }else{
        document.getElementsByClassName("_main_block_content_pwd")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
        _view = 0;
    }
}


// get main params: 
const _ws_users_update_get_params = () => {
    if(document.getElementById("_input_fname").value && document.getElementById("_input_email").value){
        let _json_obj = {};
        _json_obj['FullName'] = document.getElementById("_input_fname").value;
        _json_obj['Email'] = document.getElementById("_input_email").value;
        _json_obj['Type'] = (document.getElementById("switch").hasAttribute("checked")) ? 1 : 0;
        _json_obj['Manager'] = document.getElementById('_input_manager').value;
        return _json_obj;
    }else{
        setAlert("_box_red", "Please fill all required fields"); 
        return false;
    }
}

// get pass resseet params
const _ws_users_update_get_restpassparams = () => {
    if(document.getElementById("_input_new_pass").value == document.getElementById("_input_new_pass_repeat").value){
        let _json_obj = {};
        _json_obj['Password'] = window.btoa(unescape(encodeURIComponent(document.getElementById("_input_new_pass").value)))
        return _json_obj;
    }else{
        setAlert("_box_red", "Passwords not match"); 
        return false;
    }
}

// update user
const _ws_users_update_data = ( path ) => {
    let _params = {};
    if (path === 1 ){
        _params =  _ws_users_update_get_params();
    }else if (path === 2 ){
        _params =  _ws_users_update_get_restpassparams();
    }else if (path === 3){
        _params = false;
    }else{
        _params = false;
    }
    if(_params){
        _display_wheel(true);
        _params['Id'] = _context_vars[6];
        _params['Tenant'] = _context_vars[5];
        let _json_out = {};
        _json_out["item"] = _params;
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=tenantUser";
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    _display_wheel(false);
                    setAlert("_box_green", "Changes Saved");
                    if(path === 2 ){
                        _ws_users_update_clean_password_params();
                        _ws_users_update_display_passview(false);
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
                    setAlert("_box_red", "Error updating Tenant User.");
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


const _ws_users_update_goback = () => {
    _display_wheel(true);
    let x = window.location.pathname;
    x = x.substr(0, x.indexOf('/users/'));
    _redirect(x+'/users', 1);
}



// function delete user
function _delete_transaction(_tuser_id){
    // code to be written
    if(_tuser_id){
        _display_wheel(true);
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=tenantUser&id=" + _tuser_id;
        xhr.open("DELETE", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    _remove_custbox(_trx_id);
                    setAlert("_box_blue", "User deleted");
                    _redirect('/workspace/'+_context_vars[5]+'/users', True)
                    _display_wheel(false);
                    counter = 0;
                }else if(xhr.readyState === 4 && xhr.status === 500){
                    setAlert("_box_red",_parsed_data["reason"]);
                    _display_wheel(false);
                    counter = 0;
                }
            }catch(e){
                if(counter == 1){
                    if(_logging){
                        console.log("-------------------")
                        console.log(e)
                        console.log("-------------------")
                    }
                    _errors++;
                    setAlert("_box_red", "Error processing data.");
                    _display_wheel(false);
                }else{
                    counter++;
                }
            }
        };
        xhr.send();
    }

}