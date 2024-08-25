let errors = 0;

// Vars to be used
let _stage = 0, _valid = false, _s2_selector = 0, _s3_selector = false, counter = 0, go = false, semail = "", stoken = "";

/* floating buttons activation */
if(document.getElementsByClassName("_floating_buttons")[0])document.getElementsByClassName("_floating_buttons")[0].classList.remove("_hidden");

// Triggers 
if(document.getElementById('_login_en')) document.getElementById('_login_en').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_login_es')) document.getElementById('_login_es').addEventListener('click', function (){ window.location.replace("/login") });

// FB-1
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ common_redirect('login') });
// FB-2
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ common_redirect('login') });
