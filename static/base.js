/*
** base.js
## Front End Javascript styles for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@maualkla)
## Date: May 2023.
## Current Version: 0.02
## Last Modification Date: Aug 2023.
## More info at @intmau in twitter or in http://maualkla.com
## Description: Web app to serve adminde-tc project.
*/

// May day function 
console.log(" -> Welcome to the console, find jobs at http://maualkla.com/jobs ");
// Consts and Local vars
let _menu_value = true;
let _menu_ext_value = true;
let _curr_languaje = "_"+navigator.language.substring(0,2) || "_en";
let _new_lang = "_es";
let _errors = 0;
let _logging = false;

let _langs = ['_en', '_es'];
let _pinpad_num = "";
let _pinpad_num_alert = 0;
let _client_ip = getIp();
let _client_version = navigator.sayswho;

// Set initial languajes for the page.
setInitialLanguaje();

// Triggers.
// Burger toggle trigger
document.getElementById('burger-toggle').addEventListener('click', function (){
    regular(_menu_value);
});

// Extended menu trigger
document.getElementById('_menu_box_extender').addEventListener('click', function (){
    extended(_menu_ext_value);
});

// triggers for alerts
if(document.getElementsByClassName('_main_block_alerts').length > 0) document.getElementsByClassName('_main_block_alerts')[0].addEventListener('click', function (){ cleanAlert(); });

// triggers for the extended links
document.getElementById('_contac').addEventListener('click', function (){location.href = "https://www.twitter.com/intmau";});
document.getElementById('_legal').addEventListener('click', function (){window.location.replace("/legal")});
document.getElementById('_about').addEventListener('click', function (){window.location.replace("/about")});
document.getElementById('_jobs').addEventListener('click', function (){window.location.replace("/jobs")});
document.getElementById('_home').addEventListener('click', function (){window.location.replace("/")});
document.getElementById('_trans').addEventListener('click', function (){ changeLanguaje(_new_lang); });

// TBD Extra triggers
if(document.getElementById('_x_account')) document.getElementById('_x_account').addEventListener('click', function (){window.open('https://twitter.com/intmau', '_blank')});


// Functions
// Regular menu action
function regular(_temp){
    if(_temp){
        document.getElementsByClassName('_flex_box')[0].classList.add("_hidden");
        document.getElementsByClassName('_floating_buttons')[0].classList.add("_hidden");
        document.getElementsByClassName('_flex_menu')[0].classList.remove("_hidden");
        _menu_value = false;
    }else{
        document.getElementsByClassName('_flex_menu')[0].classList.add("_hidden");
        document.getElementsByClassName('_floating_buttons')[0].classList.remove("_hidden");
        document.getElementsByClassName('_flex_box')[0].classList.remove("_hidden");
        extended(false);
        _menu_value = true;
    }
}

// Extended menu action
function extended(_temp) {
    _box = document.getElementById('_menu_box_extender');
    if(_temp){
        _box.innerHTML = '<bold_italic>Hide Options </bold_italic>';
        _menu_ext_value = false;
    }else{
        _box.innerHTML = '<bold_italic>Show Options </bold_italic>';
        _menu_ext_value = true;
    }
    _boxes = document.getElementsByClassName('_box_altern')
    for (var i = 0; i < _boxes.length; i++){
        if (_menu_ext_value){
            _boxes.item(i).classList.add("_hidden")
        }else{
            _boxes.item(i).classList.remove("_hidden");
        }
    }
}


// Set initial languaje
function setInitialLanguaje(){
    for(var i = 0; i < _langs.length; i++){
        if(_langs[i] === _curr_languaje){
            _target_lang = document.getElementsByClassName(_langs[i]);
            for(var j = 0; j < _target_lang.length; j++){
                _target_lang[j].classList.remove("_hidden");
            }
        }
    }
}


// Change languajes function
function changeLanguaje(_languaje){
    for(var i = 0; i < _langs.length; i++){
        _curr = document.getElementsByClassName(_langs[i]);
        if(_languaje === _langs[i]){
            for(var j = 0; j < _curr.length; j++){
                _curr[j].classList.remove("_hidden");
            }
        }else{
            for(var j = 0; j < _curr.length; j++){
                _curr[j].classList.add("_hidden");
            }
        }
    }
    // To be deleted
    if(_new_lang === "_es"){
        _new_lang = "_en";
    }else{
        _new_lang = "_es";
    }
    extended(_menu_ext_value);
}

// Delele all cookies alert
function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    console.log("Delete all cookies");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function setAlert(_class, _text){
    document.getElementsByClassName('_main_block_alerts')[0].classList.add(_class);
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_hidden");
    document.getElementsByClassName('_main_block_alerts')[0].innerHTML = '<p> '+ _text +' </p>';
}

