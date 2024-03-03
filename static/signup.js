let errors = 0;

// Vars to be used
let _stage = 0, _valid = false, _s2_selector = 0, _s3_selector = false, counter = 0;

/* floating buttons activation */
if(document.getElementsByClassName("_floating_buttons")[0])document.getElementsByClassName("_floating_buttons")[0].classList.remove("_hidden");

// Triggers 
if(document.getElementById('_login_en')) document.getElementById('_login_en').addEventListener('click', function (){window.location.replace("/login")});
if(document.getElementById('_login_es')) document.getElementById('_login_es').addEventListener('click', function (){ window.location.replace("/login") });


// Stage 0 triggers (inputs)
if(document.getElementById('i_fname')) document.getElementById('i_fname').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_username')) document.getElementById('i_username').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_email')) document.getElementById('i_email').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass')) document.getElementById('i_pass').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass_repeat')) document.getElementById('i_pass_repeat').addEventListener('change', function (){stage_0_inputs_check();});
// next button trigger
if(document.getElementById('_fb_1')) document.getElementById('_fb_1').addEventListener('click', function (){
    _change_obj_color(document.getElementById('_fb_1'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx");
    if (_stage === 0 && _valid) { nextButton(true); cleanAlert(); 
    }else if(_stage === 0){
        setAlert("_box_yellow", "Please fill the missing fields.")
    }else if (_stage === 1) { 
        nextButton(true); 
    }else if (_stage === 2 && _s2_selector > 0 ) { 
        nextButton(true); cleanAlert(); 
    }else if (_stage === 2) { 
        setAlert("_box_red", "Select a plan to continue.")
    }
    _change_obj_color(document.getElementById('_fb_1'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx");
});
// back button trigger
if(document.getElementById('_fb_3')) document.getElementById('_fb_3').addEventListener('click', function (){ _change_obj_color(document.getElementById('_fb_3'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); if (_valid) {nextButton(false);}_change_obj_color(document.getElementById('_fb_3'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx"); });
// create button trigger
if(document.getElementById('_fb_2')) document.getElementById('_fb_2').addEventListener('click', function (){ _change_obj_color(document.getElementById('_fb_2'), "color_2_bg", "color_1_tx", "color_1_bg", "color_2_tx"); if (_s3_selector) { cleanAlert(); createAccount(); } else { setAlert("_box_red", " Accept terms and conditions. ") } _change_obj_color(document.getElementById('_fb_2'), "color_1_bg", "color_2_tx", "color_2_bg", "color_1_tx"); });

// Stage 2 triggers (selectors)
if(document.getElementById('_plan_op1')) document.getElementById('_plan_op1').addEventListener('click', function (){ if (_stage == 2) stage2Selector(1); });
if(document.getElementById('_plan_op2')) document.getElementById('_plan_op2').addEventListener('click', function (){ if (_stage == 2) stage2Selector(2); });
if(document.getElementById('_plan_op3')) document.getElementById('_plan_op3').addEventListener('click', function (){ if (_stage == 2) stage2Selector(3); });
//  Stage 3 triggers (terms and conditions
if(document.getElementById('i_terms')) document.getElementById('i_terms').addEventListener('change', function (){ stage3terms(); });


// _stage 0 check inputs.
function stage_0_inputs_check(){_butt = document.getElementById('_fb_1');if(document.getElementById('i_fname').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_email').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_pass').value.length > 0 && document.getElementById('i_pass_repeat').value.length > 0){_butt.classList.remove("_gray");/*_butt.classList.add("_box_altern");*/_butt.classList.add("_altern");_valid = true;}else{_butt.classList.add("_gray");_butt.classList.remove("_box_altern");_butt.classList.remove("_altern");_valid = false;}}

// _nextButton gets a _direction param to set fordward or backwards as direction. 
function nextButton(_direction){
    _stages = ["_stage_0", "_stage_1", "_stage_2", "_stage_3"];
    if(_direction && _stage > -1){
        document.getElementById(_stages[_stage]).classList.add("_hidden");
        document.getElementById(_stages[_stage + 1]).classList.remove("_hidden");
        if(_stage == 0){document.getElementById('_fb_3').classList.remove('_hidden');}
        if(_stage == 2){document.getElementById('_fb_1').classList.add('_hidden');document.getElementById('_fb_2').classList.remove('_hidden');}
        _stage += 1;
    }else if(_stage > 0){
        document.getElementById(_stages[_stage - 1]).classList.remove("_hidden");
        document.getElementById(_stages[_stage]).classList.add("_hidden");
        if(_stage == 1){document.getElementById('_fb_3').classList.add('_hidden');}
        if(_stage == 3){document.getElementById('_fb_1').classList.remove('_hidden');document.getElementById('_fb_2').classList.add('_hidden');}
        _stage -= 1;
    }
}

// Stage 2 selector functions
function stage2Selector(_selection){
    _curr = document.getElementById("_plan_op"+_selection);
    if(document.getElementById("_plan_op"+_s2_selector)){_past = document.getElementById("_plan_op"+_s2_selector)}else{_past = false};
    if (_past){
        _past.classList.remove("color_2_bg");
        _past.classList.remove("color_1_bg");
        _past.classList.remove("color_1_tx");
        _past.classList.remove("color_2_tx");
        _past.classList.add("color_1_bg");
        _past.classList.add("color_2_tx");
    }
    _curr = document.getElementById("_plan_op"+_selection);
    _curr.classList.remove("color_2_bg");
    _curr.classList.remove("color_1_bg");
    _curr.classList.remove("color_1_tx");
    _curr.classList.remove("color_2_tx");
    _curr.classList.add("color_2_bg");
    _curr.classList.add("color_1_tx");
    _s2_selector = _selection;
}

// Stage 3 terms selector.
function stage3terms(){
    if(_s3_selector){ _s3_selector = false;} else { _s3_selector = true;}
}

// stage 3 create account
function createAccount(){
    _display_wheel(true);
    let _validated_params = _signupjs_form_validation();
    if(_validated_params[0]){
        let _json_obj = {}
        let _json_pay = {}
        _selector_ids = ['i_fname', 'i_username', 'i_email', 'i_phone', 'i_bday', 'i_postalCode' ];
        _params = _validated_params[1];
        for(let i = 0; i < _selector_ids.length; i++){
            _json_obj[_selector_ids[i].substring(2)] = _params[_selector_ids[i]];
        }
        _json_obj['pass'] = window.btoa(unescape(encodeURIComponent(_params['i_pass'])))
        _json_obj['plan'] = _s2_selector; _json_obj['terms'] = true; _json_obj['type'] = 2;_json_obj["activate"] = true;_json_obj["pin"] = 0;_json_obj["tenant"] = "";_json_pay["item"] = _json_obj;
        console.log(_json_pay);
        let xhr = new XMLHttpRequest();
        let url = "/v1/admdata?service=user";
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            try
            {
                if (xhr.readyState === 4 && xhr.status === 202) {
                    let _data = xhr.responseText;
                    let _parsed_data = JSON.parse(_data);
                    if (_parsed_data["code"] == 202){
                        document.cookie = '_flag_content=User succesfully created! Login to start.';
                        document.cookie = '_flag_status=_box_green';
                        _redirect("/login");
                    }else{
                        signupjs_customAlert(_parsed_data["reason"]);
                        _display_wheel(false);
                    }
                }else if( xhr.status === 200 || xhr.status === 403){
                    let _data = xhr.responseText;
                    let _parsed_data = JSON.parse(_data);
                    signupjs_customAlert(_parsed_data["reason"]);
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
        var data = JSON.stringify(_json_pay);
        xhr.send(data);
    }else{
        setAlert("_box_red", _common_dictionary_errors[_curr_languaje][_validated_params[1]]);
        _display_wheel(false);
    }
    
}


// display custom alert
const signupjs_customAlert = (message) => {
    document.getElementById("_xpc_signup_alert").style.height = '10%';
    document.getElementsByClassName("_main_block")[0].style.display = 'block';
    document.getElementsByClassName('_main_block_alerts')[0].classList.add("_box_red");
    document.getElementsByClassName('_main_block_alerts')[0].classList.remove("_hidden");
    document.getElementsByClassName('_main_block_alerts')[0].innerHTML = "<p> Error creating user, "+ message +" </p>";
}


/// Form validation
const _signupjs_form_validation = () =>{
    // validar pass
    // validar 'i_fname', 'i_username', 'i_email', 'i_phone', 'i_bday', 'i_postalCode' 
    if ( _common_password_validation(document.getElementById('i_pass_repeat').value, document.getElementById('i_pass').value  ) )
    {
        if(document.getElementById('i_fname').value.length > 3)
        {
            if(document.getElementById('i_username').value.length > 3  && document.getElementById('i_username').value.length < 20)
            {
                if(_common_email_string_validation(document.getElementById('i_email').value))
                {
                    if(_common_date_validation(document.getElementById('i_bday').value))
                    {
                        if(_common_postal_code_validation(document.getElementById('i_postalCode').value, 'MX') )
                        {
                            if(_common_number_validation(document.getElementById('i_phone').value))
                            {
                                let form_values = {}
                                form_values['i_fname'] = document.getElementById('i_fname').value;
                                form_values['i_username'] = document.getElementById('i_username').value;
                                form_values['i_email'] = document.getElementById('i_email').value;
                                form_values['i_phone'] = document.getElementById('i_phone').value;
                                form_values['i_bday'] = document.getElementById('i_bday').value;
                                form_values['i_postalCode'] = document.getElementById('i_postalCode').value;
                                form_values['i_pass'] = document.getElementById('i_pass').value;
                                return [true,form_values];
                            }else{
                                _signupjs_clean_field('i_phone');
                                _signupjs_leaps(2);
                                return [false,'007'];
                            }
                        }else{
                            _signupjs_clean_field('i_postalCode');
                            _signupjs_leaps(2);
                            return [false,'006'];
                        }
                    }else{
                        _signupjs_clean_field('i_bday');
                        _signupjs_leaps(2);
                        return [false,'005'];
                    }
                }else{
                    _signupjs_clean_field('i_email');
                    _signupjs_leaps(3);
                    return [false,'004'];
                }
            }else{
                _signupjs_clean_field('i_username');
                _signupjs_leaps(3);
                return [false,'003'];
            }    
        }else{
            _signupjs_clean_field('i_fname');
            _signupjs_leaps(3);
            return [false,'002'];
        }
    }else{
        _signupjs_clean_field('i_pass_repeat');_signupjs_clean_field('i_pass');
        _signupjs_leaps(3);
        return [false,'001'];
        
    }
}

// back 1 or 2 or 3 steps
const _signupjs_leaps = (_num) => {
    for (let i = 0; i < _num; i++){
        nextButton(false);
    }
}

// clean field 
const _signupjs_clean_field = (_id) => {
    document.getElementById(_id).value = "";
}
