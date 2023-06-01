// JS Working


// Get URL object.
const currURL = window.location.href
const ObjURL = new URL(currURL);
const path = ObjURL.pathname;


if(path === '/login')
{
    console.log(" JS Working fine");
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