
function dropdown_menu_1(){

    const drop_1 = document.getElementById('drop-1');
    const cog_1 = document.getElementById('cog-1');

    cog_1.classList.toggle("rotate-cog");

    if(drop_1.classList.contains("hide")){          
        drop_1.className = 'drop show';  
    } else{
        drop_1.className = 'drop hide';              
    } 
}

document.addEventListener("click", (evt) => {

    const drop_1 = document.getElementById("drop-1");
    const cog_1 = document.getElementById("cog-1");

    let targetElement = evt.target; 

    do {
        if (targetElement == drop_1 || targetElement == cog_1) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);   

    if(drop_1.classList.contains("show")){          
        cog_1.classList.toggle("rotate-cog");
        drop_1.className = 'drop hide'; 
    }
});


function checkUnsavedFormChanges(){

        if($('#main-container form').serialize() !== formContent.data('serializeContent')){
            return true;
        } else{
            return false;
        }
}

function findArrayId(array, currentId){

    for(let i=0; i<array.length; i++){
        subArrayTmp = array[i];
        for(let i=0; i<subArrayTmp.length; i++){
            if(subArrayTmp[i].formId == currentId){
                desiredArray = subArrayTmp;
                return desiredArray;
            }
        }
    }
}

function matchFormArrays(arrayCurr, arrayOvr){    

    if(currentId = arrayCurr[0].formId){
        if(primaryFormArray = findArrayId(arrayOvr, currentId)){
            if(JSON.stringify(primaryFormArray) === JSON.stringify(arrayCurr)){
                return true;
            }else {
                return false;
            }
        }
    }

}

function getCurrentFormArray(arraySerializedCurr, arrayCurr){

    let CurrentFormContentArray = [];
    
    formId = arrayCurr.id;
	CurrentFormContentArray.push({"formId" : formId});

    $.each(arraySerializedCurr.split('&'), function (index, elem) {
        let vals = elem.split('='); 
        CurrentFormContentArray.push({"name" : vals[0], "value" : vals[1]}); 
    });

    return CurrentFormContentArray;

}

const ui = {
    confirm: async (message) => createConfirm(message)
}

function createConfirm(message) {

    return new Promise((complete, failed)=>{

    $(".active-popup h1").text(message)

    $('#popup-yes').on('click', ()=> { complete(true); });
    $('#popup-no').on('click', ()=> { complete(false); });    

    $('.popup-container').show();
    $('.active-popup').show();

    });
    
}

async function displayUnsavedAlert(){

    confirm_accordion.setAttribute("type", "button");
	confirm_accordion.removeAttribute("form");
	confirm_accordion.setAttribute("name", "restore_content");

    const confirm = await ui.confirm('Nie zapisano zmian.\nCzy potwierdzasz wyjście?');
    
    if(confirm){
      return true;
    } else{
      return false;
    }
}

function restoreFormPrimaryContent(currentForm, formContentArray, currentId){

    primaryFormArray = findArrayId(formContentArray, currentId);
    let formEntries = Object.values(currentForm);

    for (let key in formEntries) {
		if(formEntries[key].nodeName === "INPUT" || formEntries[key].nodeName === "TEXTAREA"){
            for(let i = 0; i < primaryFormArray.length; i++){
                if(primaryFormArray[i].name === formEntries[key].name){
                    formEntries[key].value = decodeURIComponent(primaryFormArray[i].value);                    
                }  
            }

		}
	}
}

///////////Switching editing fields

edit_accordion_buttons = document.querySelectorAll('.edit-accordion-content');
let edit_button = false;
edit_accordion_buttons.forEach( button => {
	button.addEventListener("click", switchAccordionAccess);  
});

