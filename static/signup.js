// Vars to be used
let _stage = 0, _valid = false;

// Stage 0 triggers (inputs)
if(document.getElementById('i_full_name')) document.getElementById('i_full_name').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_username')) document.getElementById('i_username').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_email')) document.getElementById('i_email').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass')) document.getElementById('i_pass').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass_repeat')) document.getElementById('i_pass_repeat').addEventListener('change', function (){stage_0_inputs_check();});
// next button trigger
if(document.getElementById('_next_button')) document.getElementById('_next_button').addEventListener('click', function (){ if (_valid) nextButton(true); });
if(document.getElementById('_back_button')) document.getElementById('_back_button').addEventListener('click', function (){ if (_valid) nextButton(false); });


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
        _stage += 1;
    }else if(_stage > 0){
        document.getElementById(_stages[_stage - 1]).classList.remove("_hidden");
        document.getElementById(_stages[_stage]).classList.add("_hidden");
        if(_stage == 1){document.getElementById('_back_button').classList.add('_hidden');}
        _stage -= 1;
    }
}