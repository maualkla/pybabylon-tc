/* 
    JS functions for the home.html file.

*/
/* triggers for the buttons */
if(document.getElementById('_dashboard')) document.getElementById('_dashboard').addEventListener('click', function (){window.location.replace("/dashboard")});
if(document.getElementById('_login_en')) document.getElementById('_login_en').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_signup_en')) document.getElementById('_signup_en').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_login_es')) document.getElementById('_login_es').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_signup_es')) document.getElementById('_signup_es').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_signup_button')) document.getElementById('_signup_button').addEventListener('click', function (){console.log("holaaaaaa");_change_obj_color(document.getElementById('_signup_button'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx", "color_2_border"); window.location.replace("/signup");});

if(document.getElementById('_mbb_text')) document.getElementById('_mbb_text').addEventListener('click', function (){ window.open('/help', '_blank') });