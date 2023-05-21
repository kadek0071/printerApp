//Content loader

window.addEventListener('load', () => {
    const web_content = document.querySelector('.web-content');
    web_content.classList.remove("web-content");   
});

/*
window.onload = function() {
    document.getElementById('form1').reset();
    document.getElementById('form2').reset();
}
*/

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

const form_1_move = document.getElementById("form-container");
const form_2_move = document.getElementById("form-container-2");
let btn = document.getElementById("btn");

function login(){
    
    form_1_move.style.transitionDuration = "0.5s";
    form_2_move.style.transitionDuration = "0.5s";
    
    form_1_move.style.transform = "translateX(0%)";
    btn.style.transform = "translateX(0%)";
    form_2_move.style.transform = "translateX(30%)";
   
}

function register(){

    form_1_move.style.transitionDuration = "0.5s";
    form_2_move.style.transitionDuration = "0.5s";

    form_1_move.style.transform = "translateX(-130%)";
    btn.style.transform = "translateX(100%)";
    form_2_move.style.transform = "translateX(-100%)";
}

/////////Registration confirmation alert

function reg_error_none(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    box.innerText = message;
    alert.classList.remove("hide");     
    alert.classList.add("show");
}

function reg_error_yes(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    close_btn = alert.children[2];
    box.innerText = message;
    alert.classList.remove("hide");  
    alert.classList.add("alert-error");
    close_btn.classList.add("alert-error-btn");        
    alert.classList.add("show");     	
}

function reset_error_none(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    box.innerText = message;
    alert.classList.remove("hide");     
    alert.classList.add("show"); 		
}

//////// Hiding notifications

function hide_notification(msg_button){
    let parent = msg_button.parentNode;
    parent.classList.add("hide-show");    
}

//Form validation

const form_1 = document.getElementById('form1');
const form_2 = document.getElementById('form2');

const login_1 = document.getElementById('login_value_1');
const login_2 = document.getElementById('login_value_2');

const email_2 = document.getElementById('email_value_2');

const password_1 = document.getElementById('password_value_1');
const password_2 = document.getElementById('password_value_2');
const password_2_repeat = document.getElementById('password_value_2_repeat');

const name_2 = document.getElementById('nazwa_value_2');

let form_pick = sessionStorage.getItem("form");

if(form_pick == "log_form"){    
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error =="wrongloginpassword"){        
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_log"){
                sessionStorage.removeItem("action");         
                badCredentialsLog(login_1, 'Błędny login lub hasło');                             
            }
        }
    } 
    if(error =="emptyinput"){        
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_log"){
                sessionStorage.removeItem("action");                
                badCredentialsLog(login_1, 'Pola nie mogą być puste');                             
            }
        }
    }  
}

const sec_small_log = document.getElementById('secondary-log');
const sec_small_reg = document.getElementById('secondary-reg');

function clear_err_log(){
    let parent_2 = sec_small_log.parentNode;
    parent_2.classList.remove("cred-error");
}

function clear_err_reg(){
    let parent_2 = sec_small_reg.parentNode;
    parent_2.classList.remove("cred-error");
}

login_1.addEventListener("focus", clear_err_log);
password_1.addEventListener("focus", clear_err_log);

name_2.addEventListener("focus", clear_err_reg);
login_2.addEventListener("focus", clear_err_reg);
email_2.addEventListener("focus", clear_err_reg);
password_2.addEventListener("focus", clear_err_reg);
password_2_repeat.addEventListener("focus", clear_err_reg);

name_2.addEventListener("keyup", function () {
    if(name_2.value.length >= 30){
		setErrorFor(name_2, 'Maksymalnie 30 znaków');        
    }else{
        parent_2 = name_2.parentNode;
        parent_2.classList.remove("error");
    }
});


