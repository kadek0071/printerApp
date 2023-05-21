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

//////// Hiding notifications

function hide_notification(msg_button){
    let parent = msg_button.parentNode;
    parent.classList.add("hide-show");    
}

//Form validation

const form_1 = document.getElementById('form1');

const email = document.getElementById('email');

 
form_1.addEventListener('submit', e => {	
    	
    let result = checkInputs_1();

    let action = 'another_reset';															
    sessionStorage.setItem('action', action); 

    if(result !== true){
        e.preventDefault();
    }

});

function checkInputs_1() {

    let email_control = false;
    let valid = true;

	const emailValue = email.value.trim();
	
	if(emailValue === '') {
		setErrorFor(email, 'Email nie może być pusty');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Niepoprawny email');
	} else {
        email_control = true;
	}

    if(!email_control){
        return valid=false;
    } else{
        return valid;
    }
}

let form_pick = sessionStorage.getItem("form");

if(form_pick == "reset_form"){
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error == "invalidemail"){
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");                
                setErrorFor(email, 'Niepoprawny email');                             
            }
        }
    }
    if(error == "emaildontmatch"){
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");
                reset_error_yes('Adres email jest nieprawidłowy');
                const msg_btn_1 = document.getElementById('msg-btn-1');
                msg_btn_1.addEventListener("click", function(){
                    hide_notification(msg_btn_1);
                }); 
                
            }
        }        
    }
    if(error == "timexpired"){
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_reset"){
                sessionStorage.removeItem("action");
                reset_error_yes('Czas na zmianę hasła wygasł. \n Spróbuj ponownie wysłać email.'); 
                const msg_btn_1 = document.getElementById('msg-btn-1');
                msg_btn_1.addEventListener("click", function(){
                    hide_notification(msg_btn_1);
                }); 
                
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
    if(error == "tokendontmatch"){
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



function setErrorFor(input, message) {
    const div = input.parentElement;
    const small = div.querySelector('small');
    div.className = 'div error';
    small.innerText = message;
}

function isEmail(email) {
	return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
} 















