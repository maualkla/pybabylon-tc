/*
** base.js
## Front End Javascript styles for adminde-tc project.
## Pybabylon Project.
## Coded by: Mauricio Alcala (@maualkla)
## Date: May 2023.
## Current Version: 0.04
## Last Modification Date: Aug 2023.
## More info at @intmau in twitter or in http://maualkla.com
## Description: Web app to serve adminde-tc project.
*/

// May day function 
console.log(" -> Welcome to the console, find jobs at http://maualkla.com/jobs ");
// adjust the height of the main_block object.
document.getElementsByClassName("_main_block")[0].style.height = window.screen.height - 20;

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
document.getElementById('_legal').addEventListener('click', function (){_redirect("legal");});
document.getElementById('_about').addEventListener('click', function (){_redirect("about");});
document.getElementById('_jobs').addEventListener('click', function (){_redirect("jobs");});
document.getElementById('_home').addEventListener('click', function (){_redirect("");});
document.getElementById('_trans').addEventListener('click', function (){ changeLanguaje(_new_lang); });

// TBD Extra triggers
if(document.getElementById('_x_account')) document.getElementById('_x_account').addEventListener('click', function (){window.open('https://twitter.com/intmau', '_blank')});


// Functions
// Regular menu action


function regular(_temp){
    common_regular(_temp);
}

