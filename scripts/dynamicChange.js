function alHideAll(){
    var ele=document.getElementsByClassName("al-typesection");
    for(var i=0; i<ele.length;i++){
        ele[i].hidden=true;
    }
    document.getElementById("al-submitButton").hidden=true;
}
function alShowSection(){
    var select=document.getElementById("house-type-select").value;
    if(select=="studio"){
        var ele2=document.getElementsByClassName("al-typesection");
        if(ele2!=null){
            for(var i=0; i<ele2.length;i++){
                ele2[i].hidden=true;
            }
            document.getElementById("al-submitButton").hidden=true;
        }
        var ele=document.getElementById("al-studio");
        ele.hidden=false;
        document.getElementById("al-submitButton").hidden=false;
    }
    else if(select=="apartment"){
        var ele2=document.getElementsByClassName("al-typesection");
        if(ele2!=null){
            for(var i=0; i<ele2.length;i++){
                ele2[i].hidden=true;
            }
            document.getElementById("al-submitButton").hidden=true;
        }
        var ele=document.getElementById("al-apartment");
        ele.hidden=false;
        document.getElementById("al-submitButton").hidden=false;
    }
    else if(select=="condoTownhouse"){
        var ele2=document.getElementsByClassName("al-typesection");
        if(ele2!=null){
            for(var i=0; i<ele2.length;i++){
                ele2[i].hidden=true;
            }
            document.getElementById("al-submitButton").hidden=true;
        }
        var ele=document.getElementById("al-condoTownhouse");
        ele.hidden=false;
        document.getElementById("al-submitButton").hidden=false;
    }
    else if(select=="Townhouse"){
        var ele2=document.getElementsByClassName("al-typesection");
        if(ele2!=null){
            for(var i=0; i<ele2.length;i++){
                ele2[i].hidden=true;
            }
            document.getElementById("al-submitButton").hidden=true;
        }
        var ele=document.getElementById("al-detached");
        ele.hidden=false;
        document.getElementById("al-submitButton").hidden=false;
    }
    else if(select=="SemiDetached"){
        var ele2=document.getElementsByClassName("al-typesection");
        if(ele2!=null){
            for(var i=0; i<ele2.length;i++){
                ele2[i].hidden=true;
            }
            document.getElementById("al-submitButton").hidden=true;
        }
        var ele=document.getElementById("al-detached");
        ele.hidden=false;
        document.getElementById("al-submitButton").hidden=false;
    }
    else if(select=="Detached"){
        var ele2=document.getElementsByClassName("al-typesection");
        if(ele2!=null){
            for(var i=0; i<ele2.length;i++){
                ele2[i].hidden=true;
            }
            document.getElementById("al-submitButton").hidden=true;
        }
        var ele=document.getElementById("al-detached");
        ele.hidden=false;
        document.getElementById("al-submitButton").hidden=false;
    }
    else{
        var ele=document.getElementsByClassName("al-typesection");
    document.getElementById("al-submitButton").hidden=true;
    }
}

function submitAlert(){
    var check= confirm("Do you wish to submith this information for verification?")
    if(check==true){
        location.href="../pages/main-loggedIn.html"
    }
}