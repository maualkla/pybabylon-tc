//
//  JS for workspace_users_manage
//


// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();

/// triggers
if(document.getElementById('_back_ws_en')) document.getElementById('_back_ws_en').addEventListener('click', function (){ _ws_users_update_back_to_overview(); });
if(document.getElementById('_back_ws_es')) document.getElementById('_back_ws_es').addEventListener('click', function (){ _ws_users_update_back_to_overview(); });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout"); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout"); });
if(document.getElementById('_input_pass')) document.getElementById('_input_pass').addEventListener('click', function (){ if(_view === 0) { _ws_users_update_display_passview(true); } });

// floating buttons 
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    _ws_users_update_redirect_to_new_user();
});
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ 
    
});


/* local functions */
const _view_tenant_user = (tax_id, id) => {
    _display_wheel(true);
    _redirect("workspace/"+tax_id+"/users/"+id);
}

/// back to workspace view
const _ws_users_update_back_to_overview = () => {
    _display_wheel(true);
    let x = window.location.pathname;
    x = x.substr(0, x.indexOf('/users'));
    _redirect(x, 1);
}

/// go to new tuser view
const _ws_users_update_redirect_to_new_user = () => {
    _display_wheel(true);
    let x = window.location.pathname;
    x = x.substr(0, x.indexOf('/users'));
    _redirect(x+'/users/new', 1);
}
