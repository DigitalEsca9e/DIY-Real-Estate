var steps = 0;

var showPassword = false;

function start(){
    var screens = document.getElementById("signup-screens").children;

    for(var i = 0; i < screens.length; i++){
	screens[i].style.display = "none";
    }
    screens[0].style.display = "block";

    document.getElementById("signup-prev").disabled = true;

    
}

function prev(){
    // if(steps > 0){
    var screens = document.getElementById("signup-screens").children;


    screens[steps].style.display = "none";
    screens[steps-1].style.display = "block";
    steps = 0;
    document.getElementById("signup-prev").disabled = true;
    // }
}

function next(){
    if(steps == 0){
	if(checkValidFields()){
	    window.location.href = "../pages/main-LoggedIn.html";
	    var screens = document.getElementById("signup-screens").children;

	    screens[steps].style.display = "none";
	    screens[steps+1].style.display = "block";
	    steps = 1;

	    document.getElementById("signup-prev").disabled = false;
	}
    }
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

function checkValidFields(){
    var error = document.getElementById("signup-error");
    
    var fName = document.getElementById("first-name");
    var lName = document.getElementById("last-name");
    var email = document.getElementById("email");

    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var cPass = document.getElementById("pass-confirm");
    
    if(fName.value.length == 0){
	fName.setCustomValidity("invalid");
	error.style.display = "block";
	error.innerHTML = "Please Enter your first name.";
	// fName.addListener("change",clearError(fName));
	fName.onchange = function() {
	    clearError(fName);
	};
	return false;
    }

    if(lName.value.length == 0){
	lName.setCustomValidity('invalid');
	error.style.display = 'block';
	error.innerHTML = 'Please Enter your last name.';
	lName.onchange = function(){
	    clearError(lName);
	};
	return false;
    }

    if(email.value.length == 0){
	email.setCustomValidity('invalid');
	error.style.display = 'block';
	error.innerHTML = 'Please Enter your email address.';
	email.onchange = function(){
	    clearError(email);
	};
	return false;
    }

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
