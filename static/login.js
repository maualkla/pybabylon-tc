/* 
    JS functions for the home.html file.

*/
/* triggers for the buttons */

if(document.getElementById('_signup_en')) document.getElementById('_signup_en').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_signup_es')) document.getElementById('_signup_es').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_login_buttom')) document.getElementById('_login_buttom').addEventListener('click', function (){ _change_obj_color(document.getElementById('_login_buttom'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx", "color_2_border"); login_worker(); });


// Login function
function login_worker(){
    cleanAlert();
    let username = document.getElementById('i_email').value;
    let password = document.getElementById('i_word').value;
    if(username.length > 0 && password.length > 0){
        let _req_string = window.btoa(unescape(encodeURIComponent(username)))+'_'+window.btoa(unescape(encodeURIComponent(password)));
        getIp(); 
        // call /v1/admdata POST /session

        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata";
        let payload = {
            "requestString": _req_string,
            "client": {
                "ip": _client_ip,
                "browser": _client_version
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    //console.log(" response ok ");
                    console.log(JSON.parse(xhr.responseText));
                    let _console = document.getElementsByClassName('_console')[0];
                    _console.innerHTML = "<p>"+"Browser Version: " + clientVersion + "</p>";
                    _console.innerHTML += "<p>"+"IP: " + JSON.parse(xhr.responseText)['ip'] + "</p>";
                    _console.innerHTML += "<p>"+"Coordinates: " + JSON.parse(xhr.responseText)['loc'] + "</p>";
                    _console.innerHTML += "<p>"+"Country Code: " + JSON.parse(xhr.responseText)['country'] + "</p>";
                    _console.innerHTML += "<p>"+"City: " + JSON.parse(xhr.responseText)['city'] + "</p>";
                    _console.innerHTML += "<p>"+"Postal Code: " + JSON.parse(xhr.responseText)['postal'] + "</p>";
                    _console.innerHTML += "<p>"+"Time Zone: " + JSON.parse(xhr.responseText)['timezone'] + "</p>";
                }else{
                    //console.log("loading...");
                }
            }
            catch(e)
            {
                errors++;
            }
        };
        xhr.send(JSON.stringify(payload));

        _obj = 
        //window.location.replace("/s_login") 
        // Actions
    }else{
        document.getElementsByClassName('_main_block_alerts')[0].classList.add("_box_yellow");
        document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "<p> Missing username or password. </p>";
    }
}