if(form_pick == "reg_form"){
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error == "emptyinput"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action"); 
                badCredentialsReg(name_2, 'Pola nie mogą być puste');                        
            }
        }           
    } 
    if(error == "invalidname"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                setErrorFor(name_2, 'Niepoprawna nazwa');                           
            }
        }              
    } 
    if(error == "invalidlogin"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                setErrorFor(login_2, 'Niepoprawny login');                           
            }
        }              
    } 
    if(error == "logintaken"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                setErrorFor(login_2, 'Login zajęty');                             
            }
        }  
    }  
    if(error == "emailtaken"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                setErrorFor(email_2, 'Email zajęty');                            
            }
        }      
    } 
    if(error == "passwordsdontmatch"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                setErrorFor(password_2_repeat, 'Hasła nie są jednakowe');                            
            }
        }           
    } 
    if(error == "invalidemail"){ 
        register(); 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                setErrorFor(email_2, 'Niepoprawny email');                           
            }
        }              
    } 
    if(error == "none"){
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reg"){
                sessionStorage.removeItem("action");                
                reg_error_none('Wysłano pomyślnie, sprawdź pocztę, \n aby dokończyć weryfikację');
                const msg_btn_1 = document.getElementById('msg-btn-1');
                msg_btn_1.addEventListener("click", function(){
                    hide_notification(msg_btn_1);
                });                             
            }
        }
    }
    if(error == "stmtfailed"){
        action_msg = sessionStorage.getItem("action");
        if(action_msg == "another_reg"){
            sessionStorage.removeItem("action");
            reg_error_yes('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');
            const msg_btn_1 = document.getElementById('msg-btn-1');
            msg_btn_1.addEventListener("click", function(){
                hide_notification(msg_btn_1);
            });  
        } 
    }    
}  

if(form_pick == "reg_form_verify"){
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error == "none"){
        action_msg = sessionStorage.getItem("action");
        if(action_msg !== "verified"){
            let action = 'verified';										
            sessionStorage.setItem('action', action);
            reg_error_none('Weryfikacja adresu email pomyślna');
            const msg_btn_1 = document.getElementById('msg-btn-1');
            msg_btn_1.addEventListener("click", function(){
                hide_notification(msg_btn_1);
            });  
        }
    }
    if(error == "accountvalidordoesntmatchvkey"){
        action_msg = sessionStorage.getItem("action");
        if(action_msg !== "verified"){
            let action = 'verified';															
            sessionStorage.setItem('action', action);
            reg_error_yes('Konto zweryfikowane lub autoryzacja nieudana');      	
            const msg_btn_1 = document.getElementById('msg-btn-1');
            msg_btn_1.addEventListener("click", function(){
                hide_notification(msg_btn_1);
            });  
        }        
    }
    if(error == "emailsendfail"){
        action_msg = sessionStorage.getItem("action");
        if(action_msg !== "verified"){
            let action = 'verified';															
            sessionStorage.setItem('action', action);
            reg_error_yes('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');
            const msg_btn_1 = document.getElementById('msg-btn-1');
            msg_btn_1.addEventListener("click", function(){
                hide_notification(msg_btn_1);
            });  
        } 
    }
    if(error == "verificationfailed"){
        action_msg = sessionStorage.getItem("action");
        if(action_msg !== "verified"){
            let action = 'verified';															
            sessionStorage.setItem('action', action);
            reg_error_yes('Błąd weryfikacji email. Skontaktuj się z administratorem');
            const msg_btn_1 = document.getElementById('msg-btn-1');
            msg_btn_1.addEventListener("click", function(){
                hide_notification(msg_btn_1);
            });  
        }    
    }
}

if(form_pick == "reset_form"){
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error == "none"){
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");                
                reset_error_none('Wysłano pomyślnie, sprawdź pocztę, \n aby dokończyć resetowanie hasła');
                const msg_btn_1 = document.getElementById('msg-btn-1');
                msg_btn_1.addEventListener("click", function(){
                    hide_notification(msg_btn_1);
                });                             
            }
        }
    }
    if(error == "updated"){ 
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");                
                reset_error_none('Hasło zostało zmienione pomyślnie');  	
                const msg_btn_1 = document.getElementById('msg-btn-1');
                msg_btn_1.addEventListener("click", function(){
                    hide_notification(msg_btn_1);
                });                              
            }
        }                      
    }
} 

 
form_1.addEventListener('submit', e => {	
    	
    let result = checkInputs_1();

    let action = 'another_log';
    sessionStorage.setItem('action', action);

    if(result !== true){
        e.preventDefault();
    }
});

