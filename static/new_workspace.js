/* 
    JS functions for the workspace.html file.
*/

// control variables
let _ws_stage = 0, errors = 0;

/* floating buttons activation */
if(document.getElementsByClassName("_floating_buttons")[0])document.getElementsByClassName("_floating_buttons")[0].classList.remove("_hidden");


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
        document.getElementsByClassName('_main_block_content')[0].classList.add("_hidden");
        document.getElementsByClassName('_main_block_numpad')[0].classList.remove("_hidden");
    }else{
        
        document.getElementsByClassName('_main_block_numpad')[0].classList.add("_hidden");
        document.getElementsByClassName('_main_block_content')[0].classList.remove("_hidden");
    }
}

// Function to create the workspace
function _create_workspace(){
    if(document.getElementById("_input_TaxId").value.length > 0){
        if(_pinpad_num === "111111"){ /// @TODO REPLACE the 111111 with the user pin. or find a way around. ¿?
            let fields = ['Owner', 'Email', 'TaxId', 'LegalName', 'InformalName', 'ShortCode', 'CountryCode', 'State', 'City', 'AddressLine1', 'AddressLine2', 'AddressLine3', 'AddressLine4', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor', 'Level', 'Active', 'CreationDate', 'PostalCode']
            _json_payload = {}
            for(let i = 0; i < fields.length; i++){
                _json_payload[fields[i]] = (document.getElementById('_input_'+fields[i])) ? document.getElementById('_input_'+fields[i]).value : '';
            }
            _json_payload['Owner'] = 'mauricio@adminde.com';
            let xhr = new XMLHttpRequest();
            let url = "/s_workspace";
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                try
                {
                    let _data = xhr.responseText;
                    let _parsed_data = JSON.parse(_data);
                    if (xhr.readyState === 4 && xhr.status === 202) {
                        window.location.replace('/dashboard');
                    }else if( xhr.status === 409){
                        document.getElementsByClassName('_main_block_alerts')[0].classList.add("_box_red");
                        document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_hidden");
                        document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "<p> "+ _parsed_data["reason"] +" </p>";
                    }
                }
                catch(e)
                {
                    errors++;
                }
            };
            var data = JSON.stringify(_json_payload);
            xhr.send(data);
        }else{
            setAlert("_box_red", "Incorrect Pin");
        }
    }else{
        _ws_switch_pinpad(false);
        setAlert("_box_red", "Missing Tax Id");
        _change_view(false);_change_view(false);
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