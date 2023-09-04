/* 
    JS functions for the dashboard.html file.
*/

// Triggers 
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });
if(document.getElementById('_manage_ws_en')) document.getElementById('_manage_ws_en').addEventListener('click', function (){window.alert("No workspaces found")});
if(document.getElementById('_manage_ws_es')) document.getElementById('_manage_ws_es').addEventListener('click', function (){ window.alert("No hay Workspaces en tu perfil") });
if(document.getElementById('_profile_en')) document.getElementById('_profile_en').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_profile_es')) document.getElementById('_profile_es').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_create_ws_en')) document.getElementById('_create_ws_en').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_create_ws_es')) document.getElementById('_create_ws_es').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_help_en')) document.getElementById('_help_en').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_help_es')) document.getElementById('_help_es').addEventListener('click', function (){ window.open('/help', '_blank') });

// Boxes triggers
if(document.getElementById('_opt_new_ws')) document.getElementById('_opt_new_ws').addEventListener('click', function (){window.location.replace("/workspace")});
if(document.getElementById('_opt_manage_ws')) document.getElementById('_opt_manage_ws').addEventListener('click', function (){window.location.replace("/account")});
if(document.getElementById('_opt_help')) document.getElementById('_opt_help').addEventListener('click', function (){ window.open('/help', '_blank') });
if(document.getElementById('_opt_tuto')) document.getElementById('_opt_tuto').addEventListener('click', function (){  window.alert("No tutorials found, Try later again.")  });