function checkInputs_1() {

    let login_control = false;
    let password_control = false;

	const loginValue = login_1.value.trim();
	const passwordValue = password_1.value.trim();
	
	if(loginValue === '') {
		setErrorFor(login_1, 'Login nie może być pusty');
	}else{
        login_control = true;
    }
		
	if(passwordValue === '') {
		setErrorFor(password_1, 'Hasło nie może być puste');
	} else if(passwordValue.length < 3){
		setErrorFor(password_1, 'Hasło musi mieć min. 3 znaki');        
    } else{
        password_control = true;
    }

    if(!password_control || !login_control){
        return false;
    } else{

        inputs.forEach(input => {                
            let parent_2 = input.parentNode;               
            parent_2.classList.remove("error");
        });

        return true;
    }
}

form_2.addEventListener('submit', e => {
    
    let result = checkInputs_2();

    let action = 'another_reg';															
    sessionStorage.setItem('action', action);
    	
    if(result !== true){
        e.preventDefault();
    }
    
});

function checkInputs_2() {

    let login_control = false;
    let password_control = false;
    let password_control_2 = false;
    let email_control = false;
    let name_control = false;

    const nameValue = name_2.value.trim();
    const loginValue = login_2.value.trim();
    const emailValue = email_2.value.trim();
    const passwordValue = password_2.value.trim();
    const passwordValueRepeat = password_2_repeat.value.trim();
    
	
	if(nameValue === '') {
		setErrorFor(name_2, 'Nazwa nie może być pusta');
	} else if(nameValue.length > 30){
		setErrorFor(name_2, 'Nazwa zbyt długa');        
    } else if (!isName(nameValue)) {
		setErrorFor(name_2, 'Usuń znaki specjalne');
	} else {
        name_control = true;
	}
    
    if(loginValue === '') {
		setErrorFor(login_2, 'Login nie może być pusty');
	} else if (hasSpaces(loginValue)) {
		setErrorFor(login_2, 'Usuń spacje');
	} else if(loginValue.length > 60){
		setErrorFor(login_2, 'Login zbyt długi');        
    } else {
        login_control = true;
    }
    
	if(emailValue === '') {
		setErrorFor(email_2, 'Email nie może być pusty');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email_2, 'Niepoprawny email');
	} else {
        email_control = true;
	}
	
	if(passwordValue === '') {
		setErrorFor(password_2, 'Hasło nie może być puste');
	} else if(passwordValue.length < 3){
		setErrorFor(password_2, 'Hasło musi mieć min. 3 znaki');        
    } else {
        const clear_pass_repeat = document.getElementById('clear-pass-repeat');
        let clear_pass_repeat_parent_2 = clear_pass_repeat.parentNode;
        clear_pass_repeat_parent_2.classList.remove("error");
        password_control = true;
	}
	
	if(passwordValueRepeat === '') {
		setErrorFor(password_2_repeat, 'Hasło nie może być puste');
	} else if(passwordValue !== passwordValueRepeat) {
        setErrorFor(password_2_repeat, 'Hasła nie są jednakowe');
	} else{
        password_control_2 = true;
    }

    if(!password_control || !login_control || !password_control_2 || !email_control || !name_control){
        return false;
    } else{
        inputs.forEach(input => {                
            let parent_2 = input.parentNode;               
            parent_2.classList.remove("error");
        });
        return true;
    }
}

function setErrorFor(input, message) {
    const div = input.parentElement;
    const small = div.querySelector('small');
    div.className = 'div error';
    small.innerText = message;
}

function badCredentialsLog(input, message) {
    const div = input.parentElement;
    const small = document.getElementById("secondary-log");
    div.className = 'div cred-error';
    small.innerText = message;    
}

function badCredentialsReg(input, message) {
    const div = input.parentElement;
    const small = document.getElementById("secondary-reg");
    div.className = 'div cred-error';
    small.innerText = message;    
}

function isEmail(email) {
	return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
} 

function isSpecialMark(name){
    return /^[a-zA-Z0-9_ ]*$/.test(name);
}

function isName(name){
    return /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(name);
}

function hasSpaces(value){
    return /\s/g.test(value); 
}
   
///// Switching password visibility

const eye_toggle_1 = document.querySelector(".eye-toggle-1");
const eye_toggle_2 = document.querySelector(".eye-toggle-2");
const eye_toggle_3 = document.querySelector(".eye-toggle-3");

eye_toggle_1.addEventListener('click', function(){

    state = eye_toggle_1.classList.toggle('fa-eye-slash');

    if(password_value_1.type === "password"){
        password_value_1.type = "text";
    } else{
        password_value_1.type = "password";
    }
});

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













