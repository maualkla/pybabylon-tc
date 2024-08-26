/* 
    JS functions for the transactions.html file.
*/
// System vars
let _stage = 0, counter = 0;

let _model = ["low", "medium", "high", "critical"]  

// initial triggers
_display_fbuttons(true);

// Service buttons
if(document.getElementById('_dash_en')) document.getElementById('_dash_en').addEventListener('click', function (){window.location.replace("/dashboard")});
if(document.getElementById('_dash_es')) document.getElementById('_dash_es').addEventListener('click', function (){ window.location.replace("/dashboard") });
if(document.getElementById('_logout_en')) document.getElementById('_logout_en').addEventListener('click', function (){window.location.replace("/logout")});
if(document.getElementById('_logout_es')) document.getElementById('_logout_es').addEventListener('click', function (){ window.location.replace("/logout") });

// mainblock buttons
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){ 
    if(_stage == 0){
        _stage = 1;
        _common_fbuttons_change_display_text(["Search", "", "Cancel"], [true, false, true]);
        _display_search(true);
    }else if(_stage == 1){
        // search action
        if(document.getElementById("_search_input").value){
            _get_items(document.getElementById("_search_input").value);
        }else{
            setAlert("_box_red", "Please enter a search term.");
        }
    }
});
if(document.getElementById('_fb_3')) document.getElementById('_fb_3').addEventListener('click', function (){ 
    if(_stage == 0){
        // refresh action
        _get_items();
    }else if(_stage == 1){
        _stage = 0;
        _common_fbuttons_change_display_text(["Search", "", "Refresh"], [true, false, true]);
        _display_search(false);
    }
});

// search buttons

// functions
function _display_search(_show){
    if(_show){
        document.getElementsByClassName("_main_block_content")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_search")[0].classList.remove("_hidden");
    }else{
        document.getElementsByClassName("_main_block_search")[0].classList.add("_hidden");
        document.getElementsByClassName("_main_block_content")[0].classList.remove("_hidden");
    }
}

// function
function _get_items(id = false){
    _display_wheel(true);
    let xhr = new XMLHttpRequest();
    let url = "/v1/admdata?service=transaction";
    if (id) url += "&id=" + id;
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        try
        {
            let _data = xhr.responseText;
            let _parsed_data = JSON.parse(_data);
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(_parsed_data);
                if(id && _parsed_data.containsData){
                    _stage = 0;
                    _common_fbuttons_change_display_text(["Search", "", "Refresh"], [true, false, true]);
                    _display_search(false);
                    _display_items(_parsed_data.items);
                    document.getElementById("_search_input").value = "";
                    counter = 0;
                }else if(_parsed_data.containsData){
                    _display_items(_parsed_data.items);
                    counter = 0;
                }else{
                    setAlert("_box_yellow", "No transactions(s) found, try again");
                    counter = 0;
                }
                _display_wheel(false);
            }else if(xhr.readyState === 4 && xhr.status === 500){
                setAlert("_box_yellow",_parsed_data["reason"]);
                _display_wheel(false);
            }
        }
        catch(e)
        {
            if(counter == 1){
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

// function delete user
function _delete_transaction(_trx_id){
    // code to be written
    if(_trx_id){
        _display_wheel(true);
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=transaction&id=" + _trx_id;
        xhr.open("DELETE", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                let _data = xhr.responseText;
                let _parsed_data = JSON.parse(_data);
                if (xhr.readyState == 4 && xhr.status == 200) {
                    _remove_custbox(_trx_id);
                    setAlert("_box_green", "Transaction deleted");
                    _display_wheel(false);
                    counter = 0;
                }else if(xhr.readyState == 4 && xhr.status == 500){
                    setAlert("_box_red",_parsed_data["reason"]);
                    _display_wheel(false);
                    counter = 0;
                }
            }catch(e){
                if(counter == 1){
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

// display data
const _display_items = (_items) =>{
    let _object = "";
    _items.forEach((item) => {
        _object += '<div class="_box_custom_ws _box_main_bot" id="_cut_'+item["id"]+'"><div class="_bc_ws_inf">'+item["action"]+'</div><div class="_bc_ws_tax">'+item["dateTime"]+'</div><div class="_bc_ws_cit">'+item["userId"]+'</div><div class="_bc_ws_pos">'+_severityes[item["severity"]-1].substring(0, 22)+'</div><div class="_bc_ws_man" onClick="_delete_transaction("'+item["id"]+'");"><bold_italic>Manage</bold_italic></div></div>';
    })
    document.getElementsByClassName("_main_block_content")[0].innerHTML = _object;
}

// destroy custom box 
const _remove_custbox = (_cus_id) => {
    document.getElementById("_cut_"+_cus_id).remove();
}