
// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();


// required view variables
let _view = 0;


/// triggers: 
if(document.getElementById('_input_pass')) document.getElementById('_input_pass').addEventListener('click', function (){ if(_view === 0) { _ws_users_update_display_passview(true); } });
// floating buttons 
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    if(_view === 0) { 
        // something here 
    } else if(_view === 1){
        // something else here
    }
});
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ 
    if(_view === 0) { 
        // something here 
    } else if(_view === 1){
        _ws_users_update_display_passview(false);
    }
});


/* JS functions specific for the switch function */

const toggleSwitch = document.getElementById("switch");
const toggleStatus = document.getElementById("switch-status");

function onCheckboxToggle() {
  const isChecked = this.hasAttribute("checked");

  /* 1. Update toggle switch visual state. */
  this.toggleAttribute("checked");

  /* 2. Update toggle switch status text. */
  toggleStatus.innerText = isChecked ? "Regular User" : " Admin User";
}

toggleSwitch.addEventListener("change", onCheckboxToggle);
/* end of switch function */


// display pass view
const _ws_users_update_display_passview = ( action ) => {
    if (action){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content_pwd")[0].classList.remove("_hidden");
        _view = 1;
    }else{
        document.getElementsByClassName("_main_block_content_pwd")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
        _view = 0;
    }
}