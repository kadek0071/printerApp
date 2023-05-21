
//Click animations

const inputs = document.querySelectorAll(".input");

function addcl(){
    let parent = this.parentNode.parentNode;
    let parent_2 = this.parentNode;
    parent.classList.add("focus");
    parent_2.classList.remove("error");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
    input.addEventListener('input', addcl);
    if(input.value !== ""){
        let parent = input.parentNode.parentNode;
        let parent_2 = input.parentNode;
        parent.classList.add("focus");
        parent_2.classList.remove("error");
    }   
});

/////////Reset confirmation alert

function reset_error_yes(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    close_btn = alert.children[2];
    box.innerText = message;
    alert.classList.remove("hide");  
    alert.classList.add("alert-error");
    close_btn.classList.add("alert-error-btn");        
    alert.classList.add("show");     	
}

//Confirmation alert

function reset_error_none(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    box.innerText = message;
    alert.classList.remove("hide");     
    alert.classList.add("show"); 		
}


//Form validation

const form_reset = document.getElementById('form-reset');

const password = document.getElementById('password_value_2');
const password_repeat = document.getElementById('password_value_2_repeat');

const sec_small = document.getElementById('secondary');

function clear_err(){
    let parent_2 = sec_small.parentNode;
    parent_2.classList.remove("cred-error");
}

password.addEventListener("focus", clear_err);
password_repeat.addEventListener("focus", clear_err);

let form_pick = sessionStorage.getItem("form");

if(form_pick == "reset_form"){    
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error =="emptyinput"){        
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");                
                badCredentials(password, 'Pola nie mogą być puste');                             
            }
        }
    } 
    if(error =="passwordsdontmatch"){        
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");                
                badCredentials(password, 'Hasła nie są jednakowe');                             
            }
        }
    }  
    if(error == "stmtfailed"){
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");
                reset_error_yes('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.'); 
                const msg_btn_1 = document.getElementById('msg-btn-1');
                msg_btn_1.addEventListener("click", function(){
                    hide_notification(msg_btn_1);
                }); 
                
            }
        }        
    } 
}

form_reset.addEventListener('submit', e => {	
    	
    let result = checkInputs_1();

    let action = 'another_reset';															
    sessionStorage.setItem('action', action);

    if(result !== true){
        e.preventDefault();
    }
});

function checkInputs_1() {

    let password_control = false;
    let password_control_2 = false;
    let valid = true;

    const passwordValue = password.value.trim();
    const passwordValueRepeat = password_repeat.value.trim();
    
	if(passwordValue === '') {
		setErrorFor(password, 'Hasło nie może być puste');
	} else if(passwordValue.length < 3){
		setErrorFor(password, 'Hasło musi mieć min. 3 znaki');        
    } else {
        password_control = true;
	}
	
	if(passwordValueRepeat === '') {
		setErrorFor(password_repeat, 'Hasło nie może być puste');
	} else if(passwordValue !== passwordValueRepeat) {
        setErrorFor(password_repeat, 'Hasła nie są jednakowe');
	} else{
        password_control_2 = true;
    }

    if(!password_control || !password_control_2 ){
        return valid=false;
    } else{
        return valid;
    }
}

function setErrorFor(input, message) {
    const div = input.parentElement;
    const small = div.querySelector('small');
    div.className = 'div error';
    small.innerText = message;
}

function badCredentials(input, message) {
    const div = input.parentElement;
    const small = document.getElementById('secondary');
    div.className = 'div cred-error';
    small.innerText = message;    
}

//Password visibility 

const eye_toggle_2 = document.querySelector(".eye-toggle-2");
const eye_toggle_3 = document.querySelector(".eye-toggle-3");

eye_toggle_2.addEventListener('click', function(){

    state = eye_toggle_2.classList.toggle('fa-eye-slash');

    if(password_value_2.type === "password"){
        password_value_2.type = "text";
    } else{
        password_value_2.type = "password";
    }
});

eye_toggle_3.addEventListener('click', function(){

    state = eye_toggle_3.classList.toggle('fa-eye-slash');

    if(password_value_2_repeat.type === "password"){
        password_value_2_repeat.type = "text";
    } else{
        password_value_2_repeat.type = "password";
    }
});














