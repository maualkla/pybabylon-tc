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
            setAlert("_box_blue", "Option not available yet");
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
    if(_context_vars[8]){
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