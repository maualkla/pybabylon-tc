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
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ if(_required_check()){_display_fbuttons(false);_ws_switch_pinpad(true);} });
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ _redirect("workspace") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ _redirect("workspace") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout") });
if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){ _create_workspace(); });
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ _redirect("dashboard") });

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


// title name change
if(document.getElementById('_input_InformalName')) document.getElementById('_input_InformalName').addEventListener('change', function (){ _change_system_title(document.getElementById('_input_InformalName').value);});



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
    if(parseInt(_pinpad_num) === _context_vars[1]){ 
        let _validation = _new_workspace_form_validation();
        if(_validation[0]){
            _params = _validation[1];
            _display_wheel(true);
            let fields = [ 'Email', 'TaxId', 'LegalName', 'InformalName', 'ShortCode', 'CountryCode', 'State', 'City', 'AddressLine1', 'AddressLine2', 'AddressLine3', 'AddressLine4', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor', 'Level', 'Active', 'CreationDate', 'PostalCode']
            _json_payload = {};
            _payload = {};
            for(let i = 0; i < fields.length; i++){
                _json_payload[fields[i]] = (_params['_input_'+fields[i]]) ? _params['_input_'+fields[i]] : '';
            }
            _json_payload['Owner'] = _context_vars[0];
            _payload["item"] = _json_payload;
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
            setAlert("_box_red", _common_dictionary_errors[_curr_languaje][_validation[1]]);
            _ws_switch_pinpad(false);
            _display_wheel(false);
        }
    }else{
        setAlert("_box_red", "Incorrect Pin");_display_wheel(false);
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

/// Form validation
const _new_workspace_form_validation = () =>{
    // validar pass
    // validar _required = ['Email', 'TaxId', 'LegalName', 'InformalName', 'ShortCode', 'CountryCode', 'State', 'City', 'AddressLine1', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor', 'PostalCode'];
    if ( _common_email_string_validation(document.getElementById('_input_Email').value) )
    {
        if(document.getElementById('_input_TaxId').value.length > 3 && document.getElementById('_input_TaxId').value.length < 20)
        {
            if(document.getElementById('_input_LegalName').value.length > 3 )
            {
                if(document.getElementById('_input_ShortCode').value.length > 3 && document.getElementById('_input_ShortCode').value.length < 7)
                {
                    if(document.getElementById('_input_CountryCode').value.length > 3 && document.getElementById('_input_State').value.length > 3 && document.getElementById('_input_City').value.length > 3 && document.getElementById('_input_AddressLine1').value.length > 3)
                    {
                        if(_common_number_validation(document.getElementById('_input_PhoneNumber').value))
                        {
                            if(_common_postal_code_validation(document.getElementById('_input_PostalCode').value, 'MX'))
                            {
                                let form_values = {}
                                form_values['_input_Email'] = document.getElementById('_input_Email').value;
                                form_values['_input_TaxId'] = document.getElementById('_input_TaxId').value;
                                form_values['_input_LegalName'] = document.getElementById('_input_LegalName').value;
                                form_values['_input_InformalName'] = document.getElementById('_input_InformalName').value;
                                form_values['_input_ShortCode'] = document.getElementById('_input_ShortCode').value;
                                form_values['_input_CountryCode'] = document.getElementById('_input_CountryCode').value;
                                form_values['_input_State'] = document.getElementById('_input_State').value;
                                form_values['_input_City'] = document.getElementById('_input_City').value;
                                form_values['_input_AddressLine1'] = document.getElementById('_input_AddressLine1').value;
                                form_values['_input_PhoneCountryCode'] = document.getElementById('_input_PhoneCountryCode').value;
                                form_values['_input_PhoneNumber'] = document.getElementById('_input_PhoneNumber').value;
                                form_values['_input_MainHexColor'] = document.getElementById('_input_MainHexColor').value;
                                form_values['_input_AlterHexColor'] = document.getElementById('_input_AlterHexColor').value;
                                form_values['_input_LowHexColor'] = document.getElementById('_input_LowHexColor').value;
                                form_values['_input_PostalCode'] = document.getElementById('_input_PostalCode').value;
                                return [true,form_values];
                            }else{
                                _new_workspace_clean_field('_input_PostalCode');
                                _new_workspace_leaps(1);
                                return [false,'006'];
                            }
                        }else{
                            _new_workspace_clean_field('_input_PhoneNumber');
                            return [false,'007'];
                        }
                    }else{
                        _new_workspace_clean_field('_input_CountryCode');
                        _new_workspace_clean_field('_input_State');
                        _new_workspace_clean_field('_input_City');
                        _new_workspace_clean_field('_input_AddressLine1');
                        _new_workspace_leaps(1);
                        return [false,'011'];
                    }
                }else{
                    _new_workspace_clean_field('_input_ShortCode');
                    _new_workspace_leaps(2);
                    return [false,'010'];
                }
            }else{
                _new_workspace_clean_field('_input_LegalName');
                _new_workspace_leaps(2);
                return [false,'009'];
            }
        }else{
            _new_workspace_clean_field('_input_TaxId');
            _new_workspace_leaps(2);
            return [false,'008'];
        }
    }else{
        _new_workspace_clean_field('_input_Email');
        _new_workspace_leaps(2);
        return [false,'004'];
        
    }
}

//
// back 1 or 2 or 3 steps
const _new_workspace_leaps = (_num) => {
    for (let i = 0; i < _num; i++){
        _change_view(false);
    }
}

// clean field 
const _new_workspace_clean_field = (_id) => {
    document.getElementById(_id).value = "";
}
