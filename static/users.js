/* 
    JS functions for the transactions.html file.
*/
// System vars
_stage = 0;

// initial triggers
_display_fbuttons(true);

// Service buttons
if(document.getElementById('_dash_en')) document.getElementById('_dash_en').addEventListener('click', function (){window.location.replace("/dashboard")});
if(document.getElementById('_dash_es')) document.getElementById('_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });

// mainblock buttons
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    if(_stage == 0){
        _stage = 1;
        _common_fbuttons_change_display_text(["Search", "", "Cancel"], [true, false, true]);
        _display_search(true);
    }else if(_stage == 1){
        // search action
    }
});
if(document.getElementById('_fb_3')) document.getElementById('_fb_3').addEventListener('click', function (){ 
    if(_stage == 0){
        // refresh action
    }else if(_stage == 1){
        _stage = 0;
        _common_fbuttons_change_display_text(["Search", "", "Refresh"], [true, false, true]);
        _display_search(false);
    }
});

// search buttons

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