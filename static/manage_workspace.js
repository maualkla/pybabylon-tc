/* 
    JS functions for the manage_workspace.html file.
*/

// params
let _window = 0;

// initialization of the floating buttons
_display_fbuttons(true);
if(_context_vars[2] && _context_vars[3] && _context_vars[4]) {
    _change_system_colors(1, _context_vars[2]);
    _change_system_colors(2, _context_vars[3]);
    _change_system_colors(3, _context_vars[4]);
}

// triggers for options
if(document.getElementById("_basic_view_box")) document.getElementById("_basic_view_box").addEventListener('click', function(){ 
    _window = 1; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_1"); 
}); 
if(document.getElementById("_address_view_box")) document.getElementById("_address_view_box").addEventListener('click', function(){ 
    _window = 2; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_2"); 
}); 
if(document.getElementById("_contact_view_box")) document.getElementById("_contact_view_box").addEventListener('click', function(){ 
    _window = 3; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_3"); 
}); 
if(document.getElementById("_personalization_view_box")) document.getElementById("_personalization_view_box").addEventListener('click', function(){ 
    _window = 4; 
    _cust_butt_data(1);
    _ws_manage_change_view("_ws_0", "_ws_4"); 
}); 

// fbutton actions
// fb 1
if(document.getElementById("_fb_1")) document.getElementById("_fb_1").addEventListener('click', function(){
    switch (_window){
        case 0:

            break;
        case 1: 
            break;
        case 2: 
            break;
        case 3: 
            break; 
        case 4: 
            break; 
    }
});
// fb 2
if(document.getElementById("_fb_2")) document.getElementById("_fb_2").addEventListener('click', function(){
    switch (_window){
        case 0:
            
            break;
        case 1: 
            break;
        case 2: 
            break;
        case 3: 
            break; 
        case 4: 
            break; 
    }
});
// fb 3
if(document.getElementById("_fb_3")) document.getElementById("_fb_3").addEventListener('click', function(){
    switch (_window){
        case 0:
            break;
        case 1: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            break;
        case 2: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            break;
        case 3: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            break; 
        case 4: 
            _cust_butt_data(2);
            _ws_manage_change_view("_ws_"+_window, "_ws_0");
            break; 
    }
});

// triggers for flex menu
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ _redirect("workspace") });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ _redirect("workspace") });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout") });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout") });

/// custom view change function
const _ws_manage_change_view = (_hide = false, _show = false) => {
    if (_hide && _show){
        document.getElementById(_hide).classList.add("_hidden");
        document.getElementById(_show).classList.remove("_hidden");
    }
}

/// custom save changes and cancel buttons 
const _cust_butt_data = (_case = false) => {
    if(_case == 1){
        _values = ["Save Changes", false, "Cancel"], _disp = [true, false, true];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
    if(_case == 2){
        _values = ["Add Users", "Delete Workspace", "Workspace Live"], _disp = [true, true, true];
        _common_fbuttons_change_display_text(_values,_disp); 
    }
}
