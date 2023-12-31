/* 

    JS functionalities for Workspace overview page 

*/

/* Triggers */
if(document.getElementById('_back_dash_en')) document.getElementById('_back_dash_en').addEventListener('click', function (){ _redirect("dashboard"); });
if(document.getElementById('_back_dash_es')) document.getElementById('_back_dash_es').addEventListener('click', function (){ _redirect("dashboard"); });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout"); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout"); });
