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
            cust_download_file();
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
            _redirect('/workspace/'+_context_vars[5]+'/workingTime', 1);
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
if(document.getElementById('_back_ws_en')) document.getElementById('_back_ws_en').addEventListener('click', function (){ _redirect('/workspace/'+_context_vars[5]+'/workingTime', 1) });
if(document.getElementById('_back_ws_es')) document.getElementById('_back_ws_es').addEventListener('click', function (){  _redirect('/workspace/'+_context_vars[5]+'/workingTime', 1)  });
if(document.getElementById('_close_sesion_en')) document.getElementById('_close_sesion_en').addEventListener('click', function (){ _redirect("logout"); });
if(document.getElementById('_close_sesion_es')) document.getElementById('_close_sesion_es').addEventListener('click', function (){ _redirect("logout"); });


// triggers for the filters
if(document.getElementById('_filter_view')) document.getElementById('_filter_view').addEventListener('click', function (){ 
    if (filter_view == 1){
        _custom_change_view_worklist(2, user_in_search);filter_view = 2;
    }else if (filter_view == 2){
        _custom_change_view_worklist(1, user_in_search);filter_view = 1;
    } 
});

// custom 
const _custom_change_view_worklist = (type = 0, tuser = false) => {
    _display_wheel(true);
    counter = 0;
    if(type >= 0 && _context_vars[5]){
        document.getElementsByClassName('_main_block_content').innerHTML = '';
        let xhr = new XMLHttpRequest();
        let url = "/v1/periodsData?workspace="+_context_vars[5]+"&type="+type;
        if(tuser != false) url += "&tuser="+_context_vars[5]+"."+tuser;
        xhr.open("GET", url);
        xhr.onreadystatechange = function () {
            try
            {   
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (_logging){
                        console.group('Response Data: ')
                        console.log(_parsed_data)
                        console.groupEnd
                    }
                    _cust_display_data(_parsed_data['items'][0], type);
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
        xhr.send();
    }
}


/// display custom data
// display data
const _cust_display_data = (_items, type) =>{
    let _object = "";
    let typeTexts = ['<div class="_en"><bold>Change</bold> Day view</div><div class="_es _hidden"><bold>Cambiar</bold> Vista Diaria </div>', '<div class="_en"><bold>Change</bold> Week view</div><div class="_es _hidden"><bold>Cambiar</bold> Vista Semanal</div>', '<div class="_en"><bold>Change</bold> Month view</div><div class="_es _hidden"><bold>Cambiar</bold> Vista Mensual</div>', '<div class="_en"><bold>Change</bold> 6 Months view</div><div class="_es _hidden"><bold>Cambiar</bold> Vista 6 Meses </div>', '<div class="_en"><bold>Change</bold> Year view</div><div class="_es _hidden"><bold>Cambiar</bold> Vista Anual</div>']
    _items['times'].forEach((item) => {
        _object += '<tr style="height: 55px;"><td style="width: 10%; height: 55px;" onClick="_redirect(\'/workspace/'+_context_vars[5]+'/workingTime/'+user_in_search+'/'+item['logid']+'\', 1)"><img src = "'+host_url+'/static/editIcon.svg" height="50px" width="60px" alt="More details"/></td><td style="width: 35%; height: 55px;">'+item['startDate']+'-'+item['startTime']+'</td><td style="width: 35%; height: 55px;">'+item['endDate']+'-'+item['endTime']+'</td><td style="width: 20%; height: 55px;">'+item['hours']+' h '+item['minutes']+' m</td></tr>';
    })
    _object += '<tr style="height: 55px;"><td style="width: 10%; height: 55px;" ></td><td style="width: 35%; height: 55px;"></td><td style="width: 35%; height: 55px;">Sumatory</td><td style="width: 20%; height: 55px;">'+_items['total_hours']+' h '+_items['total_minutes']+' m</td></tr>';
    document.getElementById("replazable_box").innerHTML = _object;
    document.getElementById('_filter_view').innerHTML = typeTexts[type];
}


// custom switch search view
const _custom_switch_view = (_show = false) => {
    if(_show){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_search")[0].classList.remove("_hidden");
        document.getElementById("_filter_view").classList.add("_hidden");
        _common_fbuttons_change_display_text(["Search","Back", ""], [true, true, false]);
        _view = 2;
    }else{
        document.getElementsByClassName("_main_block_search")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
        document.getElementById("_filter_view").classList.remove("_hidden");
        _common_fbuttons_change_display_text(["Search","Refresh", ""], [true, true, false]);
        _view = 1;
    }
}


/// file get
const cust_download_file = () => {
    let url = "/v1/periodsData?workspace="+_context_vars[5]+"&type="+filter_view+"&format=csv"
    if(user_in_search != false) url += "&tuser="+_context_vars[5]+"."+user_in_search;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          // Handle 400 errors and other non-2xx responses
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob); // Create a temporary URL for the Blob
        const a = document.createElement("a");  
        a.href = url;
        a.download = "my_file.csv";  // Set the desired filename
        document.body.appendChild(a); // Append the link to the page
        a.click(); // Programmatically click the link to start the download
        window.URL.revokeObjectURL(url); // Clean up the temporary URL
      })
      .catch(error => {
        // Handle errors, including 400 errors
        if (error.message === 'Network response was not ok') {
          setAlert("_box_red", "Error: Invalid request. Please check your parameters.");
        } else {
          setAlert("_box_red", "Error downloading file.");
        }
      });
}