// Clean alert function
function cleanAlert(){
    console.log(" Entramos a clean alerts")
    document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "";
    document.getElementsByClassName('_main_block_alerts')[0].classList.add("_hidden");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_box_yellow");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_box_green");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_box_red");
    deleteAllCookies();
}

/// Pinpad functions and triggers 

// pinpad triggers
if(document.getElementById('_num_button_1')) document.getElementById('_num_button_1').addEventListener('click', function (){  _add_pinpad(1)  });
if(document.getElementById('_num_button_2')) document.getElementById('_num_button_2').addEventListener('click', function (){  _add_pinpad(2)  });
if(document.getElementById('_num_button_3')) document.getElementById('_num_button_3').addEventListener('click', function (){  _add_pinpad(3)  });
if(document.getElementById('_num_button_4')) document.getElementById('_num_button_4').addEventListener('click', function (){  _add_pinpad(4)  });
if(document.getElementById('_num_button_5')) document.getElementById('_num_button_5').addEventListener('click', function (){  _add_pinpad(5)  });
if(document.getElementById('_num_button_6')) document.getElementById('_num_button_6').addEventListener('click', function (){  _add_pinpad(6)  });
if(document.getElementById('_num_button_7')) document.getElementById('_num_button_7').addEventListener('click', function (){  _add_pinpad(7)  });
if(document.getElementById('_num_button_8')) document.getElementById('_num_button_8').addEventListener('click', function (){  _add_pinpad(8)  });
if(document.getElementById('_num_button_9')) document.getElementById('_num_button_9').addEventListener('click', function (){  _add_pinpad(9)  });
if(document.getElementById('_num_button_0')) document.getElementById('_num_button_0').addEventListener('click', function (){  _add_pinpad(0)  });
if(document.getElementById('_num_button_del')) document.getElementById('_num_button_del').addEventListener('click', function (){  _substract_pinpad()  });

// add pinpad num function
function _add_pinpad(_num){
    console.log(_pinpad_num.length)
    if(_pinpad_num.length < 6 && _pinpad_num.length > -1){
        _pinpad_num = _pinpad_num.toString() + _num.toString();
        console.log(_pinpad_num);
        _display_pinpad(_pinpad_num)
        if(_pinpad_num.length === 6){
            document.getElementById("_set_pin_button").classList.remove("_gray");
            document.getElementById("_set_pin_button").classList.add("color_2_bg");
            document.getElementById("_set_pin_button").classList.add("color_1_tx");
        }
    }else if(_pinpad_num.length === 6){
        if(_pinpad_num_alert === 0){
            window.alert("Pin has to be max 6 digits long.");
            _pinpad_num_alert++;
        }
    }else{
        _display_pinpad("Type Pin");
    }
}

// delete pinpad num function
function _substract_pinpad(){
    if(_pinpad_num.length > 0){
        _pinpad_num = _pinpad_num.substring(0, _pinpad_num.length - 1);
        document.getElementById("_set_pin_button").classList.add("_gray");
        document.getElementById("_set_pin_button").classList.remove("_altern");
        if(_pinpad_num.length === 0){
            _display_pinpad("Type Pin");
        }else{
            _display_pinpad(_pinpad_num)
        }
    }
    console.log(_pinpad_num)
}

// display pinpad
function _display_pinpad(_message){
    document.getElementsByClassName("_numpad_box")[0].innerHTML = "<p>" + _message + "</p>";
}

// change object color.
function _change_obj_color(document_object, current_bg_class, current_tx_class, new_bg_class, new_tx_class, border_optional = false){
    document_object.classList.remove(current_bg_class);
    document_object.classList.remove(current_tx_class);
    document_object.classList.add(new_bg_class);
    document_object.classList.add(new_tx_class);
    document_object.classList.add(border_optional);
}

// Function to get the client navigator version.
navigator.sayswho = (function(){
    var ua= navigator.userAgent;
    var tem; 
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        _client_version = 'IE '+(tem[1] || '');
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) {
            _client_version = tem.slice(1).join(' ').replace('OPR', 'Opera');
            return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    _client_version = M.join(' ');
    return M.join(' ');
})();

// function to get ip
function getIp(){
    let xhr = new XMLHttpRequest();
    let url = "https://api.ipify.org/?format=json";
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        try
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _client_ip =  JSON.parse(xhr.responseText)["ip"];
            }
        }
        catch(e)
        {
            errors++;
        }
    };
    xhr.send();
}

// function display wheel
function _display_wheel(_state){
    let _wheel = document.getElementsByClassName("_flex_centered")[0].classList;
    if (_state){
        _wheel.remove("_hidden");
    }else{
        _wheel.add("_hidden");
    }
}
