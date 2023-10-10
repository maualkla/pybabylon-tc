/* 
    JS functions for the apidocs.html and child pages files

*/
/* triggers for the buttons */
if(document.getElementById('_login_en')) document.getElementById('_login_en').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_login_es')) document.getElementById('_login_es').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_signup_en')) document.getElementById('_signup_en').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_signup_es')) document.getElementById('_signup_es').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_dashboard')) document.getElementById('_dashboard').addEventListener('click', function (){window.location.replace("/dashboard")});

/* buttons */
if(document.getElementById('_v001')) document.getElementById('_v001').addEventListener('click', function (){window.location.replace("/apidocs/v0-1")});
if(document.getElementById('_v002')) document.getElementById('_v002').addEventListener('click', function (){window.location.replace("/apidocs/v0-2")});