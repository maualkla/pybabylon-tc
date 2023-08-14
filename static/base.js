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

let _langs = ['_en', '_es'];

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
if(document.getElementsByClassName('_main_block_alerts')) document.getElementsByClassName('_main_block_alerts')[0].addEventListener('click', function (){ cleanAlert(); });

// triggers for the extended links
document.getElementById('_contac').addEventListener('click', function (){location.href = "https://www.twitter.com/intmau";});
document.getElementById('_legal').addEventListener('click', function (){window.location.replace("/legal")});
document.getElementById('_about').addEventListener('click', function (){window.location.replace("/about")});
document.getElementById('_jobs').addEventListener('click', function (){window.location.replace("/jobs")});
document.getElementById('_home').addEventListener('click', function (){window.location.replace("/")});
document.getElementById('_trans').addEventListener('click', function (){ changeLanguaje(_new_lang); });


// Functions
// Regular menu action
function regular(_temp){
    if(_temp){
        document.getElementsByClassName('_flex_box')[0].classList.add("_hidden");
        document.getElementsByClassName('_flex_menu')[0].classList.remove("_hidden");
        _menu_value = false;
    }else{
        document.getElementsByClassName('_flex_menu')[0].classList.add("_hidden");
        document.getElementsByClassName('_flex_box')[0].classList.remove("_hidden");
        extended(false);
        _menu_value = true;
    }
}

// Extended menu action
function extended(_temp) {
    _box = document.getElementById('_menu_box_extender');
    if(_temp){
        _box.innerHTML = 'Less..';
        _menu_ext_value = false;
    }else{
        _box.innerHTML = 'More..';
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