/* 
    JS functions for the account.html file.
*/
// Triggers
if(document.getElementById('_save_button')) document.getElementById('_save_button').addEventListener('click', function (){ _pinpad_visibility(true); console.log(" Sent to update. ")});
if(document.getElementById('_cancel_button')) document.getElementById('_cancel_button').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ window.location.replace("/logout") });

if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){  if(_pinpad_num.length === 6){ _send_user_update() }else{window.alert("Pin has to be at least 6 digits long.")}});
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ _pinpad_visibility(false); _pinpad_num = " "; _substract_pinpad();});



// display pinpad
function _pinpad_visibility(action){
    if(action){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_numpad")[0].classList.remove("_hidden");
    }else{
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
        document.getElementsByClassName("_main_block_numpad")[0].classList.add("_hidden");
    }
}

// update user account function
function _send_user_update(){
    let _json_obj = {}
    let _fields = ['pass', 'username', 'bday', 'fname', 'phone', 'pin', 'postalCode']
    let _go = false;
    for(let x = 0; x < _fields.length ; x++){
        _json_obj[_fields[x]] = document.getElementById('_input_'+_fields[x]).value;
        _go = true;
    }
    _json_obj['email'] = "missing email origin";
    if(1 === 2){
        let x = document.cookie;
        _id = x()
        let xhr = new XMLHttpRequest();
        let url = "/user";
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("_id", "_id");
        xhr.setRequestHeader("_un", "_un");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    // Actions in case pin was updated.
                }
            }
            catch(e)
            {
                errors++;
            }
        };
        var data = JSON.stringify(_json_obj);
        xhr.send(data);
    }
}