// Vars to be used
let _stage = 0, _valid = false;

// Stage 0 triggers (inputs)
if(document.getElementById('i_full_name')) document.getElementById('i_full_name').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_username')) document.getElementById('i_username').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_email')) document.getElementById('i_email').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass')) document.getElementById('i_pass').addEventListener('change', function (){stage_0_inputs_check();});
if(document.getElementById('i_pass_repeat')) document.getElementById('i_pass_repeat').addEventListener('change', function (){stage_0_inputs_check();});
// next button trigger
if(document.getElementById('_next_button')) document.getElementById('_next_button').addEventListener('click', function (){ if (_valid) nextButton(); });


// _stage 0 check inputs.
function stage_0_inputs_check(){_butt = document.getElementById('_next_button');if(document.getElementById('i_full_name').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_email').value.length > 0 && document.getElementById('i_username').value.length > 0 && document.getElementById('i_pass').value.length > 0 && document.getElementById('i_pass_repeat').value.length > 0){_butt.classList.remove("_gray");_butt.classList.add("_box_altern");_butt.classList.add("_altern");_valid = true;}else{_butt.classList.add("_gray");_butt.classList.remove("_box_altern");_butt.classList.remove("_altern");_valid = false;}}

function nextButton(){
    console.log(" next button action");
    switch (_stage){
        case 0:
            /// Hide stage 0 show stage 1
            document.getElementById('_stage_0').classList.add("_hidden");
            document.getElementById('_stage_1').classList.remove("_hidden");
            document.getElementById('_back_button').classList.remove('_hidden');
            _stage = 1;
            break;
        case 1:
            /// Hide stage 1 show stage 2
            break;
        case 2:
            /// Hide stage 2 show stage 3
            break;
        case 3:
            /// Hide stage 3 show stage 4
            break;
        default:
            break;
    }
         
}