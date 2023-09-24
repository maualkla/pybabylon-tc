/* 
    JS functions for the workspace.html file.
*/

// control variables
let _ws_stage = 0;

// Triggers
if(document.getElementById('_next_button')) document.getElementById('_next_button').addEventListener('click', function (){ _change_view(true) });
if(document.getElementById('_back_button')) document.getElementById('_back_button').addEventListener('click', function (){ _change_view(false) });
if(document.getElementById('_create_button')) document.getElementById('_create_button').addEventListener('click', function (){ _create_workspace() });
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ window.location.replace("/logout") });


// Functions
// 
/// Function to change view.
function _change_view(_direction){
    if (_direction && _ws_stage < 2 ){ 
        if(_ws_stage === 1){
            document.getElementById("_next_button").classList.add("_hidden");
            document.getElementById("_create_button").classList.remove("_hidden");
        }
        _ws_stage++;
        _hide_all_ws_views();
        _show_ws_view(_ws_stage);
    }
    if (!_direction && _ws_stage > 0){
        if(_ws_stage === 2){
            document.getElementById("_create_button").classList.add("_hidden");
            document.getElementById("_next_button").classList.remove("_hidden");
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

// Function to create the workspace
function _create_workspace(){
    let fields = ['Owner', 'Email', 'TaxId', 'LegalName', 'InformalName', 'ShortCode', 'CountryCode', 'State', 'City', 'AddressLine1', 'AddressLine2', 'AddressLine3', 'AddressLine4', 'PhoneCountryCode', 'PhoneNumber', 'MainHexColor', 'AlterHexColor', 'LowHexColor', 'Level', 'Active', 'CreationDate', 'PostalCode']
    _json_payload = {}
    window.alert(" create workspace")
    for(let i = 0; i < fields.length; i++){
        console.log(fields[i]);
        _json_payload[fields[i]] = (document.getElementById('_input_'+fields[i])) ? document.getElementById('_input_'+fields[i]).value : '';
    }
    _json_payload['Owner'] = 'mauricio@adminde.com';
    console.log(_json_payload);

    let xhr = new XMLHttpRequest();
    let url = "/s_workspace";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        try
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(" Correcto ")
                console.debug(xhr)
            }
        }
        catch(e)
        {
            errors++;
        }
    };
    var data = JSON.stringify(_json_payload);
    xhr.send(data);


}