async function switchAccordionAccess(){
    
    if(edit_button){

        thisFormContent = $(this.form).serialize();
        currentForm = this.form;
        currentId = currentForm.id;
        CurrentFormContentArray = getCurrentFormArray(thisFormContent, currentForm);

        if(!matchFormArrays(CurrentFormContentArray, formContentArray)){
            if(await displayUnsavedAlert()){
                restoreFormPrimaryContent(currentForm, formContentArray, currentId);                
            } else{
                return;
            }
        }

    }

    let parent = this.parentNode.parentNode;
    let input = parent.getElementsByTagName("textarea");
    let title_input = parent.getElementsByTagName("input")[0];

    for (i = 0; i < input.length; i++) {

        x = input[i];

        if(x.getAttribute("readonly")){
            x.removeAttribute("readonly");
            title_input.removeAttribute("readonly");
            this.classList.add("btn-change-accordion-content");
            title_input.classList.add("accordion-content-edit");
            parent.classList.add("accordion-content-edit");

            edit_button = true;

        }else{
            x.setAttribute("readonly", "readonly");
            title_input.setAttribute("readonly", "readonly");        
            this.classList.remove("btn-change-accordion-content");
            title_input.classList.remove("accordion-content-edit");
            title_input.classList.remove("input-title-error-background");
            parent.classList.remove("accordion-content-edit");

            edit_button = false;        
        }       
    }
    
}

buttons = document.querySelectorAll('.btn-edit');

buttons.forEach( button => {
	button.addEventListener("click", switchAccess);  
});

function switchAccess(){  
        let parent = this.parentNode;
        let input = parent.getElementsByTagName("input")[0];
        if(input.getAttribute("readonly")){
            input.removeAttribute("readonly");
            this.classList.add("btn-change");
        }else{
            input.setAttribute("readonly", "readonly");
            this.classList.remove("btn-change");
        }        
}


////////Form Validation////////////////////////////////

//Click animations

const inputs_update = document.querySelectorAll(".form-control");
const sec_small_update = document.getElementById("secondary-update");

function addcl(){
    let parent = this.parentNode;
    let parent_2 = sec_small_update.parentNode;
    parent.classList.remove("error");    
    parent_2.classList.remove("cred-error");    
}

inputs_update.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener('input', addcl);
    if(input.value !== ""){
        let parent_2 = input.parentNode;
        parent_2.classList.remove("error");
    }   
});

if(name_update = document.getElementById('name_value')){

        name_update.addEventListener("keyup", function () {
            if(name_update.value.length >= 30){
                setErrorFor(name_update, 'Maksymalnie 30 znaków');        
            }else{
                parent_2 = name_update.parentNode;
                parent_2.classList.remove("error");
            }
        });
        
    }

if(button = document.getElementById('validate-update-btn')){

    button.addEventListener('click', e => {

            e.preventDefault(); 
            ValidateUserUpdate();
    });

}

function ValidateUserUpdate(){   
    
    let result = checkInputs_update();
        
    if(result == true){
        popUpBox_1(button);
    }   
          
}

function popUpBox_1(button){

    let button_type = button.getAttribute("id");

    const no = document.getElementById('no-1');
    const yes = document.getElementById('yes-1');

    const popup_cover = document.getElementById('popup-box-cover-1');
    const popup_box = document.getElementById('popup-box-1');

    popup_cover.classList.remove("hide-popup-box");
    popup_box.classList.remove("hide-popup-box");
    
    if(button_type == "validate-update-btn"){

        update_form = document.getElementById('update-form'); 

        no.addEventListener('click', function(){
            popup_cover.classList.add("hide-popup-box");
            popup_box.classList.add("hide-popup-box");
        });
              
        yes.setAttribute("form", "update-form");

        update_form.addEventListener('submit', e => {	
    	
            let result = checkInputs_update();
        
            let action = 'another_update';															
            sessionStorage.setItem('action', action);
        
            if(result !== true){
                popup_cover.classList.add("hide-popup-box");
                popup_box.classList.add("hide-popup-box");
                e.preventDefault();                
            }
        });     
    }
    
}

const name_1 = document.getElementById('name_value');
const login = document.getElementById('login_value');
const password = document.getElementById('password_value');
const password_repeat = document.getElementById('password_value_repeat');

