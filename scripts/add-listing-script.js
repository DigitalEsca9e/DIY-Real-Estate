var steps = 0;

var showPassword = false;

// fieldTypes
const FIELD_TEXT = 0;
const FIELD_EMAIL = 1;

const DEBUG_SCREEN_START = 0;


var stepNum = 100;

var didCheckboxInit = false;

function findId(id){
    return document.getElementById(id);
}

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
    stepNum = 5;

    initHomeDetailsPage();
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

    if(screens[steps].id === "location-page"){
	loadLocationPage();
    }
    if(screens[steps].id === "house-details-page"){
	initHomeDetailsPage();
    }

    if(screens[steps].id === "review-page"){
	loadReviewPage();
    }

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
    // prov.classList.add('signup-select-picked');
    prov.classList.add('set-field');

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

    var newVal = findId("house-type-select").value;
    
    for(var i = 0; i < houseScreens.length;i++){
	houseScreens[i].style.display = "none";
    }
    
    // switch(ev.target.value){
    switch(newVal){
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
	// if(typeOptions[i].value === ev.target.value){
	if(typeOptions[i].value === newVal){
	    document.getElementById("home-type-title").innerHTML = typeOptions[i].innerHTML;
	    return;
	}
    }
}

function onShowTimeChanged(){
    var timeDetails = document.getElementById("show-info");
    var date = document.getElementById("show-date");
    var time = document.getElementById("show-time");

    timeDetails.innerHTML = date.value + " at " + time.value;
}

function updateFieldChanged(fieldName){
    var field = findId(fieldName);
    if(!(field.value === "")){
	field.classList.add("set-field");
	return true;
    }
    return false;
}

function setFieldChanged(fieldName) {
    var field = document.getElementById(fieldName);
    field.classList.add("set-field");
}


function checkboxCheck(ev){
    var tar = ev.currentTarget
    var checkbox = tar.getElementsByTagName("input")[0];
    checkbox.checked = !checkbox.checked;
    if(checkbox.checked && !tar.classList.contains("set-field")){
	tar.classList.add("set-field");
    }
    if(!checkbox.checked && tar.classList.contains("set-field")){
	tar.classList.remove("set-field");
    }
}

function initHomeDetailsPage(){
    var homeScreens = findId("house-detail-screens");
    var inputs = homeScreens.getElementsByTagName("input");
    
    for(var i = 0; i < inputs.length;i++){
	if(inputs[i].type === "checkbox"){
	    var checkbox = inputs[i];
	    var checkContainer = checkbox.parentElement;
	    
	    if(checkbox.checked && !checkContainer.classList.contains("set-field")){
		checkContainer.classList.add("set-field");
	    }
	    
	}
    }
    updateFieldChanged("house-basement-type");
}

function loadLocationPage(){
    if(updateFieldChanged("house-type-select")){
	onHouseTypeChange();
    }
    if(updateFieldChanged("province-select")){
	provinceChanged();
    }
}

