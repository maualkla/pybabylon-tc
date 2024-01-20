/* 
    JS functions for the transactions.html file.
*/
// System vars

// initial triggers
_display_fbuttons(true);

// Service buttons
if(document.getElementById('_dash_en')) document.getElementById('_dash_en').addEventListener('click', function (){window.location.replace("/dashboard")});
if(document.getElementById('_dash_es')) document.getElementById('_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });

// mainblock buttons
if(document.getElementById('_next_button')) document.getElementById('_next_button').addEventListener('click', function (){ _display_search(true); });
if(document.getElementById('_create_button')) document.getElementById('_create_button').addEventListener('click', function (){ _refresh_list(); });

// search buttons
if(document.getElementById('_next_button_2')) document.getElementById('_next_button_2').addEventListener('click', function (){ _refresh_list();});
if(document.getElementById('_create_button_2')) document.getElementById('_create_button_2').addEventListener('click', function (){ _display_search(false); });

// functions
function _display_search(_show){
    if(_show){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_search")[0].classList.remove("_hidden");
    }else{
        document.getElementsByClassName("_main_block_search")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
    }
}

// function
function _refresh_list(){
    window.location.reload();
}

// function delete user
function _delete_user(_user){
    // code to be written
}