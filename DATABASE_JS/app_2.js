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
    input.addEventListener('input', addcl);
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

if(form_1 = document.getElementById('form1')){
 
form_1.addEventListener('submit', e => {	

    let action = 'another_confirmation';															
    sessionStorage.setItem('action', action);
    	
    let result = checkInputs_1();

    if(result !== true){
        e.preventDefault();
    }

});

}

function checkInputs_1() {

    const password = document.getElementById('password');

    let password_control = false;
    let valid = true;

	const passwordValue = password.value.trim();
	
	if(passwordValue === '') {
		setErrorFor(password, 'Hasło nie może być puste');
	} else if (passwordValue.length < 3) {
		setErrorFor(password, 'Hasło musi mieć minimum 3 znaki');
	} else {
        password_control = true;
	}

    if(!password_control){
        return valid=false;
    } else{
        return valid;
    }
}

let form_pick = sessionStorage.getItem("form");

if(form_pick == "confirm_form"){
    let error = sessionStorage.getItem("error");      
    sessionStorage.removeItem("form");  
    sessionStorage.removeItem("error");
    if(error =="wrongpassword"){        
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_confirmation"){
                sessionStorage.removeItem("action");         
                setErrorFor(password, 'Błędne hasło');                             
            }
        }
    }
    if(error =="emptyinput"){        
        if(action_msg = sessionStorage.getItem("action")){
            if(action_msg == "another_confirmation"){
                sessionStorage.removeItem("action");         
                setErrorFor(password, 'Hasło nie może być puste');                             
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
 
//Password visibility 

if(eye_toggle = document.querySelector(".eye-toggle")){

    const password = document.getElementById('password');

eye_toggle.addEventListener('click', function(){

    state = eye_toggle.classList.toggle('fa-eye-slash');

    if(password.type === "password"){
        password.type = "text";
    } else{
        password.type = "password";
    }
});

}
















