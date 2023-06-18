// JS Working


// Get URL object.
const currURL = window.location.href
const ObjURL = new URL(currURL);
const path = ObjURL.pathname;


if(path === '/login')
{
    console.log(getCookies());
    //window.alert(JSON.stringify(getCookies()));
    console.log(" JS Working fine");
    // listener for the login button to confirm JS funcitons
    document.getElementById('b_login').addEventListener('click', function (){
        console.log("Login JS Function")
        let username = document.getElementById('i_email').value;
        let password = document.getElementById('i_word').value;
        let buf_psw = window.btoa(unescape(encodeURIComponent(password)))
        console.log('_u = '+username+'; _p = '+buf_psw+'; _dec: '+password)
        document.cookie = '_u='+username+';';
        document.cookie = '_p='+buf_psw+';';
        window.location.replace("/s_login") 
    });
    document.getElementById('b_register_login_w').addEventListener('click', function (){
        console.log("Js is working fine");
        window.location.replace("/signup")
    });
    document.getElementById('b_register_login_m').addEventListener('click', function (){
        console.log("Js is working fine");
        window.location.replace("/signup")
    });

}if(path === "/" || path === null) {
    console.log(getCookies());
    // listener for the login button to confirm JS funcitons
    document.getElementById('B_Login').addEventListener('click', function (){
        console.log("Login btton activated")
        window.location.replace("/login")
    });
    // listener for the login button to confirm JS funcitons
    document.getElementById('M_Login').addEventListener('click', function (){
        console.log("Login btton activated")
        window.location.replace("/login")
    });

    // listener for the login button to confirm JS funcitons
    document.getElementById('B_Register').addEventListener('click', function (){
        console.log("Js is working fine");
        window.location.replace("/signup")
    });
}if(path === '/signup')
{
    console.log(getCookies())
    //alert(JSON.stringify(getCookies()))
    console.log('JS working fine')
    document.getElementById('b_signup').addEventListener('click', function (){
        console.log("Signup JS Function")
        let _un = document.getElementById('s_username').value;
        let _pw = document.getElementById('s_pass').value;
        _pw = window.btoa(unescape(encodeURIComponent(_pw)))
        let _bd = document.getElementById('s_bday').value;
        let _em = document.getElementById('s_email').value;
        let _fn = document.getElementById('s_fname').value;
        let _po = document.getElementById('s_phone').value;
        let _pn = document.getElementById('s_pin').value;
        let _pc = document.getElementById('s_postalCode').value;
        console.log(document.getElementById('s_terms').checked)
        let _tr = document.getElementById('s_terms').checked;
        if(_tr === 1){
            _tr = true
        }else{
            _tr = false
        }
        let _ty = document.getElementById('s_type').value;
        document.cookie = '_un='+_un+';';
        document.cookie = '_pw='+_pw+';';
        document.cookie = '_em='+_em+';';
        document.cookie = '_bd='+_bd+';';
        document.cookie = '_fn='+_fn+';';
        document.cookie = '_po='+_po+';';
        document.cookie = '_pn='+_pn+';';
        document.cookie = '_pc='+_pc+';';
        document.cookie = '_tr='+_tr+';';
        document.cookie = '_ty='+_ty+';';
        window.location.replace("/s_signup") 
    });
    /*
    console.log(getCookies());
    window.alert(JSON.stringify(getCookies()));
    console.log(" JS Working fine");
    // listener for the login button to confirm JS funcitons
    document.getElementById('b_login').addEventListener('click', function (){
        console.log("Login JS Function")
        let username = document.getElementById('i_email').value;
        let password = document.getElementById('i_word').value;
        let buf_psw = window.btoa(unescape(encodeURIComponent(password)))
        console.log('_u = '+username+'; _p = '+buf_psw+'; _dec: '+password)
        document.cookie = '_u='+username+';';
        document.cookie = '_p='+buf_psw+';';
        window.location.replace("/s_login") 
    });
    */

} else {
    console.log(getCookies());
    console.log(" JS Working fine");
}

// Const to get ans show all cookies.
function getCookies(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }