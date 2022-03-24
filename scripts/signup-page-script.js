var steps = 0;

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
	var screens = document.getElementById("signup-screens").children;

	screens[steps].style.display = "none";
	screens[steps+1].style.display = "block";
	steps = 1;

	document.getElementById("signup-prev").disabled = false;
    }
}
