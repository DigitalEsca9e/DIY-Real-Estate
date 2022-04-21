var steps = 0;

var showPassword = false;

// fieldTypes
const FIELD_TEXT = 0;
const FIELD_EMAIL = 1;

const DEBUG_SCREEN_START = 0;


var stepNum = 100;

function start(){
    var screens = document.getElementById("signup-screens").children;

    steps = DEBUG_SCREEN_START;

    for(var i = 0; i < screens.length; i++){
	screens[i].style.display = "none";
    }
    screens[steps].style.display = "block";

    document.getElementById("signup-prev").disabled = true;

    document.getElementById("signup-finish-buttons").style.display = "none";

    

    var phone = document.getElementById("phone-number");
    phone.onkeypress = phoneNumberPress;
    //phone.onkeyup = phoneNumberRelease;
    phone.onkeyup = phoneNumberRelease;

    
    
}

// start function for add-listing page
function startListing(){
    start();
    //document.getElementById("postal-code").addEventListener('keypress', postalCodeChanged );
    document.getElementById("postal-code").onkeypress = postalCodeChanged;
    document.getElementById("postal-code").onkeyup = postalCodeRelease;
    document.getElementById("house-type-select").addEventListener("change",onHouseTypeChange);
    stepNum = 4;
}

// start function for book showing page
function startShowing(){
    start();
    stepNum = 2;
}

function prev(){
    // if(steps > 0){
    var screens = document.getElementById("signup-screens").children;


    screens[steps].style.display = "none";
    screens[steps-1].style.display = "block";
    steps -= 1;
    if(steps == 0)
	document.getElementById("signup-prev").disabled = true;

    document.getElementById("signup-next").innerHTML = "Next";
    // }
}

function next(skip = false){
    // if(true || steps == 0){
    // 	if(checkValidFields(true)){
    //window.location.href = "../pages/main-LoggedIn.html";


    if(steps == stepNum -1 ){
	if(!confirm("Do you wish to submit this information for verification?"))
	    return;
    }
    
    var screens = document.getElementById("signup-screens").children;

    screens[steps].style.display = "none";
    //screens[steps].classList.add("test-anim");
    screens[steps+1].style.display = "block";
    steps += 1;

    document.getElementById("signup-prev").disabled = false;

    
    if(steps == stepNum - 1){
	document.getElementById("signup-next").innerHTML = "Confirm";
    }else if(steps == stepNum){
	document.getElementById("signup-nav-buttons").style.display = "none";
    }

    
    // 	}
    // }
}

function successPage(skip = false){
    if(checkValidFields(skip) || skip){
	var screens = document.getElementById("signup-screens").children;
	screens[0].style.display = "none";

	
	document.getElementById("success-page").style.display = "block";
	document.getElementById("signup-nav-buttons").style.display = "none";
	document.getElementById("signup-finish-buttons").style.display = "flex";
	document.getElementById("signup-title").innerHTML = "Account Created!";
    }
}

function continueToMain(){
    window.location.href = "../pages/main-LoggedIn.html";
}

function togglePassword(){
    var pass = document.getElementById("password");
    var cPass = document.getElementById("pass-confirm");
    var visButton = document.getElementById("show-pass-button");
    
    if(!showPassword){
	showPassword = true;
	

	pass.type = "text";
	cPass.type = "text";
	visButton.classList.add("pass-vis-button-hide");
    }else{
	showPassword = false;
	pass.type = "password";
	cPass.type = "password";
	visButton.classList.remove("pass-vis-button-hide");
    }
}

function CheckEmailField(){
    var emailstr = document.getElementById("email");
    var split = emailstr.value.match(/\^([0-9a-fA-F]+).*\$/);
    alert(split);
    for(var i = 0; i < split.length;i++){
	alert(i+". "+split[i]);
    }
}

function clearError(element){
    var error = document.getElementById("signup-error");
    element.setCustomValidity("");
    error.style.display = "none";
    element.onchange = null;
}

