/* 
    JS functions for the manage_workspace.html file.
*/

// params
let _window = 0, counter = 0, authopt = _context_vars[6];

// initialization of the floating buttons
_display_fbuttons(true);
_common_system_auto_change_color();

// triggers for options
if(document.getElementById("_basic_view_box")) document.getElementById("_basic_view_box").addEventListener('click', function(){ 
    _window = 1; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_1"); 
}); 
if(document.getElementById("_address_view_box")) document.getElementById("_address_view_box").addEventListener('click', function(){ 
    _window = 2; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_2"); 
}); 
if(document.getElementById("_contact_view_box")) document.getElementById("_contact_view_box").addEventListener('click', function(){ 
    _window = 3; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_3"); 
}); 
if(document.getElementById("_personalization_view_box")) document.getElementById("_personalization_view_box").addEventListener('click', function(){ 
    _window = 4; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_4"); 
}); 
if(document.getElementById("_logging_configuration")) document.getElementById("_logging_configuration").addEventListener('click', function(){ 
    _window = 6; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_6"); 
}); 
if(document.getElementById("_worktime_view")) document.getElementById("_worktime_view").addEventListener('click', function(){ 
    //pending to set a proper redirect
    _redirect('/workingTime', 3);
    //setAlert("_box_blue", "Option not available yet.");
}); 
if(document.getElementById("_checkin_url")) document.getElementById("_checkin_url").addEventListener('click', function(){ 
    common_set_alert("_box_green", window.location.href+"/checkin");
    custom_clipboard_text(window.location.href+"/checkin");
    common_set_alert("_box_green", "URL Copied to clipboard");
});

// fbutton actions
// fb 1
if(document.getElementById("_fb_1")) document.getElementById("_fb_1").addEventListener('click', function(){
    switch (_window){
        case 0:
            _display_wheel();
            _redirect(window.location.pathname.substring(1)+'/users');
            break;
        case 1: 
            _display_fbuttons(false);
            _ws_switch_pinpad(true);
            break;
        case 2: 
            _display_fbuttons(false);
            _ws_switch_pinpad(true);
            break;
        case 3: 
            _display_fbuttons(false);
            _ws_switch_pinpad(true);
            break; 
        case 4: 
            _display_fbuttons(false);
            _ws_switch_pinpad(true);
            break; 
        case 5: 
            setAlert("_box_blue", "Code: 8437HX");
            break; 
        case 6: 
            _display_fbuttons(false);
            _ws_switch_pinpad(true);
            break;
    }
});
// fb 2
if(document.getElementById("_fb_2")) document.getElementById("_fb_2").addEventListener('click', function(){
    switch (_window){
        case 0:
            setAlert("_box_yellow", "Option not yet available.");
            break;
        case 1: 
            break;
        case 2: 
            break;
        case 3: 
            break; 
        case 4: 
            break; 
        case 5: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break; 
    }
});
// fb 3
if(document.getElementById("_fb_3")) document.getElementById("_fb_3").addEventListener('click', function(){
    switch (_window){
        case 0:
            _cust_butt_data(3);
            _ws_manage_change_view("_ws_"+_window, "_ws_5");
            _window = 5;
            break;
        case 1: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break;
        case 2: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break;
        case 3: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break; 
        case 4: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break; 
        case 5: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break; 
        case 6: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            _window = 0;
            break; 
    }
});

// triggers for flex menu
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ _redirect("workspace") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ _redirect("workspace") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout") });

/// custom view change function
const _ws_manage_change_view = (_hide = false, _show = false) => {
    if (_hide && _show){
        document.getElementById(_hide).classList.add("_hidden");
        document.getElementById(_show).classList.remove("_hidden");
    }
}

/// custom save changes and cancel buttons 
const _cust_butt_data = (_case = false) => {
    if(_case == 1){
        _values = ["Save Changes", false, "Back"], _disp = [true, false, true];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
    if(_case == 2){
        _values = ["Manage Users", "Delete Workspace", "Workspace Live"], _disp = [true, true, true];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
    if(_case == 3){
        _values = ["Check In (Beta)", "Return to Manage", false], _disp = [true, true, false];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
}



/// logic to get the fields to be updated.  
const _update_workspace_get_params = () => {
    let _fields = [[],['LegalName', 'InformalName', 'ShortCode'],[ 'State', 'City', 'PostalCode', 'AddressLine1', 'AddressLine2', 'AddressLine3', 'AddressLine4'],[ 'Email', 'PhoneCountryCode', 'PhoneNumber'],[ 'MainHexColor', 'AlterHexColor', 'LowHexColor'], [], ['Level']]
    let _rullete = _fields[_window];
    let _output = {};
    let _go = false;
    for(let i = 0; i<_rullete.length;i++){
        if(document.getElementById("_i_"+_rullete[i])){
            _output[_rullete[i]] = document.getElementById("_i_"+_rullete[i]).value;
            _go = true;
        }else if(_window == 6){
            _output[_rullete[i]] = authopt;
            _go = true;
        }
    }
    return (_go) ? _output: {};
}

// Function to update the workspace
function _update_workspace(){
    if(parseInt(_pinpad_num) === _context_vars[1]){ 
        _display_wheel(true);
        _json_payload = _update_workspace_get_params();
        _json_payload["TaxId"] = _context_vars[5];
        _json_payload["Owner"] = _context_vars[0];
        _payload = {};
        _payload["item"] = _json_payload;
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=workspace";
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");   
        xhr.onreadystatechange = function () {
            try
            {
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (xhr.readyState === 4 && xhr.status === 202) {
                    setAlert("_box_green", "Workspace Successfully Updated");
                    _pinpad_num = ""; _ws_switch_pinpad(false);
                    _display_wheel(false);
                }else if(xhr.status === 409){
                    setAlert("_box_red",_parsed_data["reason"]);
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
                    _change_obj_color(document.getElementById('_login_buttom'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); 
                    setAlert("_box_red", "Error login user.");
                    _display_wheel(false);
                }else{
                    counter++;
                }
            }
        };
        var data = JSON.stringify(_payload);
        console.log(data);
        xhr.send(data);
    }else{
        setAlert("_box_red", "Incorrect Pin");_display_wheel(false);
    }
    _pinpad_num = ""; _display_pinpad(_pinpad_num);
}

/// pinpad

if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){_update_workspace(); });
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ _pinpad_num = ""; _ws_switch_pinpad(false); });


