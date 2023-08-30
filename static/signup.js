let errors = 0;

// Vars to be used
let _stage = 0, _valid = false, _s2_selector = 0, _s3_selector = false;

// Triggers 
if(document.getElementById('_login_en')) document.getElementById('_login_en').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_login_es')) document.getElementById('_login_es').addEventListener('click', function (){ window.location.replace("/login") });


// Stage 0 triggers (inputs)
if(document.getElementById('i_full_name')) document.getElementById('i_full_name').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_username')) document.getElementById('i_username').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_email')) document.getElementById('i_email').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass')) document.getElementById('i_pass').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass_repeat')) document.getElementById('i_pass_repeat').addEventListener('change', function (){stage_0_inputs_check();});
// next button trigger
if(document.getElementById('_next_button')) document.getElementById('_next_button').addEventListener('click', function (){ 
    if (
        _stage === 0 && _valid) { nextButton(true); cleanAlert(); 
    }else if (_stage === 1) { 
        nextButton(true); 
    }else if (_stage === 2 && _s2_selector > 0 ) { 
        nextButton(true); cleanAlert(); 
    }else if (_stage === 2) { 
        setAlert("_box_red", "Select a plan to continue.")
    }
});
// back button trigger
if(document.getElementById('_back_button')) document.getElementById('_back_button').addEventListener('click', function (){ if (_valid) nextButton(false); });
// create button trigger
if(document.getElementById('_create_button')) document.getElementById('_create_button').addEventListener('click', function (){ if (_s3_selector) { cleanAlert(); createAccount(); } else { setAlert("_box_red", " Accept terms and conditions. ") } });

// Stage 2 triggers (selectors)
if(document.getElementById('_plan_op1')) document.getElementById('_plan_op1').addEventListener('click', function (){ if (_stage == 2) stage2Selector(1); });
if(document.getElementById('_plan_op2')) document.getElementById('_plan_op2').addEventListener('click', function (){ if (_stage == 2) stage2Selector(2); });
if(document.getElementById('_plan_op3')) document.getElementById('_plan_op3').addEventListener('click', function (){ if (_stage == 2) stage2Selector(3); });
//  Stage 3 triggers (terms and conditions
if(document.getElementById('i_terms')) document.getElementById('i_terms').addEventListener('change', function (){ stage3terms(); });


// _stage 0 check inputs.
function stage_0_inputs_check(){_butt = document.getElementById('_next_button');if(document.getElementById('i_full_name').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_email').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_pass').value.length > 0 && document.getElementById('i_pass_repeat').value.length > 0){_butt.classList.remove("_gray");/*_butt.classList.add("_box_altern");*/_butt.classList.add("_altern");_valid = true;}else{_butt.classList.add("_gray");_butt.classList.remove("_box_altern");_butt.classList.remove("_altern");_valid = false;}}

// _nextButton gets a _direction param to set fordward or backwards as direction. 
function nextButton(_direction){
    _stages = ["_stage_0", "_stage_1", "_stage_2", "_stage_3"];
    if(_direction && _stage > -1){
        document.getElementById(_stages[_stage]).classList.add("_hidden");
        document.getElementById(_stages[_stage + 1]).classList.remove("_hidden");
        if(_stage == 0){document.getElementById('_back_button').classList.remove('_hidden');}
        if(_stage == 2){document.getElementById('_next_button').classList.add('_hidden');document.getElementById('_create_button').classList.remove('_hidden');}
        _stage += 1;
    }else if(_stage > 0){
        document.getElementById(_stages[_stage - 1]).classList.remove("_hidden");
        document.getElementById(_stages[_stage]).classList.add("_hidden");
        if(_stage == 1){document.getElementById('_back_button').classList.add('_hidden');}
        if(_stage == 3){document.getElementById('_next_button').classList.remove('_hidden');document.getElementById('_create_button').classList.add('_hidden');}
        _stage -= 1;
    }
}

// Stage 2 selector functions
function stage2Selector(_selection){
    _curr = document.getElementById("_plan_op"+_selection);
    if(document.getElementById("_plan_op"+_s2_selector)){_past = document.getElementById("_plan_op"+_s2_selector)}else{_past = false};
    _curr = document.getElementById("_plan_op"+_selection);
    _curr.classList.remove("_s_main");
    _curr.classList.remove("_s_box_main");
    _curr.classList.add("_s_altern");
    _curr.classList.add("_s_box_altern");
    if (_past){
        _past.classList.add("_s_main");
        _past.classList.add("_s_box_main");
        _past.classList.remove("_s_altern");
        _past.classList.remove("_s_box_altern");
    }
    _s2_selector = _selection;
}

// Stage 3 terms selector.
function stage3terms(){
    if(_s3_selector){ _s3_selector = false;} else { _s3_selector = true;}
}

// stage 3 create account
function createAccount(){
    if(document.getElementById('i_pass').value === document.getElementById('i_pass_repeat').value){
        let _json_obj = {}
        _selector_ids = ['i_full_name', 'i_username', 'i_email', 'i_phone', 'i_birthday', 'i_postal_code' ];
        for(let i = 0; i < _selector_ids.length; i++){
            _json_obj[_selector_ids[i]] = document.getElementById(_selector_ids[i]).value;
        }
        _json_obj['i_pass'] = window.btoa(unescape(encodeURIComponent(document.getElementById('i_pass').value)))
        _json_obj['i_plan'] = _s2_selector;
        _json_obj['i_terms'] = true;
        
        let xhr = new XMLHttpRequest();
        let url = "/s_signup";
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    document.cookie = '_flag_content=User succesfully created! Login to start.';
                    document.cookie = '_flag_status=_box_green';
                    window.location.replace("/login");
                }else{
                    let _data = xhr.responseText;
                    let _parsed_data = JSON.parse(_data);
                    document.getElementById("_xpc_signup_alert").style.height = '10%';
                    document.getElementsByClassName("_main_block")[0].style.display = 'block';
                    document.getElementsByClassName('_main_block_alerts')[0].classList.add("_box_red");
                    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_hidden");
                    document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "<p> Error creating user, "+ _parsed_data["reason"] +" </p>";
                }
            }
            catch(e)
            {
                errors++;
            }
        };
        var data = JSON.stringify(_json_obj);
        xhr.send(data);
    }else{
        setAlert("_box_red", "Passwords don´t match try again.");
        nextButton(false);nextButton(false);nextButton(false);
    }
    
}