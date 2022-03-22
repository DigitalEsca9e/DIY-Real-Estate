
class Expert {
    constructor(name,img,desc){
	this.name = name;
	this.img = img;
	this.desc = desc;
    }
}

var expertList = [
    new Expert("Expert 1","expert1.jpg","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac turpis fringilla, pharetra lacus quis, fermentum dui. Etiam at neque purus. Sed condimentum sem nec erat rutrum consectetur. Sed augue tellus, feugiat sed sollicitudin ut, malesuada non ipsum. Proin egestas accumsan ante, eget auctor ipsum fermentum in. Fusce iaculis imperdiet est, nec sollicitudin ligula. Morbi mollis ornare finibus. Aenean sed semper quam. Duis lobortis augue sed rhoncus varius. Curabitur vel bibendum massa. Suspendisse mattis vel orci nec volutpat. Mauris et tempor nisi, sit amet elementum leo. Pellentesque dapibus iaculis urna, vel hendrerit tellus tempus sit amet."),
    new Expert("Expert 2","expert2.jpg","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac turpis fringilla, pharetra lacus quis, fermentum dui. Etiam at neque purus. Sed condimentum sem nec erat rutrum consectetur. Sed augue tellus, feugiat sed sollicitudin ut, malesuada non ipsum. Proin egestas accumsan ante, eget auctor ipsum fermentum in. Fusce iaculis imperdiet est, nec sollicitudin ligula. Morbi mollis ornare finibus. Aenean sed semper quam. Duis lobortis augue sed rhoncus varius. Curabitur vel bibendum massa. Suspendisse mattis vel orci nec volutpat. Mauris et tempor nisi, sit amet elementum leo. Pellentesque dapibus iaculis urna, vel hendrerit tellus tempus sit amet."),
    new Expert("Expert 3","expert4.jpg","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac turpis fringilla, pharetra lacus quis, fermentum dui. Etiam at neque purus. Sed condimentum sem nec erat rutrum consectetur. Sed augue tellus, feugiat sed sollicitudin ut, malesuada non ipsum. Proin egestas accumsan ante, eget auctor ipsum fermentum in. Fusce iaculis imperdiet est, nec sollicitudin ligula. Morbi mollis ornare finibus. Aenean sed semper quam. Duis lobortis augue sed rhoncus varius. Curabitur vel bibendum massa. Suspendisse mattis vel orci nec volutpat. Mauris et tempor nisi, sit amet elementum leo. Pellentesque dapibus iaculis urna, vel hendrerit tellus tempus sit amet.")
];

function LoadExperts(){
    var cardHolder = document.getElementById("expert-list");
    for(var i = 0; i < expertList.length;i++){
	var card = CreateCard(expertList[i]);
	cardHolder.appendChild(card);
    }
}

function CreateCard(expert){
    var root = document.createElement("div");
    root.classList.add("expert-card");
    var face = document.createElement("div");
    face.classList.add("expert-face");
    root.appendChild(face);
    var mask = document.createElement("div");
    mask.classList.add("expert-mask");
    face.appendChild(mask);
    var img = document.createElement("img");
    img.classList.add('expert-img');
    img.src = "../media/expert-photos/"+expert.img;
    mask.appendChild(img);
    var name = document.createElement("p");
    name.classList.add("expert-name");
    name.innerHTML = expert.name;
    face.appendChild(name);
    var descPanel = document.createElement("div");
    descPanel.classList.add("expert-desc-panel");
    root.appendChild(descPanel);
    var desc = document.createElement("p");
    desc.classList.add("expert-desc");
    descPanel.appendChild(desc);
    return root;
}
