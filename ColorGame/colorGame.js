var numSqaures = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	// mode Buttons EventListener
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons(){

	for (var i = 0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSqaures = 3 : numSqaures = 6;
			reset();
		});
	}
}

function setUpSquares(){
	
	for (var i = 0; i < squares.length; i++) {
	// add click listeners to squares
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background;

			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct !"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				resetButton.textContent = "Play Again ?"
			}
			else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again !"
			}	
		});
	}
}


function reset(){
	// generate all new colors and pick random colors from array
	colors = generateRandomColors(numSqaures);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});	

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// Make an Array and add num random colors to array
	var arr = []
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256); 
	var g = Math.floor(Math.random() * 256); 
	var b = Math.floor(Math.random() * 256); 
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


// Before Refactoring Code

/*

easyBtn.addEventListener("click", function() {
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numSqaures = 3;
	colors = generateRandomColors(numSqaures);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i<squares.length; i++){
		if(colors[i]){
		squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click", function() {
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSqaures = 6;
	colors = generateRandomColors(numSqaures);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i<squares.length; i++){
		squares[i].style.background = colors[i];
		squares[i].style.display = "block";
	}
});

*/

