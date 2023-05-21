
////Content Alert variables

const content_alert = document.getElementById('content-alert');

const content_msg_btn = document.getElementById('content-msg-btn');

/////////////////////////

const msg_content_container = content_alert.querySelector('.msg-content-container');
const read_more = content_alert.querySelector('.content-alert-read-more');

const caret = read_more.querySelector('#main-caret');

const read_more_btn = read_more.querySelector('.read-more-wrap');
const read_more_span = read_more.querySelector('#see-more');

function updateSavedFormArray(arrayCurr, arrayOvr, currentId){
        for(let i=0; i<arrayOvr.length; i++){			
            subArrayTmp = arrayOvr[i];
            for(let a=0; a<subArrayTmp.length; a++){
                if(subArrayTmp[a].formId == currentId){
					arrayOvr[i] = arrayCurr;
					return;
                }
            }
        }
}

function updateDeletedFormArray(arrayOvr, currentId){

	for(let i=0; i<arrayOvr.length; i++){			
		subArrayTmp = arrayOvr[i];
		for(let a=0; a<subArrayTmp.length; a++){
			if(subArrayTmp[a].formId == currentId){
				arrayOvr.splice(i, 1);
				return;
			}
		}
	}
}

alertTimeout = null;

function disableAlert(){
	
	alertTimeout = setTimeout(function(){
		if(content_alert.classList.contains('show-content-alert')){
			hide_content_notification(content_alert);
		}
	}, 6000);	

}

function hide_content_notification(content_alert){
	let alert = content_alert;
	alert.classList.remove("show-content-alert");
	alert.classList.add("hide-show-content-alert");
}

function show_content_notification_error(message, alert){

	alert.classList.remove("hide-show-content-alert");
	alert.classList.add("content-alert-error");

	box_message = alert.querySelector('.msg');
	box_message.innerText = message;

	close_btn = alert.querySelector('#content-msg-btn');		
	close_btn.classList.add("error-close-btn");

	main_icon = alert.querySelector('#main-icon');
	main_icon.className = "fas fa-exclamation-circle";

	alert.classList.add("show-content-alert");
	alert.classList.remove("hide-content-alert");

	msg_content = content_alert.querySelector('.msg-content-container .msg-content');
	clearTimeout(alertTimeout);
	
	if(msg_content.innerHTML.length === 0){
		disableAlert();		
	}
	
}

function show_content_notification_error_none(message, content_alert){

	let alert = content_alert;
	alert.classList.remove("hide-show-content-alert");
	alert.classList.remove("content-alert-error");

	box_message = alert.querySelector('.msg');
	box_message.innerText = message;

	close_btn = alert.querySelector('#content-msg-btn');		
	close_btn.classList.remove("error-close-btn");

	main_icon = alert.querySelector('#main-icon');
	main_icon.className = "fas fa-check-circle"; 

	alert.classList.add("show-content-alert");
	alert.classList.remove("hide-content-alert");

	msg_content = content_alert.querySelector('.msg-content-container .msg-content');
	clearTimeout(alertTimeout);
	
	if(msg_content.innerHTML.length === 0){
		disableAlert();		
	}
}

function display_read_more(){		
	read_more.classList.remove("hide-content-alert-read-more");
}

function hide_read_more(){		
	read_more.classList.add("hide-content-alert-read-more");
	$(msg_content_container).removeClass('display-content-message', 0);
	$(caret).removeClass("rotate-caret", 0);
	read_more_span.innerHTML = "Zobacz więcej";
	//////////////
	let alert = content_alert;
	let msg_content = alert.querySelector('.msg-content-container .msg-content');
	msg_content.innerText = '';
}

function reset_read_more(){
	$(msg_content_container).removeClass('display-content-message', 0);
	$(caret).removeClass("rotate-caret", 0);
	read_more_span.innerHTML = "Zobacz więcej";
}

function display_error_stash(message, alert){
	let msg_content = alert.querySelector('.msg-content-container .msg-content');
	msg_content.innerText = message;
}


window.onbeforeunload = function() {
    if($('#main-container form').serialize() !== formContent.data('serializeContent')){
        return true;
    }else{
        return undefined;
    }
}

/////////////// Browser animation event


