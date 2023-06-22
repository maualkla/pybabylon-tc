// JS Working


// Get URL object.
const currURL = window.location.href
const ObjURL = new URL(currURL);
const path = ObjURL.pathname;
var _stage = 1;


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
    console.log("stage in: "+_stage)
    document.getElementById('b_signup').addEventListener('click', function (){
        if(_stage === 1){
            document.getElementById('form_stage_1').style.display = "none";
            document.getElementById('form_stage_2').style.display = "block";
            document.getElementById('form_stage_3').style.display = "none";
            _stage = 2;
            document.getElementById('b_back').disabled = false;
        }else if(_stage === 2){
            console.log(document.getElementById('plan_radio_1'))
            console.log(document.getElementById('plan_radio_1').checked)
            if(document.getElementById('plan_radio_1').checked){
                document.getElementById('form_stage_1').style.display = "none";
                document.getElementById('form_stage_2').style.display = "none";
                document.getElementById('form_stage_3').style.display = "block";
                document.getElementById('b_signup').value = 'Create User';
                _stage = 3;
            }else{
                window.alert(" Choose a plan. ");
            }
        } else if(_stage === 3){
            _redirect_to_signup(); 
        }   
        console.log(" Stage out: "+_stage)    
    });
    document.getElementById('b_back').addEventListener('click', function (){
        if(_stage === 2){
            document.getElementById('form_stage_1').style.display = "block";
            document.getElementById('form_stage_2').style.display = "none";
            document.getElementById('form_stage_3').style.display = "none";
            document.getElementById('b_back').disabled = true;
            _stage = 1;
        }else if(_stage === 3){
            document.getElementById('form_stage_1').style.display = "none";
            document.getElementById('form_stage_2').style.display = "block";
            document.getElementById('form_stage_3').style.display = "none";
            document.getElementById('b_signup').value = 'Next';
            _stage = 2;
        } 
        console.log(" Stage out: "+_stage)    
    });
    document.getElementById('b_login_signup_w').addEventListener('click', function (){
        console.log("Js is working fine");
        window.location.replace("/login")
    });

    document.getElementById('plan_button_1').addEventListener('click', function (){
        console.log(" Checked value changed ");
        document.getElementById('plan_radio_1').checked = true;
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

function _redirect_to_signup(){
    if (document.getElementById('s_terms').checked){
        let _un = document.getElementById('s_username').value;
        let _pw = document.getElementById('s_pass').value;
        _pw = window.btoa(unescape(encodeURIComponent(_pw)))
        let _bd = "11111994_hc";//document.getElementById('s_bday').value;
        let _em = document.getElementById('s_email').value;
        let _fn = document.getElementById('s_fname').value;
        let _po = "121212121_hc";//document.getElementById('s_phone').value;
        let _pn = "2411_hc";//document.getElementById('s_pin').value;
        let _pc = "20250_hc";//document.getElementById('s_postalCode').value;
        console.log(document.getElementById('s_terms'))
        console.log(document.getElementById('s_terms').checked)
        let _tr = document.getElementById('s_terms').checked;
        let _ty = "1_hc";//document.getElementById('s_type').value;
        let _pl = (document.getElementById('plan_radio_1').checked === true ? 1: 0);
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
        document.cookie = '_pl='+_pl+';'; 
        window.location.replace("/s_signup") 
    }
    else{
        window.alert(" Accept terms and conditions. ");
    }
}