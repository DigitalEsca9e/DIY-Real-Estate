
function OnEditUsername(){
    var user = document.getElementById("username");
    user.classList.remove("login-field-error");
    document.getElementById("user-error-msg").innerHTML = "";
}

function OnEditPassword(){
    var pass = document.getElementById("password");
    pass.classList.remove("login-field-error");
    document.getElementById("pass-error-msg").innerHTML = "";
}

function LoginButtonClick(){
    var user = document.getElementById("username");
    var pass = document.getElementById("password");
    // check if username field is empty
    if (user.value === "") {
	// Tell user to enter their username
	HighlightField("username");
	document.getElementById("user-error-msg").innerHTML = "Please enter a valid username.";
    }else{
	// check if password field is empty
	if( pass.value === ""){

	    // Tell the user to enter their password
	    HighlightField("password");
	    document.getElementById("pass-error-msg").innerHTML = "Please enter a valid password.";
	}else{
	    // LOGIN GOOD, GO TO NEXT PAGE
	    window.location.href = "index.html";
	}
    }
    
}

function HighlightField(fieldName){
    var field = document.getElementById(fieldName);
    field.classList.add("login-field-error");
}

function RegisterButtonClick(){
    
}