function whichAnimationEvent(){
	let t,
		el = document.createElement("fakeelement");
	
	var animations = {
		"animation"      : "animationend",
		"OAnimation"     : "oAnimationEnd",
		"MozAnimation"   : "animationend",
		"WebkitAnimation": "webkitAnimationEnd"
	}
	
	for (t in animations){
		if (el.style[t] !== undefined){
		return animations[t];
		}
	}
}

let animationEvent = whichAnimationEvent();

//////////////////////////


$(document).ready(function() {
/*
	let visits = jQuery.cookie('visits') || 0;
	visits++;
	
	jQuery.cookie('visits', visits, { expires: 1, path: '/' });
		
	console.debug(jQuery.cookie('visits'));
*/
	///Greeting popup
	/*
	if ( jQuery.cookie('visits') < 3 ) {
		jQuery('.active-popup').hide();
		jQuery('.popup-container').hide();
	} else {
			var pageHeight = jQuery(document).height();
			jQuery('.popup-container').wrap('<div class="active-popup"></div>');
			jQuery('.active-popup').css("height", pageHeight);
			jQuery('.popup-container').show();
	}	

	if (jQuery.cookie('noShowWelcome')) { jQuery('.popup-container').hide(); jQuery('.active-popup').hide(); }

	*/
	formContentArray = updateFormArrays();
	modal_popup();

/////////////////////////Search bar

$('#search-input').change(function(){
	
	if($('#rewind-content').length > 0 && $('#see-more-content').length > 0){

		if($(this) === null || (/^ *$/).test($(this))){
			return;
		} else{

			$('#rewind-content')[0].setAttribute("id", "rewind-search-content");
			$('#see-more-content')[0].setAttribute("id", "see-more-search-content");	

		}
		
	}
			
});

$("#search-form").submit(function(event) {

	event.preventDefault();

	contentSearchCount = 0;

	search = $(event.target.search).val();

	if(search === null || (/^ *$/).test(search)){

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

		return;

	}

	search = search.trim();
	
	let submitting_form = $(this);
	let url = submitting_form.attr('action');

	$('#main-container').load(url, {	
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

			$(event.target.parentNode.parentNode).addClass('shadow-pulse-error');
			$(event.target.parentNode.parentNode).on('animationend', function(){    
				$(event.target.parentNode.parentNode).removeClass('shadow-pulse-error');
			});

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

});

////////////////////Formularz

$('#main-container').on('keydown', 'input', function (event) {

	if (event.which == '13') {
		event.preventDefault();
	  }

});

content_msg_btn.addEventListener("click", function(){
	hide_content_notification(content_alert);
	$(content_alert).one(animationEvent, function(){
		reset_read_more();					
	});
});

$(read_more_btn).click(function(){
	
	if(msg_content_container.classList.contains('display-content-message')){
		$(msg_content_container).removeClass('display-content-message', 300);
		$(caret).removeClass("rotate-caret", 0);
	} else{
		$(msg_content_container).addClass( "display-content-message", 300);
		$(caret).addClass("rotate-caret", 0);
	}

	if (read_more_span.innerHTML === "Zobacz więcej") {
		read_more_span.innerHTML = "Zobacz mniej";
	} else {
		read_more_span.innerHTML = "Zobacz więcej";
	}

});

///// GET method alert

function displayGetAlert(message){

	if(action_msg = sessionStorage.getItem("action")){
			
			sessionStorage.removeItem("action");
			
			if(content_alert.classList.contains('show-content-alert') && !content_alert.classList.contains('content-alert-error')){
				hide_content_notification(content_alert);
				$(content_alert).one(animationEvent, function(){
					reset_read_more();
					show_content_notification_error(message, content_alert);
					
				});
			} else{
					hide_read_more();
					show_content_notification_error(message, content_alert);
			}		
	}
	
	msg_content = content_alert.querySelector('.msg-content-container .msg-content');
	clearTimeout(alertTimeout);
	
	if(msg_content.innerHTML.length === 0){
		disableAlert();		
	}

}

function get_var_name(var_name){

	var query = window.location.search.substring(1);	
	var vars = query.split("&");

	for (var i=0;i<vars.length;i++) {

		var pair = vars[i].split("=");

		if(pair[0] == var_name){
			return pair[1];
		}
	}

	return(false);
}

function get_var(){

	let query = window.location.search.substring(1);

	if(!query || query.length === 0){
		return false;
	}else{
		return true;
	}

}

if(get_var()){

	if(get_var_name("reseterror") === 'timexpired'){
		displayGetAlert('Sesja wygasła. \n Wpisz ponownie hasło');
	}
	if(get_var_name("reseterror") === 'emaildontmatch'){
		displayGetAlert('Adres email jest nieprawidłowy');
	}
	if(get_var_name("reseterror") === 'stmtfailed'){
		displayGetAlert('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');
	}
	if(get_var_name("reseterror") === 'tokendontmatch'){
		displayGetAlert('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');
	}
	if(get_var_name("profilerror") === 'stmtfailed'){
		displayGetAlert('Wystąpił nieoczekiwany błąd. \n Skontaktuj się z administratorem.');
	}
	
}

// Submit accordion changes

$('#main-container').on('submit', 'form', function (event) {

		let submitting_form = $(this);
		let url = submitting_form.attr('action');

	if(confirm_accordion.name == 'button_save'){

		let input_elements = event.target.getElementsByTagName("input");
		let td_elements = event.target.getElementsByTagName("td");	
		$(input_elements).removeClass("input-title-error-background");
		$(td_elements).removeClass("td-error-background");	
		
		let formData = {
			action: "button_save",
			id: $(event.target.content_id).val(),
			csrfToken: $(event.target.csrfToken).val(),
			model: $(event.target.model).val(),
			firma: $(event.target.firma).val(),
			rodzaj: $(event.target.rodzaj).val(),
			predkosc_wydruku: $(event.target.predkosc_wydruku).val(),
			pojemnosc: $(event.target.pojemnosc).val(),
		};

		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			dataType: "json",
			encode: true,
		}).done(function (data) {

		//console.log(formData);
		console.log(data);

		if (!data.success) {

			$(event.target.parentNode).addClass('shadow-pulse-error');
			$(event.target.parentNode).on('animationend', function(){    
				$(event.target.parentNode).removeClass('shadow-pulse-error');
			});

			if (data.errors.model) {
				$(event.target.model).addClass('input-title-error-background');
			}

			if (data.errors.firma) {
				$(event.target.firma.parentNode.parentNode).addClass('td-error-background');
			}

			if (data.errors.rodzaj) {
				$(event.target.rodzaj.parentNode.parentNode).addClass('td-error-background');
			}
			if (data.errors.predkosc_wydruku) {
				$(event.target.predkosc_wydruku.parentNode.parentNode).addClass('td-error-background');
			}
			if (data.errors.pojemnosc) {
				$(event.target.pojemnosc.parentNode.parentNode).addClass('td-error-background');
			}

			if(Object.keys(data.errors).length > 1){
				
				let error_stash = '';

				let keys = Object.keys(data.errors);
				
				for(i = 0; i < keys.length; i++){
					let value = data.errors[keys[i]];
					error_stash += keys[i] + ' - ' + value + '\n';				
				}

				if(content_alert.classList.contains('show-content-alert')){
					hide_content_notification(content_alert);
					$(content_alert).one(animationEvent, function(){
						reset_read_more();
						display_read_more(content_alert);
						display_error_stash(error_stash, content_alert);
						show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);									
					});
				} else{
					display_read_more(content_alert);
					display_error_stash(error_stash, content_alert);
					show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);						
				}

			} else{

				if(content_alert.classList.contains('show-content-alert')){
					hide_content_notification(content_alert);
					$(content_alert).one(animationEvent, function(){
						hide_read_more();
						if(message = Object.entries(data.errors)[0][1]){
							show_content_notification_error(message, content_alert);							
						} else{
							show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);
						}
					});
				} else{
					if(message = Object.entries(data.errors)[0][1]){
						hide_read_more();
						show_content_notification_error(message, content_alert);							
					} else{
						hide_read_more();
						show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);
					}
				}

			}

		} else {

			let formContentArrayTmp = [];
		
			let tmpForm = event.target;
			let currentFormContent = $(tmpForm).serialize();  
			
			let formId = tmpForm.id;
			formContentArrayTmp.push({"formId" : formId});

			currentFormContent.split('&').forEach(function(elem, index) {			

				let vals = elem.split('=');
				formContentArrayTmp.push({"name" : vals[0], "value" : vals[1]});				
		
			});

			updateSavedFormArray(formContentArrayTmp, formContentArray, formId);
			
			if(content_alert.classList.contains('show-content-alert')){
				hide_content_notification(content_alert);
				$(content_alert).one(animationEvent, function(){
					hide_read_more();
					show_content_notification_error_none('Zmiany zostały zapisane', content_alert);
				});
			} else{
				hide_read_more();
				show_content_notification_error_none('Zmiany zostały zapisane', content_alert);
			}

				let selected_accordion = $(event.target.parentNode);		

				let parent = selected_accordion[0].querySelector('.accordion-item');
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
						parent.classList.remove("accordion-content-edit");
					}       
				}
			
				$(event.target.parentNode).addClass('shadow-pulse');
				$(event.target.parentNode).on('animationend', function(){    
					$(event.target.parentNode).removeClass('shadow-pulse');
				});
		}

		}).fail(function (response, statusText, xhr) {
			
			$(event.target.parentNode).addClass('shadow-pulse-error');
			$(event.target.parentNode).on('animationend', function(){    
				$(event.target.parentNode).removeClass('shadow-pulse-error');
			});

			console.log("Error: " + xhr + ": " + statusText);
				
			if(content_alert.classList.contains('show-content-alert')){
				hide_content_notification(content_alert);
				$(content_alert).one(animationEvent, function(){
					hide_read_more();
					show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
					
				});
			} else{
					hide_read_more();
					show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
			}

		});

	}

	if(confirm_accordion.name == 'button_delete'){

		let input_elements = event.target.getElementsByTagName("input");
		let td_elements = event.target.getElementsByTagName("td");	
		$(input_elements).removeClass("input-title-error-background");
		$(td_elements).removeClass("td-error-background");	

		let formData = {
		action: "button_delete",
		id: $(event.target.content_id).val(),
		csrfToken: $(event.target.csrfToken).val(),
		};

		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			dataType: "json",
			encode: true,
			}).done(function (data) {
	
			//console.log(formData);
			console.log(data);
	
			if (!data.success) {
	
				$(event.target.parentNode).addClass('shadow-pulse-error');
				$(event.target.parentNode).on('animationend', function(){    
					$(event.target.parentNode).removeClass('shadow-pulse-error');
				});

				if(Object.keys(data.errors).length > 1){
				
					let error_stash = '';
	
					let keys = Object.keys(data.errors);
					
					for(i = 0; i < keys.length; i++){
						let value = data.errors[keys[i]];
						error_stash += keys[i] + ' - ' + value + '\n';				
					}
	
					if(content_alert.classList.contains('show-content-alert')){
						hide_content_notification(content_alert);
						$(content_alert).one(animationEvent, function(){
							reset_read_more();
							display_read_more(content_alert);
							display_error_stash(error_stash, content_alert);
							show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);										
						});
					} else{
						display_read_more(content_alert);
						display_error_stash(error_stash, content_alert);
						show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);						
					}
	
				} else{
	
					if(content_alert.classList.contains('show-content-alert')){
						hide_content_notification(content_alert);
						$(content_alert).one(animationEvent, function(){
							hide_read_more();
							if(message = Object.entries(data.errors)[0][1]){
								show_content_notification_error(message, content_alert);							
							} else{
								show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);
							}
						});
					} else{
						if(message = Object.entries(data.errors)[0][1]){
							hide_read_more();
							show_content_notification_error(message, content_alert);							
						} else{
							hide_read_more();
							show_content_notification_error('Wystąpił nieoczekiwany błąd.', content_alert);
						}
					}
	
				}
	
			} else {
		
				let tmpForm = event.target;				
				let formId = tmpForm.id;
				
				updateDeletedFormArray(formContentArray, formId);

				if(content_alert.classList.contains('show-content-alert')){
					hide_content_notification(content_alert);
					$(content_alert).one(animationEvent, function(){
						hide_read_more();
						show_content_notification_error_none('Zmiany zostały zapisane', content_alert);
					});
				} else{
					hide_read_more();
					show_content_notification_error_none('Zmiany zostały zapisane', content_alert);
				}				

				$(event.target).closest('div').fadeOut(500);	

			}
	
			}).fail(function () {
	
				$(event.target.parentNode).addClass('shadow-pulse-error');
				$(event.target.parentNode).on('animationend', function(){    
					$(event.target.parentNode).removeClass('shadow-pulse-error');
				});

				console.log("Error: " + xhr + ": " + statusText);
				
				if(content_alert.classList.contains('show-content-alert')){
					hide_content_notification(content_alert);
					$(content_alert).one(animationEvent, function(){
						hide_read_more();
						show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
						
					});
				} else{
						hide_read_more();
						show_content_notification_error('Wystąpił nieoczekiwany błąd. Error: ' + statusText, content_alert);
				}
	
			});

	}

	event.preventDefault();

});

	jQuery('.modal-popup-content .popup-window-btns button#popup-no').click(function(){
		jQuery('.popup-container').fadeOut();
		jQuery('.active-popup').fadeOut();
	});

	jQuery('.modal-popup-content .popup-window-btns button#popup-yes').click(function(){		
		jQuery('.popup-container').fadeOut(50);
		jQuery('.active-popup').fadeOut(100);
	});

});

