/* 
    JS functions for the home.html file.

*/
/* triggers for the buttons */

if(document.getElementById('_signup_en').length > 0) document.getElementById('_signup_en').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_signup_es').length > 0) document.getElementById('_signup_es').addEventListener('click', function (){window.location.replace("/signup")});
if(document.getElementById('_login_buttom').length > 0) document.getElementById('_login_buttom').addEventListener('click', function (){ s_login(); });


// Login function
function s_login(){
    cleanAlert();
    let username = document.getElementById('i_email').value;
    let password = document.getElementById('i_word').value;
    if(username.length > 0 && password.length > 0){
        let buff_usr = window.btoa(unescape(encodeURIComponent(username)))
        let buf_psw = window.btoa(unescape(encodeURIComponent(password)))
        document.cookie = '_u='+buff_usr+';';
        document.cookie = '_p='+buf_psw+';';
        window.location.replace("/s_login") 
    }else{
        document.getElementsByClassName('_main_block_alerts')[0].classList.add("_box_yellow");
        document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "<p> Missing username or password. </p>";
    }
}