// new version
const common_regular = (_temp) => {
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
    common_extended(_temp);
}
// new version
const common_extended = (_temp) =>{
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
    common_set_initial_languaje();
}
const common_set_initial_languaje = () => {
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
    common_change_languaje();
}
const common_change_languaje = () => {
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
function DeleteAllCookies(){
    _common_delete_all_cookies();
}
const _common_delete_all_cookies = () => {
    const cookies = document.cookie.split(";");
    if (_logging) console.log("Delete all cookies");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/// set altert common utility
function setAlert(_class, _text){
    common_set_alert(_class, _text)
}
const common_set_alert = (_class, _text) =>{ 
    document.getElementsByClassName('_main_block_alerts')[0].classList.add(_class);
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_hidden");
    document.getElementsByClassName('_main_block_alerts')[0].innerHTML = '<p> '+ _text +' </p>';
}

// Clean alert function
function cleanAlert(){
    common_clean_alert();
}
const common_clean_alert = () =>{
    if (_logging) console.log(" Entramos a clean alerts")
    document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "";
    document.getElementsByClassName('_main_block_alerts')[0].classList.add("_hidden");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_box_yellow");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_box_green");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_box_red");
    //deleteAllCookies();
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
    common_add_pinpad(_num);
}
const common_add_pinpad = (_num) => {
    if (_logging) console.log(_pinpad_num.length)
    if(_pinpad_num.length < 6 && _pinpad_num.length > -1){
        _pinpad_num = _pinpad_num.toString() + _num.toString();
        if (_logging) console.log(_pinpad_num);
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
    common_substract_pinpad();
}
const common_substract_pinpad = () =>{
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
    if (_logging) console.log(_pinpad_num)
}

// display pinpad
function _display_pinpad(_message){
    common_display_pinpad(_message);
}
const common_display_pinpad = (_message) => {
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
    common_get_ip();
}
const common_get_ip = () => {
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
    common_display_wheel(_state);
}
const common_display_wheel = (_state) => {
    let _wheel = document.getElementsByClassName("_flex_centered")[0].classList;
    if (_state){
        _wheel.remove("_hidden");
    }else{
        _wheel.add("_hidden");
    }
}

// function to redirect to another location. 
const _redirect = (target, version = false) => {
    common_redirect(target, version);
}
const common_redirect = (target, version = fase) => {
    _display_wheel(true);
    if (version == 3){
        window.location.replace(window.location.href+target);
    } else if (version){
        window.location.replace(window.location.origin+target);
        if(_logging){
            console.log("redirect")
            console.log(window.location.origin+target)
        }
    }else{
        window.location.replace("/"+target);
    }
}

// show/hide floating buttons
const _display_fbuttons = (_state) => {
    common_display_floating_buttons(_state);
}
const common_display_floating_buttons = (_state) => {
    let _fb = document.getElementsByClassName("_floating_buttons")[0]
    if(_state){
        _fb.classList.remove("_hidden")
    }else{
        _fb.classList.add("_hidden")
    }
}

// common floating buttons custom 
// expects 2 arrays ['text1', 'text2', ''], [true, true, false]
// it will replace the values on the 3 buttons and if the flag is true
// will remove the hidden class to be displayed.
const _common_fbuttons_change_display_text = (_values = false, _displayed = false) => {
    if(_values && _displayed){
        for (let i = 1; i<4 ; i++){
            let x = document.getElementById("_fb_"+i);
            if (_values[i-1]) x.innerHTML = '<p class="'+_curr_languaje+'"><bold>'+_values[i-1]+'</bold></p>';
            if (_displayed[i-1]) x.classList.remove("_hidden"); else x.classList.add("_hidden");
        }
    }
};

// function validate value hex
const validateHex = (_value) => {
    common_validate_hex(_value);
}
const common_validate_hex = (_value) => {
    let regex = new RegExp(/^#([A-Fa-f0-9]{6})$/);
    if (_value == null) {
        return "false";
    }
    return (regex.test(_value) == true) ? true : false;
}


/* SYSTEM color change */
// color = 1,2,3
// value = HEX color value
const _change_system_colors = (_color, _value) => {
    common_change_system_colors(_color, _value);
}
const common_change_system_colors = (_color, _value) => {
    if (validateHex(_value)){
        let _root = document.querySelector(':root');
        if (_color == 1){
            _root.style.setProperty('--system-bg-color', _value);
        }else if (_color == 2){
            _root.style.setProperty('--system-text-color', _value);
        }else if (_color == 3){
            _root.style.setProperty('--system-altern-color', _value);
        }
    }
}

// SYSTEM tittle change
const _change_system_title = (_title) => {
    common_change_system_title(_title);
}
const common_change_system_title = (_title) => {
    if(_tittle.length > 0){
        let _nt = (_tittle.length > 17) ? _tittle.substring(0,17)+".." : _tittle;
        document.getElementsByClassName("_title")[0].innerHTML = "<bold_italic>"+_nt+"</bold_italic>";
    }else{
        document.getElementsByClassName("_title")[0].innerHTML = "<bold_italic>Adminde Time Card</bold_italic>";
    }
    
}

// Color picker functions 
// function change color picker value.
const changeColorPickerValue = (_value, _id, _num) => {
    common_change_color_picker_value(_value, _id, _num);
}
const common_change_color_picker_value = (_value, _id, _num) => {
    if (validateHex(_value)){  
        document.getElementById(_id).value = _value;
        _change_system_colors(_num.substring(_num.length -1), _value);
    }else{
        document.getElementById(_id+"_tx").value = "";
    }
}

// function change color text value
const changeColorTextValue = (_value, _id, _num) => {
    common_change_color_text_value(_value, _id, _num);
}
const common_change_color_text_value = (_value, _id, _num) => {
    _change_system_colors(_num.substring(_num.length -1), _value);
    document.getElementById(_id).value = _value;
}

//  system auto change color 
const _common_system_auto_change_color = () => {
    if(_context_vars[2] && _context_vars[3] && _context_vars[4]) {
        _change_system_colors(1, _context_vars[2]);
        _change_system_colors(2, _context_vars[3]);
        _change_system_colors(3, _context_vars[4]);
    }
}

// Screen Size: 
const _desktop_view =  () => {
    common_desktop_view();
}
const common_desktop_view = () => {
    if (window.screen.width >= 1024 && window.screen.height >= 768) {
        _redirect('desktop');
    }
}

// common reload page
/// call it with no params
const _common_reload_page = (href = location.href) => {
    location.replace(href);
}

/// common get cookie value
// this function allows to get a cookie value 
// invoke like: let myCookieValue = _common_get_cookie_value('cookie_name');
const _common_get_cookie_value = (name) => {
    const value = `; ${document.cookie}`; // Add semicolon at start
    const parts = value.split(`; ${name}=`); // Split by cookie name
    if (parts.length === 2) return parts.pop().split(';').shift(); // Extract value
}

//// Validations
//// functions for data validations

/// validations for password format.
const _common_password_validation = (_pass, _copy_pass) => {
    /*const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/; //P@ssw0rd!234
    if(_pass == _copy_pass){
        return re.test(_pass);
    }else{
        return false
    }*/
    return (_pass == _copy_pass && _pass.length >= 10) ? true : false ; 
}

/// validations of email string
const _common_email_string_validation = (_email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // john.doe123@example.com
    return re.test(_email);
}

/// Validation of phone number
const _common_number_validation = (_phone_num) => {
    const re = /^\d{10}$/;
    return re.test(_phone_num);
}

/// Validation of the date format   
const _common_date_validation = (_date) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/; //dd.mm.yyyy
    return regex.test(_date);
}

/// Validation of postal code
const _common_postal_code_validation = (_postal_code, _country_code) => {
    let regex = null;
    switch (_country_code) {
        case "US": 
            regex = /^[0-9]{5}(?:-[0-9]{4})?$/;  // Basic US postal code
            break;
        case "MX":
            regex = /^[0-9]{5}$/;  // Basic Mexican postal code
            break;
        case "DE":
            regex = /^[0-9]{5}$/;  // Basic German postal code
            break;  
        default: 
            return false; // No validation if the country is not supported
    }
    return regex.test(_postal_code);
}

// js function redirect if desktop view
common_desktop_view();


// Dictionaries
// Errors dictionary
let _common_dictionary_errors = {}
_common_dictionary_errors['_en'] = {
    "001": "Passwords do not match or is invalid. It must be at least 10 characteres",
    "002": "Invalid Name, If must have more than 3 characters",
    "003": "Invalid Username, must have more thatn 3 and less than 20 characters",
    "004": "Invalid Email",
    "005": "Invalid Birthday Date (DD.MM.YYYY)",
    "006": "Invalid Postal Code",
    "007": "Invalid Phone Number",
    "008": "Invalid Tax Id",
    "009": "Invalid Legal Name",
    "010": "Invalid Short Code, must have more than 3 and less than 7 characters.",
    "011": "Invalid Country, State, City or Address Line, Please fill all the values",
    "012": "Invalid Full Name value. Must have 3 or more characters.",
    "013": "Unexpected error, try later."
}
_common_dictionary_errors['_es'] = {
    "001": "Contraseña no coincide o es invalida",
    "002": "Nombre Invalido, Debe ser mayor de 3 caracteres",
    "003": "Username invalido, debe tener mas de 3 y menos de 20 caracteres",
    "004": "Email invalido",
    "005": "Cumpleaños invalido, formato (DD.MM.AAAAecto",
    "007": "Numero de telefono incorr)",
    "006": "Correo postal incorrecto",
    "008": "Codigo de impuestos invalido",
    "009": "Nombre legal invalido",
    "010": "Nombre corto invalido, debe tener mas de 3 y menos de 7 caracteres",
    "011": "Pais, Estado, Ciudad o Direccion invalidas. Llena todos los campos",
    "012": "Nombre completo invalido. Debe tener mas de 3 caracteres.",
    "013": "Error innesperado, Intenta mas tarde."
}