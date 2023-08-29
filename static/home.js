/* 
    JS functions for the home.html file.

*/
/* triggers for the buttons */
if(document.getElementById('_dashboard').length > 0) document.getElementById('_dashboard').addEventListener('click', function (){window.location.replace("/dashboard")});
if(document.getElementById('_login_en').length > 0) document.getElementById('_login_en').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_signup_en').length > 0) document.getElementById('_signup_en').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_login_es').length > 0) document.getElementById('_login_es').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_signup_es').length > 0) document.getElementById('_signup_es').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_signup_button').length > 0) document.getElementById('_signup_button').addEventListener('click', function (){window.location.replace("/signup")});