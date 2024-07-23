//
//  JS for workspace_users_manage
//
let counter = 0, filter_view = 1, _view = 0, user_in_search = "";

// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();

/// floating buttons
if(document.getElementById("_fb_1")) document.getElementById("_fb_1").addEventListener('click', function(){
    switch(_view){
        case 0: 
            
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
        _custom_change_view_worklist(1, user_in_search);filter_view = 1;
    }else if (filter_view == 2){
        _custom_change_view_worklist(0, user_in_search);filter_view = 0;
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
                    _cust_display_data(_parsed_data['items'], type);
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
    _items.forEach((item) => {
        _object += '<div class="_box_custom_ws _box_main_bot" id=""><div class="_bc_ws_inf">'+item["fullname"].substring(0,15)+'</div><div class="_bc_ws_pos"><bold>'+item["total_hours"]+' Hrs + '+item["total_minutes"]+' Mins</bold></div><div class="_bc_ws_tax">'+item["id"].split(".")[1]+'</div><div class="_bc_ws_cit">'+item["type"]+'</div><div class="_bc_ws_man" onClick="_redirect(\'/'+item["id"].split(".")[1]+'\', 3)"><bold_italic>Details</bold_italic></div></div>';
    })
    document.getElementsByClassName("_main_block_content")[0].innerHTML = _object;
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