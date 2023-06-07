// JS Working


// Get URL object.
const currURL = window.location.href
const ObjURL = new URL(currURL);
const path = ObjURL.pathname;


if(path === '/login')
{
    console.log(" JS Working fine");
    // listener for the login button to confirm JS funcitons
    document.getElementById('b_login').addEventListener('click', function (){
        console.log("Login JS Function")
        username = document.getElementById('i_email').value;
        password = document.getElementById('i_word').value;
        console.log('_u = '+username+'; _p = '+password)
        document.cookie = '_u='+username+';';
        document.cookie = '_p='+password+';';
        window.location.replace("/s_login")
    });

}if(path === "/" || path === null) {
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
    });
} else {
    console.log(" JS Working fine");
}