function checkValidFields(skip = false){
    if(skip) { return true; }
    var error = document.getElementById("signup-error");
    
    var fName = document.getElementById("first-name");
    var lName = document.getElementById("last-name");
    var email = document.getElementById("email");

    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var cPass = document.getElementById("pass-confirm");
    
    // if(fName.value.length == 0){
    // 	fName.setCustomValidity("invalid");
    // 	error.style.display = "block";
    // 	error.innerHTML = "Please Enter your first name.";
    // 	// fName.addListener("change",clearError(fName));
    // 	fName.onchange = function() {
    // 	    clearError(fName);
    // 	};
    // 	return false;
    // }

    if(fieldNotValid("first-name")){
	showError("first-name","Please enter your first name.");
	return false;
    }

    if(fieldNotValid("last-name")){
	showError("last-name","Please enter your last name.");
	return false;
    }

    // if(lName.value.length == 0){
    // 	lName.setCustomValidity('invalid');
    // 	error.style.display = 'block';
    // 	error.innerHTML = 'Please Enter your last name.';
    // 	lName.onchange = function(){
    // 	    clearError(lName);
    // 	};
    // 	return false;
    // }

    if(email.value.length == 0){
	email.setCustomValidity('invalid');
	error.style.display = 'block';
	error.innerHTML = 'Please Enter your email address.';
	email.onchange = function(){
	    clearError(email);
	};
	return false;
    }

    return true;

    if(username.value.length == 0){
	username.setCustomValidity('invalid');
	error.style.display = 'block';
	error.innerHTML = 'Please Enter your username.';
	username.onchange = function(){
	    clearError(username);
	};
	return false;
    }

    if(password.value.length == 0){
	password.setCustomValidity('invalid');
	error.style.display = 'block';
	error.innerHTML = 'Please Enter your password.';
	password.onchange = function(){
	    clearError(password);
	};
	return false;
    }

    if(password.value !== cPass.value){
	password.setCustomValidity('invalid');
	cPass.setCustomValidity('invalid');
	error.style.display = 'block';
	error.innerHTML = "The password does not mach the confirmation.";
	cPass.onchange = function(){
	    clearError(password);
	    clearError(cPass);
	};
	return false;
    }

    return true;
}



// checks if a field has a valid entry
function fieldNotValid(fieldName, fieldType = FIELD_TEXT){
    var field = document.getElementById(fieldName);
    if(field.value.length == 0){
	switch(fieldType){
	case FIELD_TEXT:
	    return true;
	case FIELD_EMAIL:
	    
	}
	return true;
    }
    return false;
}

function showError(fieldName,errorMessage){
    var field = document.getElementById(fieldName);
    var error = document.getElementById("signup-error");
    
    field.setCustomValidity('invalid');
    error.style.display = 'block';
    error.innerHTML = errorMessage;
    field.onchange = function(){
	clearError(field);
    }
}


function provinceChanged(){
    var prov = document.getElementById("province-select");
    prov.classList.add('signup-select-picked');
    // if(prov.value == "none"){
    // 	if(prov.classList.contains('signup-select-picked'))
    // 	    prov.classList.remove('signup-select-picked');
    // }else{
    // 	if(!prov.classList.contains('signup-select-picked'))
    // 	    prov.classList.add('signup-select-picked');
    // }
    
}

function postalCodeChanged(ev){
    if(/[a-zA-Z0-9]/.test(ev.key)){

	// if(ev.target.value.length >= 3){
	//     var rg = /([a-zA-Z0-9]{3})([a-zA-Z0-9]{0,3})/;
	//     var newstr = ev.target.value.replace(/\s*/g,'');
	//     var split = newstr.match(rg);
	//     //alert(split[1]+" "+split[2]);
	//     ev.target.value = split[1]+ " " + split[2];
	//     //alert("\"" + split[1] + " " + split[2] + "\"");
	// }

    }else{
	return false;
    }
}