function loadReviewPage(){
    // var img = document.getElementById("review-house-img");
    // var imgList = document.getElementById("photo-list").getElementsByTagName("img");
    // if(imgList.length > 0){
    // 	img.src = imgList[0].src;
    // }

    var fName = loadToReview("first-name");
    var lName = loadToReview("last-name");
    findId("review-name").innerHTML = fName + " " + lName;

    loadToReview("phone-number","review-phone");
    loadToReview("email","review-email");
    loadToReview("address","review-address");
    loadToReview("city","review-city");
    loadToReview("province-select","review-province");
    var postal = loadToReview("postal-code");
    findId("review-postal").innerHTML = postal.toUpperCase();

    var homeScreens = findId("review-hometype-screens").children;

    for(var i = 0; i < homeScreens.length; i++){
	homeScreens[i].style.display = "none";
    }

    

    var homeType = loadToReview("house-type-select");

    var homeStr = "";
    switch(homeType){
    case "detached":
	homeStr = "Detached";
	break;
    case "semi":
	homeStr = "Semi-Detached";
	break;
    case "townhouse":
	homeStr = "Townhouse";
	break;
    case "condo-town":
	homeStr = "Condo Townhouse";
	break;
    case "apartment":
	homeStr = "Apartment";
	break;
    case "studio":
	homeStr = "Studio";
    }
    // var homeStr = homeType.charAt(0).toUpperCase() + homeType.slice(1);
     findId("review-hometype").innerHTML = homeStr;

    var screenSel = null;
    switch(homeType){
    case "detached":
    case "semi":
    case "townhouse":
	
	screenSel = findId("review-house-screen");
	loadToReview("house-floor-count", "review-house-floors","1");
	loadToReview("house-footage","review-house-footage","0");
	
	loadToReview("house-bed-num","review-house-beds","0");
	loadToReview("house-bath-num","review-house-baths","0");
	loadToReview("house-garage-num","review-house-garages","0");

	var basementStatus = loadToReview("house-basement-type");
	var basementStr = "";
	switch(basementStatus){
	case "":
	case "no-basement":
	    basementStr = "No Basement";
	    break;
	case "unfinished":
	    basementStr = "Unfinished";
	    break;
	case "finished":
	    basementStr = "Finished";
	}

	findId("review-house-basement").innerHTML = basementStr;

	var utilIds = [
	    "house-util-air",
	    "house-util-heat",
	    "house-util-washer",
	    "house-util-laundry"
	];

	var featIds = [
	    "house-feat-pool",
	    "house-feat-driveway"
	];
	
	var utils = getCheckedUtilList(utilIds);
	populateUtilList(utils,"review-house-utils");

	var feats = getCheckedUtilList(featIds);
	populateUtilList(feats,"review-house-feats");

	
	
	
	break;
    case "apartment":
	screenSel = findId("review-apartment-screen");

	loadToReview("apartment-floor-number","review-apartment-floornum","0");
	loadToReview("apartment-footage","review-apartment-footage","0");
	
	loadToReview("apartment-bed-num","review-apartment-beds","0");
	loadToReview("apartment-bath-num","review-apartment-baths","0");
	loadToReview("apartment-park-num","review-apartment-parking","0");

	var utilIds = [
	    "apartment-util-air",
	    "apartment-util-heat",
	    "apartment-util-stairs",
	    "apartment-util-elevator",
	    "apartment-util-washer",
	    "apartment-util-laundry"
	];

	var featIds = [
	    "apartment-feat-gym",
	    "apartment-feat-pool",
	    "apartment-feat-sauna",
	    "apartment-feat-roof",
	    "apartment-feat-balcony",
	];
	
	var utils = getCheckedUtilList(utilIds);
	populateUtilList(utils,"review-apartment-utils");

	var feats = getCheckedUtilList(featIds);
	populateUtilList(feats,"review-apartment-feats");
	
	break;
    case "studio":
	screenSel = findId("review-studio-screen");
	loadToReview("studio-floor-count","review-studio-floors","1");
	loadToReview("studio-footage","review-studio-footage","0");
	loadToReview("studio-park-num","review-studio-parking","0");

	var utilIds = [
	    "studio-util-air",
	    "studio-util-heat",
	    "studio-util-stairs",
	    "studio-util-elevator",
	    "studio-util-washer",
	    "studio-util-laundry"
	];

	var featIds = [
	    "studio-feat-gym",
	    "studio-feat-pool",
	    "studio-feat-sauna",
	    "studio-feat-roof",
	    "studio-feat-balcony",
	];

	var utils = getCheckedUtilList(utilIds);
	populateUtilList(utils,"review-studio-utils");

	var feats = getCheckedUtilList(featIds);
	populateUtilList(feats,"review-studio-feats");


	
	break;
    case "condo-town":
	screenSel = findId("review-condo-screen");

	loadToReview("condo-floor-count","review-condo-floors","1");
	loadToReview("condo-footage","review-condo-footage","0");
	break;
    }
    screenSel.style.display = "block";
}

function populateUtilList(stringList, containerId){
    var container = findId(containerId);
    container.innerHTML = "";
    for(var i = 0; i < stringList.length;i++){
	var item = document.createElement("p");
	item.innerHTML = stringList[i];
	container.appendChild(item);
    }
}

function getCheckedUtilList(idList){
    var strList = [];
    for(var i = 0; i < idList.length;i++){
	var util = findId(idList[i]);
	if(util.checked){
	    var utilName = util.parentElement.getElementsByTagName("label")[0].innerHTML;
	    strList.push(utilName);
	}
    }
    return strList;
}


function loadToReview(sourceId, destId="",defaultValue=""){
    var srcValue = document.getElementById(sourceId).value;

    if(srcValue === ""){
	srcValue = defaultValue;
    }
    
    if(!(destId === "")){
	var destElement = document.getElementById(destId);
	destElement.innerHTML = srcValue;
    }

    return srcValue;
}
