/* 
    JS functions for the dashboard.html file.
*/
// Triggers
if(document.getElementById('_save_button')) document.getElementById('_save_button').addEventListener('click', function (){ _send_user_update(); console.log(" Sent to update. ")});





// update user account function
function _send_user_update(){
    let _json_obj = {}
    let _fields = ['pass', 'username', 'bday', 'fname', 'phone', 'pin', 'postalCode']
    let _go = false;
    for(let x = 0; x < _fields.length ; x++){
        console.log('_input_'+_fields[x]);
        _json_obj[_fields[x]] = document.getElementById('_input_'+_fields[x]).value;
        _go = true;
    }
    _json_obj['email'] = "missing email origin";
    console.log(_json_obj);
    if(1 === 2){
        let x = document.cookie;
        _id = x()
        let xhr = new XMLHttpRequest();
        let url = "/user";
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("_id", "_id");
        xhr.setRequestHeader("_un", "_un");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    // Actions in case pin was updated.
                }
            }
            catch(e)
            {
                errors++;
            }
        };
        var data = JSON.stringify(_json_obj);
        xhr.send(data);
    }
}