function checkInputs_update() {

    let name_control = false;
    let login_control = false;
    let password_control = false;
    let password_control_2 = false;

    const nameValue = name_1.value.trim();
	const loginValue = login.value.trim();
	const passwordValue = password.value.trim();
    const passwordValueRepeat = password_repeat.value.trim();

    if(nameValue === '') {
		setErrorFor(name_1, 'Nazwa nie może być pusta');
	} else if(nameValue.length > 30){
		setErrorFor(name_1, 'Nazwa zbyt długa');        
    } else if (!isName(nameValue)) {
		setErrorFor(name_1, 'Usuń znaki specjalne');
	} else {
        name_control = true;
	}
    
    if(loginValue === '') {
		setErrorFor(login, 'Login nie może być pusty');
	} else if (hasSpaces(loginValue)) {
		setErrorFor(login, 'Usuń spacje');
	} else if(loginValue.length > 60){
		setErrorFor(login, 'Login zbyt długi');        
    } else {
        login_control = true;
    }

    if(passwordValue === '' && passwordValueRepeat === ''){
        password_control = true;
        password_control_2 = true;
    } else{

        if(passwordValue.length < 3){
            setErrorFor(password, 'Hasło musi mieć min. 3 znaki'); 
        } else{
            password_control = true;
        }
        
        if(passwordValue !== passwordValueRepeat) {
            setErrorFor(password_repeat, 'Hasła nie są jednakowe');
        } else{
            password_control_2 = true;
        }
    }
	
    if(!password_control || !login_control || !password_control_2 || !name_control){
        return false;
    } else {
        
        inputs_update.forEach(input => {                
                let parent_2 = input.parentNode;               
                parent_2.classList.remove("error");
        });

        return true;
    }
    
}

///////Error inputs

function setErrorFor(input, message) {
    const div = input.parentElement;
    const small = div.querySelector('small');
    div.className = 'div error';
    small.innerText = message;
}

function badCredentialsUpdate(input, message) {
    const div = input.parentElement;
    const small = document.getElementById("secondary-update");
    div.className = 'div cred-error';
    small.innerText = message;    
}

///////Testing

function isName(name){
    return /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/.test(name);
}

function hasSpaces(value){
    return /\s/g.test(value); 
}

///////////////////////////////////////////////////////////////////////////////

///////////Alert handler

if(form_pick = sessionStorage.getItem("form")){

    if(form_pick == "update_form"){
        let error = sessionStorage.getItem("error");      
        sessionStorage.removeItem("form");  
        sessionStorage.removeItem("error");
        if(error =="timexpired"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action");                                  
                    update_error_yes('Sesja wygasła. \n Wpisz ponownie hasło'); 
                    const msg_btn_1 = document.getElementById('msg-btn-1');
                    msg_btn_1.addEventListener("click", function(){
                        hide_notification(msg_btn_1);
                    });                          
                }
            }
        }
        if(error =="stmtfailed"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action");                                  
                    update_error_yes('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');
                    const msg_btn_1 = document.getElementById('msg-btn-1');
                    msg_btn_1.addEventListener("click", function(){
                        hide_notification(msg_btn_1);
                    });                          
                }
            }
        }
        if(error =="updated"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action");                                  
                    update_error_none('Dane zaktualizowane pomyślnie');
                    const msg_btn_1 = document.getElementById('msg-btn-1');
                    msg_btn_1.addEventListener("click", function(){
                        hide_notification(msg_btn_1);
                    });                          
                }
            }
        }
        if(error =="passwordsdontmatch"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action"); 
                    setErrorFor(password_repeat, 'Hasła nie są jednakowe');                                         
                }
            }
        }
        if(error =="emptyinput"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action");                
                    badCredentialsUpdate(name_1, 'Pola nie mogą być puste');                                          
                }
            }
        }
        if(error =="invalidname"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action"); 
                    setErrorFor(name_1, 'Nazwa nieprawidłowa');                                         
                }
            }
        }
        if(error =="invalidlogin"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action"); 
                    setErrorFor(login, 'Login nieprawidłowy');                                         
                }
            }
        }
        if(error =="logintaken"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "another_update"){
                    sessionStorage.removeItem("action"); 
                    setErrorFor(login, 'Login zajęty');                                         
                }
            }
        }  
    } else if(form_pick == "reset_form"){
        let error = sessionStorage.getItem("error");      
        sessionStorage.removeItem("form");  
        sessionStorage.removeItem("error");
        if(error =="timexpired"){
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
        } if(error =="emaildontmatch"){
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
        } if(error =="stmtfailed"){
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
        } if(error =="tokendontmatch"){
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
    } else if(form_pick == "profile_form"){
        let error = sessionStorage.getItem("error");      
        sessionStorage.removeItem("form");  
        sessionStorage.removeItem("error");
        if(error == "stmtfailed"){
            if(action_msg = sessionStorage.getItem("action")){
                if(action_msg == "profile_attempt"){
                    sessionStorage.removeItem("action");                                  
                    data_error_yes('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');  
                    const msg_btn_1 = document.getElementById('msg-btn-1');
                    msg_btn_1.addEventListener("click", function(){
                        hide_notification(msg_btn_1);
                    });                     
                }
            }
        }
    }   
}

