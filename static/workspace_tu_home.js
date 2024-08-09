//// initialization
let counter = 0;
let _view = 0, _stg = _context_vars[6];
_display_fbuttons(true);
_common_system_auto_change_color();

// fbs
// checkin-checkout (fb_1) button trigger
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    if(_view == 0){
        _tu_home_call_timeLog_validation(1);
        _display_wheel(false);
    }else if (_view == 1){
        _tu_home_call_timeLog_validation(2);
        _common_delete_all_cookies();
        _common_reload_page(location.href);
        _display_wheel(false);
    }else{
        _common_reload_page(location.href);
    }
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
    if (_stg == "False"){
       for (let i = 0; i < _stg1.length; i++){
            _stg1[i].classList.remove("_hidden");
       }
       for (let i = 0; i < _stg2.length; i++){
            _stg2[i].classList.add("_hidden");
       }
       _common_fbuttons_change_display_text(['Check In', 'Close Session', ''], [true, false, false])
       _view = 0;
    }else{
        for (let i = 0; i < _stg2.length; i++){
                _stg2[i].classList.remove("_hidden");
        }
        for (let i = 0; i < _stg1.length; i++){
                _stg1[i].classList.add("_hidden");
        }
        _common_fbuttons_change_display_text(['Check Out', 'Close Session', ''], [true, false, false])
        _view = 1;
    }
}

/// initialization
_tu_home_switch_views();


/// call  
const _tu_home_call_timeLog_validation = (action = false) => {
    _display_wheel(true);
    let xhr = new XMLHttpRequest();
    let url = "/checkinValidation?id="+_common_get_cookie_value('token')+"&action="+action;
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        try
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (_parsed_data["validated"]){
                    if (!_parsed_data['EndTime']){
                        _stg = _parsed_data['StartTime'];
                        let stds = document.getElementsByClassName('custom_start_date')
                        for(let i = 0; i < stds.length; i++){
                            stds[i].innerHTML = _stg;
                        }
                        _tu_home_switch_views();
                    }else{
                        _stg = "False";
                        _tu_home_switch_views();
                    }
                }
            }else if(xhr.status === 403){
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                setAlert("_box_red", _parsed_data['errorDesc']);
                _display_wheel(false);
            }else if(xhr.status === 401){
                _common_delete_all_cookies();
                _common_reload_page();
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
                setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['013']);
                _display_wheel(false);
            }else{
                counter++;
            }
        }
    };
    xhr.send();
}