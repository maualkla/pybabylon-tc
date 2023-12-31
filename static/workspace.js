/* 

    JS functionalities for Workspace overview page 

*/

/* Triggers */
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ _redirect("dashboard"); });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ _redirect("dashboard"); });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout"); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout"); });

/* redirects */
if(document.getElementById("_create_ws")) document.getElementById("_create_ws").addEventListener("click", function (){ _redirect("workspace/new");});
if(document.getElementById("_no_workspaces")) document.getElementById("_no_workspaces").addEventListener("click", function (){ _redirect("workspace/new");});

/* local functions */
const _view_workspace = (id) => {
    _redirect("workspace/"+id);
}