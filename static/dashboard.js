/* 
    JS functions for the dashboard.html file.
*/

// Triggers 
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_manage_ws_en')) document.getElementById('_manage_ws_en').addEventListener('click', function (){window.alert("No workspaces found")});
if(document.getElementById('_manage_ws_es')) document.getElementById('_manage_ws_es').addEventListener('click', function (){ window.alert("No hay Workspaces en tu perfil") });

// Boxes triggers
if(document.getElementById('_opt_new_ws')) document.getElementById('_opt_new_ws').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_opt_manage_ws')) document.getElementById('_opt_manage_ws').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_opt_help')) document.getElementById('_opt_help').addEventListener('click', function (){ window.open('/help', '_blank') });