///////// Alert

function reg_error_yes(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    close_btn = alert.children[2];
    box.innerText = message;
    alert.classList.remove("hide-alert");  
    alert.classList.add("alert-error");
    close_btn.classList.add("alert-error-btn");        
    alert.classList.add("show-alert");     	
}

function reset_error_yes(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    close_btn = alert.children[2];
    box.innerText = message;
    alert.classList.remove("hide-alert");  
    alert.classList.add("alert-error");
    close_btn.classList.add("alert-error-btn");        
    alert.classList.add("show-alert");     	
}

function data_error_yes(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    close_btn = alert.children[2];
    box.innerText = message;
    alert.classList.remove("hide-alert");  
    alert.classList.add("alert-error");
    close_btn.classList.add("alert-error-btn");        
    alert.classList.add("show-alert");     	
}

function update_error_yes(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    close_btn = alert.children[2];
    box.innerText = message;
    alert.classList.remove("hide-alert");  
    alert.classList.add("alert-error");
    close_btn.classList.add("alert-error-btn");        
    alert.classList.add("show-alert");     	
}

function update_error_none(message){
    const alert = document.getElementById('alert_1');
    box = alert.children[1];
    box.innerText = message;
    alert.classList.remove("hide-alert");     
    alert.classList.add("show-alert"); 		
}

//////// Hiding notifications

function hide_notification(msg_button){
    let parent = msg_button.parentNode;
    parent.classList.add("hide-show-alert");    
}

///// Switching password visibility

if((eye_toggle_1 = document.querySelector(".eye-toggle-1")) && (eye_toggle_2 = document.querySelector(".eye-toggle-2"))){
 

eye_toggle_1.addEventListener('click', function(){

    eye_toggle_1.classList.toggle('fa-eye-slash');

    if(password.type === "password"){
        password.type = "text";
    } else{
        password.type = "password";
    }
});

eye_toggle_2.addEventListener('click', function(){

    eye_toggle_2.classList.toggle('fa-eye-slash');

    if(password_repeat.type === "password"){
        password_repeat.type = "text";
    } else{
        password_repeat.type = "password";
    }
});

}

//////Accordion 

let link = document.querySelectorAll(".accordion-link");

link.forEach(selected_link => {selected_link.addEventListener("click", switch_visibility);});

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

if(textarea = document.querySelectorAll('.autoresizing-accordion-content')){
    textarea.forEach( textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.addEventListener('input', autoResize);  
    });
}

if(accordion_title = document.querySelectorAll(".accordion-content-title")){
    accordion_title.forEach(selected_accordion_title => {selected_accordion_title.addEventListener("blur", function(){
        this.scrollLeft = "0px";
        });
    });    
}

