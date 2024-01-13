/* 
    JS functions for the manage_workspace.html file.
*/

// params
let _window = 0;

// initialization of the floating buttons
_display_fbuttons(true);
if(_context_vars[2] && _context_vars[3] && _context_vars[4]) {
    _change_system_colors(1, _context_vars[2]);
    _change_system_colors(2, _context_vars[3]);
    _change_system_colors(3, _context_vars[4]);

}

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

// fbutton actions
// fb 1
if(document.getElementById("_fb_1")) document.getElementById("_fb_1").addEventListener('click', function(){
    switch (_window){
        case 0:
            setAlert("_box_yellow", "Users cant be added yet, try again later.");
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
            setAlert("_box_yellow", "Something went wrong, try again later");
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
        _values = ["Save Changes", false, "Cancel"], _disp = [true, false, true];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
    if(_case == 2){
        _values = ["Add Users", "Delete Workspace", "Workspace Live"], _disp = [true, true, true];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
    if(_case == 3){
        _values = ["Check In", "Return to Manage", false], _disp = [true, true, false];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
}



/// logic to get the fields to be updated.  

// Function to update the workspace
function _update_workspace(){
    if(parseInt(_pinpad_num) === _context_vars[1]){ 
        _display_wheel(true);
        let fields = ['LegalName', 'InformalName', 'ShortCode', 'State', 'City', 'PostalCode', 'AddressLine1', 'AddressLine2', 'AddressLine3', 'AddressLine4', 'Email', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor']
        _json_payload = {};
        _payload = {};
        for(let i = 0; i < fields.length; i++){
            _json_payload[fields[i]] = (document.getElementById('_i_'+fields[i])) ? document.getElementById('_i_'+fields[i]).value : '';
        }
        _payload["item"] = _json_payload;
        console.log(_payload);
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
                    setAlert("_box_green", "Workspace Successfully Creted");
                    document.getElementById("_xpc_ws_alert").style.height = '170px';
                    window.location.replace('/dashboard');
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
    }else{
        _display_fbuttons(true);
        document.getElementsByClassName('_main_block_numpad')[0].classList.add("_hidden");
        document.getElementsByClassName('_main_block_content')[0].classList.remove("_hidden");
    }
}