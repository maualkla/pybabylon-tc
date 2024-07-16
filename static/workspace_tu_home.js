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
                console.log("Entro a 200")
                console.log(xhr.responseText)
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (_parsed_data["validated"]){
                    console.log("-> Time logged");
                    _context_vars[6] = _parsed_data['StartTime'];
                    _tu_home_switch_views();
                }else{
                    console.log( " no correcto");
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

/// clock updater
setInterval(updateTime, 1000);

/// switch trhu views
let _tu_home_switch_views = () => {
    let _stg1 = document.getElementsByClassName('_stg1')
    let _stg2 = document.getElementsByClassName('_stg2')
    if (_context_vars[6] == "False"){
       for (let i = 0; i < _stg1.length; i++){
            _stg1[i].classList.remove("_hidden");
       }
       for (let i = 0; i < _stg2.length; i++){
            _stg2[i].classList.add("_hidden");
       }
    }else{
        for (let i = 0; i < _stg2.length; i++){
                _stg2[i].classList.remove("_hidden");
        }
        for (let i = 0; i < _stg1.length; i++){
                _stg1[i].classList.add("_hidden");
        }
    }
}

/// initialization
_tu_home_switch_views();