////////Popup Handler

let confirm_accordion = document.getElementById('popup-yes');
let selected_form;

function save_accordion_content_changes(event){
	
	selected_form = this.parentNode.parentNode.parentNode;

	jQuery('.popup-container').show();
	jQuery('.active-popup').show();

	$(".active-popup h1").text("Czy potwierdzasz wprowadzenie zmian?");

	confirm_accordion.setAttribute("type", "submit");
	confirm_accordion.setAttribute("form", selected_form.id);
	confirm_accordion.setAttribute("name", "button_save");
	//console.log(confirm_accordion);

}

function delete_accordion(event){

	selected_form = this.parentNode.parentNode.parentNode;

	jQuery('.popup-container').show();
	jQuery('.active-popup').show();

	$(".active-popup h1").text("Czy potwierdzasz usunięcie drukarki?");

	confirm_accordion.setAttribute("type", "submit");
	confirm_accordion.setAttribute("form", selected_form.id);
	confirm_accordion.setAttribute("name", "button_delete");
	
	//console.log($(confirm_accordion));			

}

///////////////Form arrays

function updateFormArrays(){

	////Update Form Arrays
	formContent = $('#main-container form').data('serializeContent', $('#main-container form').serialize()); // On load save form current state
	const formEntries = Object.values(formContent);
	
	let i = 0;
	let formContentArrayTmp = [];
	let formContentArrayTmp2 = [];
	
	for (let key in formEntries) {
		if(formEntries[key].nodeName === "FORM"){

			tmpForm = formEntries[key];
			currentFormContent = $(tmpForm).serialize();  
			
			formId = formEntries[key].id;
			formContentArrayTmp2.push({"formId" : formId});

			currentFormContent.split('&').forEach(function(elem, index) {			

				let vals = elem.split('=');
				formContentArrayTmp2.push({"name" : vals[0], "value" : vals[1]});				
		
			});

			formContentArrayTmp[i]=formContentArrayTmp2;
			formContentArrayTmp2 = [];
			i++;

		}
	}

	return formContentArrayTmp;

}

///Assign buttons to modal popup

function modal_popup(){

	let accordion_delete_button = document.querySelectorAll(".accordion .delete-accordion-content");

	accordion_delete_button.forEach(selected_button => {selected_button.addEventListener("click", delete_accordion);});
	
	let accordion_confirm_button = document.querySelectorAll(".accordion .confirm-accordion-content");

	accordion_confirm_button.forEach(selected_button => {selected_button.addEventListener("click", save_accordion_content_changes);});
	
}

/*
jQuery(document).mouseup(function(e){

	var container = jQuery('.popup-container');
	
	if(container.is(":visible") && !container.is(e.target) && container.has(e.target).length === 0)
	{
		container.fadeOut();
		jQuery('.active-popup').fadeOut();
	}

});

*/

$(document).ajaxComplete(function(event, xhr, settings) {
	console.log($('#main-container form').serialize());
    console.log(formContent.data('serializeContent'));

	if(settings.url === "DATABASE_HAND/load-more-content.php" || settings.url === "DATABASE_HAND/search.php"){
		formContentArray = updateFormArrays();
		modal_popup();		
	}

});