async function switch_visibility(event){

    accordion_content_title = this.querySelector(".accordion-content-title");

    if(accordion_content_title.getAttribute("readonly")!=='readonly'){
        let target = event.target;

        if (target === accordion_content_title || accordion_content_title.contains(target)) {
            return;
        }
    }

    icon = this.querySelector('.fas'); 
    
    if(icon.classList.contains("fa-plus")){          
        icon.className = 'fas fa-minus'; 
    } else{

        let currentForm = this.closest("form");
        thisFormContent = $(currentForm).serialize();
        currentId = currentForm.id;
        CurrentFormContentArray = getCurrentFormArray(thisFormContent, currentForm);
       
        if(!matchFormArrays(CurrentFormContentArray, formContentArray)){
            
            if(await displayUnsavedAlert()){
                restoreFormPrimaryContent(currentForm, formContentArray, currentId);               
            } else{
                return;
            }
        }
            let parent = this.parentNode;
            let button = parent.querySelector('.edit-accordion-content');
            
            let input = parent.getElementsByTagName("textarea");
            let title_input = parent.getElementsByTagName("input")[0];
        
            for (i = 0; i < input.length; i++) {
        
                x = input[i];
        
                if(!x.getAttribute("readonly")){
                    x.setAttribute("readonly", "readonly");
                    title_input.setAttribute("readonly", "readonly");        
                    button.classList.remove("btn-change-accordion-content");
                    title_input.classList.remove("accordion-content-edit");
                    title_input.classList.remove("input-title-error-background");
                    parent.classList.remove("accordion-content-edit");

                    edit_button = false;
                }       
            }

        icon.className = 'fas fa-plus';
              
    }
   
    accordion_item = this.parentNode;    
    accordion_content = accordion_item.querySelector(".answer-parent");
    accordion_item.classList.toggle('display-accordion');
    accordion_content.classList.toggle('display-accordion-content');

}

let contentCount = 0;
//Ile wyświetlonych elementów
let contentMove = 5;

let contentSearchCount = 0;
//Ile wyświetlonych elementów po wyszukaniu
let contentSearchMove = 5;
let searchTmp = '';

$('#main-container').on('click', '#see-more-content', function(){
   
    // cache the button reference
    let $this = $(this);
    // disable the button
    $this.attr("disabled", 'disabled');
    see_more_content($this);
    
});

$('#main-container').on('click', '#rewind-content', function(){

    // cache the button reference
    let $this = $(this);
    // disable the button
    $this.attr("disabled", 'disabled');
    see_previous_content($this);

});

function see_more_content(button){
    
    $.ajax({
        type: "POST",
        url: 'DATABASE_HAND/check-for-content.php',
        data: {
            action: "defaultContent",
            contentCheckMore: contentCount,
            contentMoveCount: contentMove,         
        },
        dataType:'JSON',
    }).done(async function (response){
        
        button.removeAttr("disabled");
            
            if (response.content === 1){
                if(checkUnsavedFormChanges()){
                    if(!await displayUnsavedAlert()){
                        return;                                        
                    }
                }

                    contentCount = contentCount + contentMove;                    
        
                    $('#main-container').load("DATABASE_HAND/load-more-content.php", {
                        contentNewCount: contentCount,
                        contentMoveCount: contentMove,
                    }, function(response, statusText, xhr){
                    
                        if(statusText == "success"){
                            //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
                        }
                        
                        if(statusText == "error"){
            
                            console.log("Error: " + xhr.status + ": " + xhr.statusText);
                            
                            if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                                hide_content_notification(content_alert);
                                $(content_alert).one(animationEvent, function(){
                                    reset_read_more();
                                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                                    
                                });
                            } else{
                                    hide_read_more();
                                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                            }
                            
                        }
                        
                    });                
            }

    }).fail(function (response, statusText, xhr) {

        console.log("Error: " + xhr + ": " + statusText);
            
        if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
            hide_content_notification(content_alert);
            $(content_alert).one(animationEvent, function(){
                reset_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
                
            });
        } else{
                hide_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
        }

    });

}

function see_previous_content(button){
   
    $.ajax({
        type: "POST",
        url: 'DATABASE_HAND/check-for-content.php',
        data: {
            action: "defaultContent",
            contentCheckLess: contentCount,
            contentMoveCount: contentMove,         
        },
        dataType:'JSON',
    }).done(async function (response){
        
        button.removeAttr("disabled");
            
        if (response.content === 1){
            
            if(checkUnsavedFormChanges()){
                if(!await displayUnsavedAlert()){
                    return;                                        
                }
            }
            
            contentCount = contentCount - contentMove;

            $('#main-container').load("DATABASE_HAND/load-more-content.php", {
                contentNewCount: contentCount,
                contentMoveCount: contentMove,
            }, function(response, statusText, xhr){
                
                if(statusText == "success"){
                    //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
                }
                
                if(statusText == "error"){
    
                    console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    
                    if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                        hide_content_notification(content_alert);
                        $(content_alert).one(animationEvent, function(){
                            reset_read_more();
                            show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                            
                        });
                    } else{
                            hide_read_more();
                            show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                    }
                    
                }
                
            });
        } 

    }).fail(function (response, statusText, xhr) {
        
        console.log("Error: " + xhr + ": " + statusText);
            
        if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
            hide_content_notification(content_alert);
            $(content_alert).one(animationEvent, function(){
                reset_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
                
            });
        } else{
                hide_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
        }

    });

}