function postalCodeRelease(ev){
    if(ev.target.value.length >= 3){
	var rg = /([a-zA-Z0-9]{3})([a-zA-Z0-9]{0,3})/;
	var newstr = ev.target.value.replace(/\s*/g,'');
	var split = newstr.match(rg);
	//alert(split[1]+" "+split[2]);
	ev.target.value = split[1]+ " " + split[2];
	//alert("\"" + split[1] + " " + split[2] + "\"");
    }  
}

function phoneNumberPress(ev){
    if(!/[0-9]/.test(ev.key)){
	return false;
    }
}

function formatPhoneNumber(input){
    //var oldEnd = input.selectionEnd;
    var rg = /^([0-9]{3})([0-9]{0,3})([0-9]{0,4})$/;
    var newstr = input.value.replace(/\s*/g,'');
    var split = newstr.match(rg);
    input.value = split[1];
    if(split[2].length > 0){
	input.value += " " + split[2];
    }
    if(split[3].length > 0){
	input.value += " " + split[3];
    }

    //input.selectionEnd = oldEnd;
}

function phoneNumberRelease(ev){
    // switch(ev.code){
    // case "End":
    // case "Home":
    // case "ArrowUp":
    // case "ArrowDown":
    // case "ArrowLeft":
    // case "ArrowRight":
    // case "ShiftLeft":
    // case "ShiftRight":
    // 	return;
    // }
    var selStart = ev.target.selectionStart;
    var selEnd = ev.target.selectionEnd;
    // switch(ev.code){
    // case "Backspace":
    // case "Delete":
    // 	break;
    // default:
    // 	selStart+1;
    // }
    //alert(selStart);
    if(ev.target.value.length >= 3){
	formatPhoneNumber(ev.target);
	// var rg = /^([0-9]{3})([0-9]{0,3})([0-9]{0,4})$/;
	// var newstr = ev.target.value.replace(/\s*/g,'');
	// var split = newstr.match(rg);
	// ev.target.value = split[1];
	// if(split[2].length > 0){
	//     ev.target.value += " " + split[2];
	// }
	// if(split[3].length > 0){
	//     ev.target.value += " " + split[3];
	// }
    }
    //ev.target.setSelectionRange(selEnd,selEnd);
}


function addHouseImage() {
    var imgPanel = document.getElementById("photo-list");
    var imgContainer = document.createElement("div");
    var img = document.createElement("img");
    var rem = document.createElement("div");

    var imgList = [
	"house1.jpg",
	"house2.jpg",
	"house3.jpg",
    ];

    rem.innerHTML = "×";
    
    img.src = "../media/houses/" + imgList[Math.floor(Math.random()*imgList.length)];
    imgContainer.classList.add("photobox");

    rem.classList.add("remove-button");

    rem.addEventListener("click",removeImage);
    
    imgContainer.appendChild(img);
    imgContainer.appendChild(rem);
    imgPanel.insertBefore(imgContainer,document.getElementById("add-photo-button"));
}


function removeImage(ev){
    var img = ev.target.parentElement;
    img.parentElement.removeChild(img);
}


function onHouseTypeChange(ev){
    var houseScreens = document.getElementById("house-detail-screens").children;
    //alert("House Type Changed: " + ev.target.value);
    for(var i = 0; i < houseScreens.length;i++){
	houseScreens[i].style.display = "none";
    }
    
    switch(ev.target.value){
    case "detached":
    case "semi":
    case "townhouse":
	document.getElementById("house-screen").style.display = "block";
	break;
    case "apartment":
	document.getElementById("apartment-screen").style.display = "block";
	break;
    case "studio":
	document.getElementById("studio-screen").style.display = "block";
	break;
    case "condo-town":
	document.getElementById("condo-screen").style.display = "block";
	break;
    }

    var typeOptions = document.getElementById("house-type-select").children;
    for(var i = 0; i < typeOptions.length;i++){
	if(typeOptions[i].value === ev.target.value){
	    document.getElementById("home-type-title").innerHTML = typeOptions[i].innerHTML;
	    return;
	}
    }
}


function setFieldChanged(fieldName) {
    var field = document.getElementById(fieldName);
    field.classList.add("set-field");
}