// pinpad display
function _ws_switch_pinpad(_show){
    if(_show){
        _display_fbuttons(false);
        document.getElementsByClassName('_main_block_content')[0].classList.add("_hidden");
        document.getElementsByClassName('_main_block_numpad')[0].classList.remove("_hidden");
        _display_pinpad("Type Pin")
    }else{
        _display_fbuttons(true);
        document.getElementsByClassName('_main_block_numpad')[0].classList.add("_hidden");
        document.getElementsByClassName('_main_block_content')[0].classList.remove("_hidden");
    }
}

// pickers changes
// color 1
if(document.getElementById('_input_MainHexColor_tx')) document.getElementById('_input_MainHexColor_tx').addEventListener('change', function (){ changeColorPickerValue(document.getElementById('_input_MainHexColor_tx').value, '_i_MainHexColor', '_cp_1'); });
if(document.getElementById('_i_MainHexColor')) document.getElementById('_i_MainHexColor').addEventListener('change', function (){ changeColorTextValue(document.getElementById('_i_MainHexColor').value, '_input_MainHexColor_tx', '_cp_1'); });
// color 2
if(document.getElementById('_input_LowHexColor_tx')) document.getElementById('_input_LowHexColor_tx').addEventListener('change', function (){ changeColorPickerValue(document.getElementById('_input_LowHexColor_tx').value, '_i_LowHexColor', '_cp_2'); });
if(document.getElementById('_i_LowHexColor')) document.getElementById('_i_LowHexColor').addEventListener('change', function (){ changeColorTextValue(document.getElementById('_i_LowHexColor').value, '_input_LowHexColor_tx', '_cp_2'); });
// color 3
if(document.getElementById('_input_AlterHexColor_tx')) document.getElementById('_input_AlterHexColor_tx').addEventListener('change', function (){ changeColorPickerValue(document.getElementById('_input_AlterHexColor_tx').value, '_i_AlterHexColor', '_cp_3'); });
if(document.getElementById('_i_AlterHexColor')) document.getElementById('_i_AlterHexColor').addEventListener('change', function (){ changeColorTextValue(document.getElementById('_i_AlterHexColor').value, '_input_AlterHexColor_tx', '_cp_3'); });


// title name change
if(document.getElementById('_i_InformalName')) document.getElementById('_i_InformalName').addEventListener('change', function (){ _change_system_title(document.getElementById('_i_InformalName').value);});


// cust reset input colors: 
const _cust_reset_input_colors = () =>{
    if(_context_vars[2] && _context_vars[3] && _context_vars[4]) {
        changeColorPickerValue(_context_vars[2], '_i_MainHexColor', '_cp_1');
        changeColorTextValue(_context_vars[2], '_input_MainHexColor_tx', '_cp_1');
        changeColorPickerValue(_context_vars[3], '_i_LowHexColor', '_cp_2');
        changeColorTextValue(_context_vars[3], '_input_LowHexColor_tx', '_cp_2');
        changeColorPickerValue(_context_vars[4], '_i_AlterHexColor', '_cp_3');
        changeColorTextValue(_context_vars[4], '_input_AlterHexColor_tx', '_cp_3');
    }
}

//// cust
// switch auth methods

// triggers: 
if(document.getElementById('_auth_op1')) document.getElementById('_auth_op1').addEventListener('click', function (){ _cust_switch_auth_methods(1); authopt = "1"; });
if(document.getElementById('_auth_op2')) document.getElementById('_auth_op2').addEventListener('click', function (){ _cust_switch_auth_methods(2); authopt = "2"; });
if(document.getElementById('_auth_op3')) document.getElementById('_auth_op3').addEventListener('click', function (){ _cust_switch_auth_methods(3); authopt = "3"; });

// switch function
const _cust_switch_auth_methods = (selector = false) => {
    if(selector){
        let secs = [document.getElementById('_auth_op1'), document.getElementById('_auth_op2'), document.getElementById('_auth_op3')]
        for(let i = 0; i < 3; i++){
            if(selector-1 == i){
                secs[i].classList.remove('color_1_bg');
                secs[i].classList.remove('color_2_tx');
                secs[i].classList.add('color_2_bg');
                secs[i].classList.add('color_1_tx');
            }else{
                secs[i].classList.remove('color_2_bg');
                secs[i].classList.remove('color_1_tx');
                secs[i].classList.add('color_1_bg');
                secs[i].classList.add('color_2_tx');
            }
        }
    }
}


/// updatee time
function updateTime() {
    // get time format HH:MM:SS
    let data = new Date();
    let options = { hour12: false }; // Use 24-hour format
    let timeString = data.toLocaleTimeString(undefined, options);
    document.getElementById('live_time').innerHTML = timeString;
}

/// clock updater
setInterval(updateTime, 1000);

/// custom function to copy to clipboard a custom text
const custom_clipboard_text = (myText) => {
    navigator.clipboard.writeText(myText);
}