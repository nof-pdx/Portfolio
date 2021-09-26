/******************************************************************************
 * JavaScript functions for the movement of SPACEHUNT
 * File: Funderburgh.js
 *
 *****************************************************************************/

 /*----------Test Variables-----------------------------------------------------------------------*/
// For updating map movements when loading saved game
var DEFAULT_X = 4;
var DEFAULT_Y = 4;

var arraySize = 128;
var arr2D = Array(arraySize).fill(0).map(x => Array(arraySize).fill(0));
var x = 4;
var y = 4;
arr2D[x][y] = 1;
console.table(arr2D);

 /*----------Movement-Functions-----------------------------------------------------------------------*/
// Moves player as far Left as they want to go 1-10
// @param: array: Must be 2 dimensional array
// @ret: array with player moved Left
// @error: return array with play moved to random/ specific location if they try to go off the board
function moveLeft(array){
	decSupplies(2);
	updateSupplies();
	array[x][y] = 0;
	var answer = document.getElementById("cp-select").selectedIndex;
	answer++;
	y -= answer;
	updateCurrentCoord(x, y);
	player.energy-=10*answer;
	updateEnergy();
	if( y < 0){
		var newCoord = setPlayerToPosition(); // contains if random or specific wormhole behaviour
		x = newCoord[0]; 
		y = newCoord[1];
		updateCurrentCoord(x, y);
		array[x][y] = 1;
		document.querySelector("#ship").style.transform = "rotate(0deg)";
	}
	array[x][y] = 1;
	document.querySelector("#ship").style.transform = "rotate(270deg)";
	updateMapLeft();
	return array;
}

// Used for testing purposes
// Setting the array equal to the new Left array
function Left(){
    arr = moveLeft(arr2D);
    arr = arr2D;
    console.table(arr2D);
}

// Moves player as far Right as they want to go 1-10
// @param: array: Must be 2 dimensional array
// @ret: array with player moved Right
// @error: return array with play moved to random/ specific location if they try to go off the board
function moveRight(array){
	decSupplies(2);
	updateSupplies();
	array[x][y] = 0;
	var answer = document.getElementById("cp-select").selectedIndex;
	answer++;
	y += answer;
	updateCurrentCoord(x, y);
	player.energy-=10*answer;
	updateEnergy();
	if( y > array.length-1){
		var newCoord = setPlayerToPosition(); // contains if random or specific wormhole behaviour
		x = newCoord[0]; 
		y = newCoord[1];
		updateCurrentCoord(x, y);
		array[x][y] = 1;
		document.querySelector("#ship").style.transform = "rotate(0deg)";
	}
	array[x][y] = 1;
	document.querySelector("#ship").style.transform = "rotate(90deg)";
	updateMapRight();
	return array;
}

// Used for testing purposes
// Setting the array equal to the new Right array
function Right(){
    arr = moveRight(arr2D);
    arr = arr2D;
    console.table(arr2D);
}

// Moves player as far Up as they want to go 1-10
// @param: array: Must be 2 dimensional array
// @ret: array with player moved Up
// @error: return array with play moved to random/ specific location if they try to go off the board
function moveUp(array){
	decSupplies(2);
	updateSupplies();

	array[x][y] = 0;
	var answer = document.getElementById("cp-select").selectedIndex;
	answer++;
	x-= answer;
	updateCurrentCoord(x, y);
	player.energy-=10*answer;
	updateEnergy();
	if( x < 0){
		var newCoord = setPlayerToPosition(); // contains if random or specific wormhole behaviour
		x = newCoord[0]; 
		y = newCoord[1];
		updateCurrentCoord(x, y);
		array[x][y] = 1;
		document.querySelector("#ship").style.transform = "rotate(0deg)";
	}
	array[x][y] = 1;
	document.querySelector("#ship").style.transform = "rotate(0deg)";
	updateMapUp();
	return array;
}

// Used for testing purposes
// Setting the array equal to the new Up array
function Up(){
    arr = moveUp(arr2D);
    arr = arr2D;
    console.table(arr2D);
}

// Moves player as far Down as they want to go 1-10
// @param: array: Must be 2 dimensional array
// @ret: array with player moved Down
// @error: return array with play moved to random/ specific location if they try to go off the board
function moveDown(array){
	decSupplies(2);
	updateSupplies();
	array[x][y] = 0;
	var answer = document.getElementById("cp-select").selectedIndex;
	answer++;
	x+= answer;
	updateCurrentCoord(x, y);
	player.energy-=10*answer;
	updateEnergy();
	if( x > array.length-1){
		var newCoord = setPlayerToPosition(); // contains if random or specific wormhole behaviour
		x = newCoord[0]; 
		y = newCoord[1];
		updateCurrentCoord(x, y);
		array[x][y] = 1;
		document.querySelector("#ship").style.transform = "rotate(0deg)";
	}
	array[x][y] = 1;
	document.querySelector("#ship").style.transform = "rotate(180deg)";
	updateMapDown();
    return array;
}

// Used for testing purposes
// Setting the array equal to the new Down array
function Down(){
    arr = moveDown(arr2D);
    arr = arr2D;
    console.table(arr2D);
}

/*-----------------------------------------------------------------------------------------------------------*/
function updateCurrentCoord(num1, num2){
	document.getElementById("current-coordinate-text").value = '(' + num1 + ',' + num2 +')';
}

function getCoords(){
	return {
		x,
		y
	};
}


function updateTargetCoord(num1, num2){

	document.getElementById("target-coordinate-text").value = '(' + num1 + ',' + num2 +')';
}