/* 
    JS functions for the dashboard.html file.
*/
// System vars


// Triggers 
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_manage_ws_en')) document.getElementById('_manage_ws_en').addEventListener('click', function (){window.alert("No workspaces found")});
if(document.getElementById('_manage_ws_es')) document.getElementById('_manage_ws_es').addEventListener('click', function (){ window.alert("No hay Workspaces en tu perfil") });
if(document.getElementById('_profile_en')) document.getElementById('_profile_en').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_profile_es')) document.getElementById('_profile_es').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_create_ws_en')) document.getElementById('_create_ws_en').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_create_ws_es')) document.getElementById('_create_ws_es').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_help_en')) document.getElementById('_help_en').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_help_es')) document.getElementById('_help_es').addEventListener('click', function (){ window.open('/help', '_blank') });

// Boxes triggers
if(document.getElementById('_opt_new_ws')) document.getElementById('_opt_new_ws').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_opt_manage_ws')) document.getElementById('_opt_manage_ws').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_opt_help')) document.getElementById('_opt_help').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_opt_tuto')) document.getElementById('_opt_tuto').addEventListener('click', function (){  window.alert("No tutorials found, Try later again.")  });

if(document.getElementById('_set_pin_button')) document.getElementById('_set_pin_button').addEventListener('click', function (){  if(_pinpad_num.length === 6){ _send_pin() }else{window.alert("Pin has to be at least 6 digits long.")} });
if(document.getElementById('_close_sesion_button')) document.getElementById('_close_sesion_button').addEventListener('click', function (){ window.location.replace("/logout"); });


// send pin function
function _send_pin(){
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
    }
    console.log(" Saving pin: "+_pinpad_num)
}