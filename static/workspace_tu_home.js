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
const _tu_home_switch_views = () => {
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
    console.log(1)
    if((document.getElementById('code').value.length == 6 && action == 1) || action == 2 ){
        console.log(2)
        _display_wheel(true);
        let xhr = new XMLHttpRequest();
        let url = "/v1/checkinValidation?id="+_common_get_cookie_value('token')+"&action="+action+"&code="+document.getElementById('code').value+'&wsid='+_context_vars[5];
        console.log(url)
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
                            if (_view == 1){
                                _common_delete_all_cookies();
                                _common_reload_page(location.href);
                            }
                        }
                    }
                }else if( xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 403)){
                    let _data = xhr.responseText;
                    let _parsed_data = JSON.parse(_data);
                    setAlert("_box_red", _parsed_data['errorDesc']);
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
    }else{
        setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['014']);
        window.alert(1)
        document.getElementById('code').value = "";
    }
}

/// validate no more than 6 charss
const cust_more_than_6_chars = () => {
    document.getElementById('code').value = document.getElementById('code').value.substring(0, 6);
}

// onchange validation
if(document.getElementById('code')) document.getElementById('code').addEventListener('change', function () { 
    if(document.getElementById('code').value.length > 6){
        setAlert("_box_red", _common_dictionary_errors[_curr_languaje]['014']);
        cust_more_than_6_chars();
    }
});