var isClicked = 0;
function myClick() {
    console.log("myClick:"+isClicked);
	if(isClicked) {
		isClicked = 0;
		document.getElementById("header").className = "normal";
	} else {
		isClicked = 1;
		document.getElementById("header").className = "clicked";
	}
}

function mouseIn() {
	document.getElementById("header").className = "hover";
}

function mouseOut() {
	if(isClicked) {
		document.getElementById("header").className = "clicked";
	} else {
		document.getElementById("header").className = "normal";
	}		
	
}



