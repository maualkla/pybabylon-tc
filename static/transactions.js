/* 
    JS functions for the transactions.html file.
*/
// System vars

// Service buttons
if(document.getElementById('_dash_en')) document.getElementById('_dash_en').addEventListener('click', function (){window.location.replace("/dashboard")});
if(document.getElementById('_dash_es')) document.getElementById('_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });

// mainblock buttons
if(document.getElementById('_next_button')) document.getElementById('_next_button').addEventListener('click', function (){ _display_search(); });
if(document.getElementById('_create_button')) document.getElementById('_create_button').addEventListener('click', function (){ window.location.reload(); });

// functions
function _display_search(){

}