////////////////////////////////////////////////////////////////

async function load_content(){

    if(checkUnsavedFormChanges()){
        if(!await displayUnsavedAlert()){
            return;                                        
        }
    }

    contentCount = 0;

    $('#main-container').load("DATABASE_HAND/load-more-content.php", {
        contentNewCount: contentCount,
        contentMoveCount: contentMove,
    }, function(response, statusText, xhr){
    
        if(statusText == "success"){
            //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
        }
        
        if(statusText == "error"){

            console.log("Error: " + xhr.status + ": " + xhr.statusText);
            
            if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                hide_content_notification(content_alert);
                $(content_alert).one(animationEvent, function(){
                    reset_read_more();
                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                    
                });
            } else{
                    hide_read_more();
                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
            }
            
        }
        
    });

}

async function load_search_content(search){

    if(checkUnsavedFormChanges()){
        if(!await displayUnsavedAlert()){
            return;                                        
        }
    }
    
    contentSearchCount = 0;

    $('#main-container').load("DATABASE_HAND/search.php", {	
        formData : {
            action: "search_bar",
            search: search,
            contentSearchNewCount: contentSearchCount,
            contentSearchMoveCount: contentSearchMove,
        }
    }, function(response, statusText, xhr){
        
        if(statusText == "success"){
            //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
        }
        
        if(statusText == "error"){

            console.log("Error: " + xhr.status + ": " + xhr.statusText);
            
            if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                hide_content_notification(content_alert);
                $(content_alert).one(animationEvent, function(){
                    reset_read_more();
                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                    
                });
            } else{
                    hide_read_more();
                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
            }
            
        }
        
    });

    searchTmp = search;

}

async function load_specific_content(id){

    if(checkUnsavedFormChanges()){
        if(!await displayUnsavedAlert()){
            return;                                        
        }
    }

    contentSearchCount = 0;

    $('#main-container').load("DATABASE_HAND/search.php", {
        formData : {
            action: "search_bar",
            search_id: id,
            contentSearchNewCount: contentSearchCount,
            contentSearchMoveCount: contentSearchMove,
        }
    }, function(response, statusText, xhr){
        
        if(statusText == "success"){
            //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
        }
        
        if(statusText == "error"){

            console.log("Error: " + xhr.status + ": " + xhr.statusText);
            
            if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                hide_content_notification(content_alert);
                $(content_alert).one(animationEvent, function(){
                    reset_read_more();
                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                    
                });
            } else{
                    hide_read_more();
                    show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
            }
            
        }
        
    });

    searchTmp = id;

}

$('#main-container').on('click', '#see-more-search-content', function(){
    
    // cache the button reference
    let $this = $(this);
    // disable the button
    $this.attr("disabled", 'disabled');

    let search = $('#search-input').val();
    search = search.trim();
    
    if(search === null || (/^ *$/).test(search)){
        
        load_content();        

    } else if(searchTmp !== search){

        load_search_content(search);

    } else{      
        see_more_search_content($this, search);
    }
    
});

$('#main-container').on('click', '#rewind-search-content', function(){

    // cache the button reference
    let $this = $(this);
    // disable the button
    $this.attr("disabled", 'disabled');

    let search = $('#search-input').val();
    search = search.trim();
    
    if(search === null || (/^ *$/).test(search)){
        
        load_content();    

    } else if(searchTmp !== search){

        load_search_content(search);

    } else{
        see_previous_search_content($this, search);
    }

}); 

