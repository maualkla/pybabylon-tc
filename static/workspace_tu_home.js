//// initialization
let counter = 0;
_display_fbuttons(true);
_common_system_auto_change_color();

// fbs
// back button trigger
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    _display_wheel(true);
    let xhr = new XMLHttpRequest();
    let url = "/checkinValidation";
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        try
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (_parsed_data["validated"] == True){
                    console.log(" correcto ")
                }else{
                    console.log( " no correcto")
                }
                _display_wheel(false);
            }
        }
        catch(e)
        {
            if(counter === 1){
                if(_logging){
                    console.log("-------------------")
                    console.log(e)
                    console.log("-------------------")
                }
                _errors++;
                _change_obj_color(document.getElementById('_login_buttom'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); 
                setAlert("_box_red", "Error login user.");
                _display_wheel(false);
            }else{
                counter++;
            }
        }
    };
    xhr.send();
});



/// updatee time
function updateTime() {
    // get time format HH:MM:SS
    let data = new Date();
    let options = { hour12: false }; // Use 24-hour format
    let timeString = data.toLocaleTimeString(undefined, options);
    document.getElementById('_time').innerHTML = timeString;
}

setInterval(updateTime, 1000);