/* 
    JS functions for the workspace.html file.
*/

// control variables
let _ws_stage = 0, errors = 0, counter = 0;

/* floating buttons activation */
if(document.getElementsByClassName("_floating_buttons")[0])_display_fbuttons(true);


// Triggers
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ _change_view(true) });
if(document.getElementById('_fb_3')) document.getElementById('_fb_3').addEventListener('click', function (){ _change_view(false) });
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ if(_required_check()){_ws_switch_pinpad(true);} });
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){ _create_workspace(); });
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ window.location.replace("/dashboard") });

// pickers changes
// color 1
if(document.getElementById('_input_MainHexColor_tx')) document.getElementById('_input_MainHexColor_tx').addEventListener('change', function (){ changeColorPickerValue(document.getElementById('_input_MainHexColor_tx').value, '_input_MainHexColor', '_cp_1'); });
if(document.getElementById('_input_MainHexColor')) document.getElementById('_input_MainHexColor').addEventListener('change', function (){ changeColorTextValue(document.getElementById('_input_MainHexColor').value, '_input_MainHexColor_tx', '_cp_1'); });
// color 2
if(document.getElementById('_input_LowHexColor_tx')) document.getElementById('_input_LowHexColor_tx').addEventListener('change', function (){ changeColorPickerValue(document.getElementById('_input_LowHexColor_tx').value, '_input_LowHexColor', '_cp_2'); });
if(document.getElementById('_input_LowHexColor')) document.getElementById('_input_LowHexColor').addEventListener('change', function (){ changeColorTextValue(document.getElementById('_input_LowHexColor').value, '_input_LowHexColor_tx', '_cp_2'); });
// color 3
if(document.getElementById('_input_AlterHexColor_tx')) document.getElementById('_input_AlterHexColor_tx').addEventListener('change', function (){ changeColorPickerValue(document.getElementById('_input_AlterHexColor_tx').value, '_input_AlterHexColor', '_cp_3'); });
if(document.getElementById('_input_AlterHexColor')) document.getElementById('_input_AlterHexColor').addEventListener('change', function (){ changeColorTextValue(document.getElementById('_input_AlterHexColor').value, '_input_AlterHexColor_tx', '_cp_3'); });



// Functions
// 
/// Function to change view.
function _change_view(_direction){
    if (_direction && _ws_stage < 2 ){ 
        if(_ws_stage === 0){
            document.getElementById("_fb_3").classList.remove("_hidden");
        }
        if(_ws_stage === 1){
            document.getElementById("_fb_1").classList.add("_hidden");
            document.getElementById("_fb_2").classList.remove("_hidden");
        }
        _ws_stage++;
        _hide_all_ws_views();
        _show_ws_view(_ws_stage);
    }
    if (!_direction && _ws_stage > 0){
        if(_ws_stage === 2){
            document.getElementById("_fb_2").classList.add("_hidden");
            document.getElementById("_fb_1").classList.remove("_hidden");
        }
        if(_ws_stage === 1){
            document.getElementById("_fb_3").classList.add("_hidden");
        }
        _ws_stage--;
        _hide_all_ws_views();
        _show_ws_view(_ws_stage);
    }
}

// Function to hide all views.
function _hide_all_ws_views(){
    document.getElementById("_mb_stage_0").classList.add("_hidden");
    document.getElementById("_mb_stage_1").classList.add("_hidden");
    document.getElementById("_mb_stage_2").classList.add("_hidden");
    return true;
}

// Function to show specific view.
function _show_ws_view(_view_num){
    let _view = "_mb_stage_"+_view_num.toString();
    document.getElementById(_view).classList.remove("_hidden");
    return true;
}

// pinpad stage
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

// Function to create the workspace
function _create_workspace(){
    if(document.getElementById("_input_TaxId").value.length > 0){
        if(parseInt(_pinpad_num) === _context_vars[1]){ 
            _display_wheel(true);
            let fields = [ 'Email', 'TaxId', 'LegalName', 'InformalName', 'ShortCode', 'CountryCode', 'State', 'City', 'AddressLine1', 'AddressLine2', 'AddressLine3', 'AddressLine4', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor', 'Level', 'Active', 'CreationDate', 'PostalCode']
            _json_payload = {};
            _payload = {};
            for(let i = 0; i < fields.length; i++){
                _json_payload[fields[i]] = (document.getElementById('_input_'+fields[i])) ? document.getElementById('_input_'+fields[i]).value : '';
            }
            _json_payload['Owner'] = _context_vars[0];
            _payload["item"] = _json_payload;
            console.log(_payload);
            let xhr = new XMLHttpRequest();
            let url = "/v1/admdata?service=workspace";
            xhr.open("POST", url);
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
    }else{
        _ws_switch_pinpad(false);
        setAlert("_box_red", "Missing Tax Id");
        _change_view(false);_change_view(false);
        _display_wheel(false);
    }
    _pinpad_num = ""; _display_pinpad(_pinpad_num);
}

/// Function to check for required fields-
function _required_check(){
    let _go = true;
    _required = ['Email', 'TaxId', 'LegalName', 'InformalName', 'ShortCode', 'CountryCode', 'State', 'City', 'AddressLine1', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor', 'PostalCode'];
    for(let i = 0; i < _required.length; i++){
        if(document.getElementById("_input_"+_required[i]).value.length === 0){
            _go = false;
            setAlert("_box_red", "Missing "+_required[i]);
            break;
        }
    }
    return _go;
}


// Color picker functions 
// function change color picker value.
function changeColorPickerValue(_value, _id, _num){
    if (validateHex(_value)){  
        document.getElementById(_id).value = _value;
        document.getElementById(_num).style.borderColor = _value;
        _change_system_colors(_num.substring(_num.length -1), _value);
    }else{
        document.getElementById(_id+"_tx").value = "";
    }
}

// function change color text value
function changeColorTextValue(_value, _id, _num){
    _change_system_colors(_num.substring(_num.length -1), _value);
    document.getElementById(_id).value = _value;
    document.getElementById(_num).style.borderColor = _value;
}