function see_more_search_content(button, search){    

    $.ajax({
        type: "POST",
        url: 'DATABASE_HAND/check-for-content.php',
        data: {
            action: "searchContent",
            search: search,
            contentSearchCheckMore: contentSearchCount,
            contentSearchMoveCount: contentSearchMove,         
        },
        dataType:'JSON',
    }).done(async function (response){
        
        button.removeAttr("disabled");
        
            if (response.content === 1){

                if(checkUnsavedFormChanges()){
                    if(!await displayUnsavedAlert()){
                        return;                                        
                    }
                }
                
                contentSearchCount = contentSearchCount + contentSearchMove;
        
                $('#main-container').load("DATABASE_HAND/search.php", {	
                    formData : {
                        action: "search_bar",
                        search: search,
                        contentSearchNewCount: contentSearchCount,
                        contentSearchMoveCount: contentSearchMove,
                    }
                }, function(response, statusText, xhr){
                    
                    if(statusText == "success"){
                        //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
                    }
                    
                    if(statusText == "error"){
        
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                        
                        if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                            hide_content_notification(content_alert);
                            $(content_alert).one(animationEvent, function(){
                                reset_read_more();
                                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                                
                            });
                        } else{
                                hide_read_more();
                                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                        }
                        
                    }
                    
                });

            }
            
    }).fail(function (response, statusText, xhr) {

        console.log("Error: " + xhr + ": " + statusText);
            
        if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
            hide_content_notification(content_alert);
            $(content_alert).one(animationEvent, function(){
                reset_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
                
            });
        } else{
                hide_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
        }

    });
   

}

function see_previous_search_content(button, search){
 
    $.ajax({
        type: "POST",
        url: 'DATABASE_HAND/check-for-content.php',
        data: {
            action: "searchContent",
            search: search,
            contentSearchCheckLess: contentSearchCount,
            contentSearchMoveCount: contentSearchMove,          
        },
        dataType:'JSON',
    }).done(async function (response){
        
        button.removeAttr("disabled");
            
        if (response.content === 1){

            if(checkUnsavedFormChanges()){
                if(!await displayUnsavedAlert()){
                    return;                                        
                }
            }
            
            contentSearchCount = contentSearchCount - contentSearchMove;

            $('#main-container').load("DATABASE_HAND/search.php", {	
                formData : {
                    action: "search_bar",
                    search: search,
                    contentSearchNewCount: contentSearchCount,
                    contentSearchMoveCount: contentSearchMove,
                }
            }, function(response, statusText, xhr){
                
                if(statusText == "success"){
                    //console.log("Response code: " + xhr.status + ": " + xhr.statusText);
                }
                
                if(statusText == "error"){
    
                    console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    
                    if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
                        hide_content_notification(content_alert);
                        $(content_alert).one(animationEvent, function(){
                            reset_read_more();
                            show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                            
                        });
                    } else{
                            hide_read_more();
                            show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + xhr.status + ': ' + xhr.statusText, content_alert);
                    }
                    
                }
                
            });
        }

    }).fail(function (response, statusText, xhr) {

        console.log("Error: " + xhr + ": " + statusText);
            
        if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
            hide_content_notification(content_alert);
            $(content_alert).one(animationEvent, function(){
                reset_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
                
            });
        } else{
                hide_read_more();
                show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
        }

    });

}


$(document).ajaxComplete(function(event, xhr, settings) {
    
    if(settings.url === "DATABASE_HAND/load-more-content.php" || settings.url === "DATABASE_HAND/search.php"){

        let link = document.querySelectorAll(".accordion-link");
        link.forEach(selected_link => {selected_link.addEventListener("click", switch_visibility);});

        edit_accordion_buttons = document.querySelectorAll('.edit-accordion-content');
        edit_accordion_buttons.forEach( button => {button.addEventListener("click", switchAccordionAccess);});

        if(textarea = document.querySelectorAll(".autoresizing-accordion-content")){
            textarea.forEach( textarea => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
                textarea.addEventListener('input', autoResize);  
            });
        }

        if(accordion_title = document.querySelectorAll(".accordion-content-title")){
            accordion_title.forEach(selected_accordion_title => {selected_accordion_title.addEventListener("blur", function(){
                this.scrollLeft = "0px";
                });
            });    
        }
    }
   
});



