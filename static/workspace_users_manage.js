//
//  JS for workspace_users_manage
//

// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();


/* local functions */
const _view_tenant_user = (tax_id, id) => {
    _display_wheel(true)
    _redirect("workspace/"+tax_id+"/users/"+id);
}