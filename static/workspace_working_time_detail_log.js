//
//  JS for workspace_users_manage
//
let counter = 0, filter_view = 1, _view = 0, user_in_search = _context_vars[6], host_url = _context_vars[7];

// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();

/// floating buttons
if(document.getElementById("_fb_1")) document.getElementById("_fb_1").addEventListener('click', function(){
    switch(_view){
        case 0: 
            //setAlert("_box_blue", "Option not available yet");
            // here start the save flow.
            _custom_update_timelog_values();
            break;
        case 1: 
            
            break;
        case 2: 
            
            break;
        default: 
            break;
    }
});
if(document.getElementById("_fb_2")) document.getElementById("_fb_2").addEventListener('click', function(){
    switch(_view){
        case 0: 
            _redirect('/workspace/'+_context_vars[5]+'/workingTime/'+_context_vars[6], 1);
            break;
        case 1: 
            
            break;
        case 2: 
            
            break;
        default: 
            break;
    }
});
if(document.getElementById("_fb_3")) document.getElementById("_fb_3").addEventListener('click', function(){
    switch(_view){
        case 0: 
            cust_delete_log();
            break;
        case 1: 
            
            break;
        case 2: 
            
            break;
        default: 
            break;
    }
});

// triggers
if(document.getElementById('_back_ws_en')) document.getElementById('_back_ws_en').addEventListener('click', function (){ _redirect('/workspace/'+_context_vars[5]+'/workingTime'+_context_vars[6], 1) });
if(document.getElementById('_back_ws_es')) document.getElementById('_back_ws_es').addEventListener('click', function (){  _redirect('/workspace/'+_context_vars[5]+'/workingTime'+_context_vars[6], 1)  });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout"); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout"); });

// custom 
const _custom_update_timelog_values = () => {
    _display_wheel(true);
    counter = 0;
    let go = false;
    if (cust_time_format_validation(document.getElementById('StartTime').value) && cust_date_format_validation(document.getElementById('StartDate').value) && cust_time_format_validation(document.getElementById('EndTime').value) && cust_date_format_validation(document.getElementById('EndDate').value)) go = true;
    if(_context_vars[8] && go){
        if(cust_compare_start_and_end(document.getElementById('StartDate').value, document.getElementById('StartTime').value, document.getElementById('EndDate').value, document.getElementById('EndTime').value)){
            if(cust_compare_start_and_end(document.getElementById('EndDate').value, document.getElementById('EndTime').value)){
                document.getElementsByClassName('_main_block_content').innerHTML = '';
                let xhr = new XMLHttpRequest();
                let url = "/v1/admdata?service=timeLog";
                let data_block = {"item": {
                        "StartDate": document.getElementById('StartDate').value,
                        "StartTime": document.getElementById('StartTime').value,
                        "EndDate": document.getElementById('EndDate').value,
                        "EndTime": document.getElementById('EndTime').value,
                        "Id": _context_vars[8]
                    }
                };
                xhr.open("PUT", url);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    try
                    {   
                        let _data = xhr.responseText;
                        let _parsed_data = JSON.parse(_data);
                        if (xhr.readyState === 4 && xhr.status === 202) {
                            if (_logging){
                                console.group('Response Data: ')
                                console.log(_parsed_data)
                                console.groupEnd
                            }
                            setAlert("_box_green", "Changes saved successfully.");
                            console.log("Success");
                            _display_wheel(false);
                        }else if( xhr.status === 403){
                            setAlert("_box_yellow", "Error try again later.")
                            _display_wheel(false);
                        }
                    }
                    catch(e)
                    {
                        if(counter == 2){
                            if(_logging){
                                console.log("-------------------")
                                console.log(e)
                                console.log("-------------------")
                            }
                            _errors++;
                            setAlert("_box_red", "Error processing data.");
                            _display_wheel(false);
                        }else{
                            counter++;
                        }
                    }
                };
                let data = JSON.stringify(data_block);
                console.log(data)
                xhr.send(data);
            }else{
                setAlert("_box_red", "Error, End date & time must be smaller than current date & time.");
                _display_wheel(false);
            }
        }else{
            setAlert("_box_red", "Error, End date & time must be bigger than start date & time.");
            _display_wheel(false);
        }
    }else{
        setAlert("_box_red", "Error, please review the formats (DD.MM.YYYY and HH:MM:SS)");
        _display_wheel(false);
    }
}

// cust_delete_log
const cust_delete_log = () => {
    _display_wheel(true);
    let xhr = new XMLHttpRequest();
    let url = "/v1/admdata?service=timeLog&id="+_context_vars[8];
    xhr.open("DELETE", url);
    xhr.onreadystatechange = function () {
        try
            {   
                if (xhr.readyState === 4 && xhr.status === 200) {
                    _redirect('/workspace/'+_context_vars[5]+'/workingTime/'+_context_vars[6], 1);
                }
            }
        catch(e)
            {
                if(counter == 2){
                    if(_logging){
                        console.log("-------------------")
                        console.log(e)
                        console.log("-------------------")
                    }
                    _errors++;
                    setAlert("_box_red", "Error processing data.");
                    _display_wheel(false);
                }else{
                    counter++;
                }
            }
    }
    xhr.send();
}

// format validation function
const cust_date_format_validation = (date_to_validate) =>{
    let re_dot = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/; //date 'DD.MM.YYYY'
    return re_dot.test(date_to_validate);
}

// format validation function
const cust_time_format_validation = (time_to_validate) =>{
    let re_dot = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; //date 'HH:MM:SS'
    return re_dot.test(time_to_validate);
}

// bigger date
// compare the difference between the start vs the end and if start is bigger returns false, else true.
const cust_compare_start_and_end = (start_d, start_t, end_d = false, end_t = false) =>{
    const start = new Date(start_d.substring(6, 10), start_d.substring(3,5), start_d.substring(0,2), start_t.substring(0,2), start_t.substring(3,5), start_t.substring(6,8), 0);
    let end = new Date();
    if (end_d && end_t){
        end = new Date(end_d.substring(6, 10), end_d.substring(3,5), end_d.substring(0,2), end_t.substring(0,2), end_t.substring(3,5), end_t.substring(6,8), 0);
    }else{
        let today = new Date();
        end = new Date(today.getFullYear(), String(today.getMonth() + 1), String(today.getDate()).padStart(2, '0'), String(today.getHours()).padStart(2, '0'), String(today.getMinutes()).padStart(2, '0'), String(today.getSeconds()).padStart(2, '0') );
    }
    if (start <= end){
        return true;
    }else{
        return false;
    }
}