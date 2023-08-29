// Vars to be used
let _stage = 0, _valid = false, _s2_selector = 0, _s3_selector = false;

// Stage 0 triggers (inputs)
if(document.getElementById('i_full_name').length > 0) document.getElementById('i_full_name').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_username').length > 0) document.getElementById('i_username').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_email').length > 0) document.getElementById('i_email').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass').length > 0) document.getElementById('i_pass').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass_repeat').length > 0) document.getElementById('i_pass_repeat').addEventListener('change', function (){stage_0_inputs_check();});
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
if(document.getElementById('_back_button').length > 0) document.getElementById('_back_button').addEventListener('click', function (){ if (_valid) nextButton(false); });
// create button trigger
if(document.getElementById('_create_button').length > 0) document.getElementById('_create_button').addEventListener('click', function (){ if (_s3_selector) { cleanAlert(); createAccount(); } else { setAlert("_box_red", " Accept terms and conditions. ") } });

// Stage 2 triggers (selectors)
if(document.getElementById('_plan_op1').length > 0) document.getElementById('_plan_op1').addEventListener('click', function (){ console.log("click 1 - selectio = "+_s2_selector); if (_stage == 2) stage2Selector(1); });
if(document.getElementById('_plan_op2').length > 0) document.getElementById('_plan_op2').addEventListener('click', function (){ console.log("click 2 - selectio = "+_s2_selector);  if (_stage == 2) stage2Selector(2); });
if(document.getElementById('_plan_op3').length > 0) document.getElementById('_plan_op3').addEventListener('click', function (){ console.log("click 3 - selectio = "+_s2_selector);  if (_stage == 2) stage2Selector(3); });
//  Stage 3 triggers (terms and conditions
if(document.getElementById('i_terms').length > 0) document.getElementById('i_terms').addEventListener('change', function (){ console.log("terms change - selectio = "); stage3terms(); });


// _stage 0 check inputs.
function stage_0_inputs_check(){_butt = document.getElementById('_next_button');if(document.getElementById('i_full_name').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_email').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_pass').value.length > 0 && document.getElementById('i_pass_repeat').value.length > 0){_butt.classList.remove("_gray");/*_butt.classList.add("_box_altern");*/_butt.classList.add("_altern");_valid = true;}else{_butt.classList.add("_gray");_butt.classList.remove("_box_altern");_butt.classList.remove("_altern");_valid = false;}}

// _nextButton gets a _direction param to set fordward or backwards as direction. 
function nextButton(_direction){
    console.log(" next button action direction "+_direction+ " stage: "+_stage);
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
    console.log("_plan_op"+_selection + " past == "+_past)
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
    console.log( "selector value = "+_s3_selector);
}

// stage 3 create account
function createAccount(){
    if(document.getElementById('i_pass').value === document.getElementById('i_pass_repeat').value){
        let _json_obj = {}
        console.log(" Creating account...");
        _selector_ids = ['i_full_name', 'i_username', 'i_email', 'i_phone', 'i_birthday', 'i_postal_code' ];
        for(let i = 0; i < _selector_ids.length; i++){
            console.log("Field: "+ _selector_ids[i] + " : " + document.getElementById(_selector_ids[i]).value)
            _json_obj[_selector_ids[i]] = document.getElementById(_selector_ids[i]).value;
        }
        _json_obj['i_pass'] = window.btoa(unescape(encodeURIComponent(document.getElementById('i_pass').value)))
        _json_obj['i_plan'] = _s2_selector;
        _json_obj['i_terms'] = true;
        console.log(_json_obj)
        
        let xhr = new XMLHttpRequest();
        let url = "/s_signup";
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var _out = JSON.parse(xhr.responseText);
                console.log(_out);
            }
        };
        var data = JSON.stringify(_json_obj);
        xhr.send(data);
    }else{
        setAlert("_box_red", "Passwords don´t match try again.");
        nextButton(false);nextButton(false);nextButton(false);
    }
    
}