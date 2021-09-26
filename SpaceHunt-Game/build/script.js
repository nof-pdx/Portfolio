/******************************************************************************
 * Contains javaScript functions for SPACEHUNT
 * File: script.js 
 *
 *****************************************************************************/
//const INITIAL_ENERGY = 1000;    // player energy at the start of the game 
//alert("script.js linked");
const ENTER_ORBIT_ENERGY_COST = 1;
const LAND_ON_PLANET_ENERGY_COST = 10;
var isScanning = false;
var loadedGame = false;
var isMap = false;
/*-------------------------- ADDITIONAL FUNCTIONS ---------------------------*/

// random number generator
// TODO: test and finish function
function getRandomInt(max) 
{
	return Math.floor(Math.random() * max);
}


// return target coordinates.  The y-axis has been flipped to co-inside
// with SPACEHUNT map
// @param: x:int        [in] origin x
// @param: y:int        [in] origin y
// @param: distance:int [in] distance moved from orgin
// @param: angle:int    [in] angle to move in.  The only acceptable angles
//                           are % 30, e.g. 0, 30, 60, 90, 120, 150, 180, 
//                                          210, 240, 270, 300, 330
// @ret: array(target_x, target_y)
function calculateTargetCoordinates(x, y, distance, angle)
{
	var newX = 0;
	var newY = 0;
	var shortSide = 0.5;    // used for short side of triangle
	var longSide = 0.866;   // used for long side of triangle
	var output = new Array();    // array to return
	
	console.log(x, y, distance, angle);
	
	switch (eval(angle))
	{
		case 0:  // right
		{
			newX = x + distance;
			newY = y;
			break;
		}
		case 30:  // 30 degrees
		{
			newX = x + distance * longSide;
			newY = y - distance * shortSide;
			break;
		}
		case 60:  // 60 degrees
		{
			newX = x + distance * shortSide;
			newY = y - distance * longSide;
			break;
		}
		case 90:  // up
		{
			newX = x;
			newY = y - distance;
			break;
		}
		case 120:  // 120 degrees
		{
			newX = x - distance * shortSide;
			newY = y - distance * longSide;
			break;
		}
		case 150:  // 150 degrees
		{
			newX = x - distance * longSide;
			newY = y - distance * shortSide;
			break;
		}
		case 180:  // left
		{
			newX = x - distance;
			newY = y;
			break;
		}
		case 210:  // 210 degrees
		{
			newX = x - distance * longSide;
			newY = y + distance * shortSide;
			break;
		}
		case 240:  // 240 degrees
		{
			newX = x - distance * shortSide;
			newY = y + distance * longSide;
			break;
		}
		case 270:  // down
		{
			newX = x;
			newY = y + distance;
			break;
		}
		case 300:  // 300 degrees
		{
			newX = x + distance * shortSide;
			newY = y + distance * longSide;
			break;
		}
		case 330:  // 330 degrees
		{
			newX = x + distance * longSide;
			newY = y + distance * shortSide;
			break;
		}
		default:
		{
			alert("ERROR: passed angle must be divisible by 30");
		}
	}

	// round target values
	console.log(newX, newY, "before rounding");
	newX = Math.round(newX);
	newY = Math.round(newY);
	console.log(newX, newY, "after rounding");

	// return array
	output.push(newX);
	output.push(newY);
	console.log(output);
	return output;
}


// returns the energy cost to move the player in a given direction and sitance
// the direction is in degrees of 30 ranging from 0 to 330
// the distance is a positive integer
// by default: 10 units of energy is consumed for every 1 unit of movement
// @pre: assumes passed parameter is an integer
// @param: distance:int [in] positive integer 
// @ret: cost of energy on success
//       -1 a passed parameter is out of range
function calculateEnergyMovementCost(distance)
{
	// check if passed value is negative
	if(eval(distance) < 0)
	{
		return -1;
	}
	else
	{
		// add case statement later when upgrades are added
		// by default, energy cost is just [distance * 10]
		return 10 * eval(distance);
	}
}


// enables the jump button
// TODO: test function
function enableJumpButton()
{
	var btn = document.getElementById("jump-button");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disables the jump button
// TODO: test function
function disableJumpButton()
{
	var btn = document.getElementById("jump-button");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable the action button
// TODO: test function
function enableActionButton()
{
	var btn = document.getElementById("action-button");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable the action button
// TODO: test function
function disableActionButton()
{
	var btn = document.getElementById("action-button");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable the scan button
// TODO: test function
function enableScanButton()
{
	var btn = document.getElementById("scan-button");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable the scan button
// TODO: test function
function disableScanButton()
{
	var btn = document.getElementById("scan-button");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 0 degree navigation button
function enableNav0()
{
	var btn = document.getElementById("nav-button-0");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 0 degree navigation button
function disableNav0()
{
	var btn = document.getElementById("nav-butto-0");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 30 degree navigation button
function enableNav30()
{
	var btn = document.getElementById("nav-button-30");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 30 degree navigation button
function disableNav30()
{
	var btn = document.getElementById("nav-butto-30");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 60 degree navigation button
function enableNav60()
{
	var btn = document.getElementById("nav-button-60");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 60 degree navigation button
function disableNav60()
{
	var btn = document.getElementById("nav-butto-60");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 90 degree navigation button
function enableNav90()
{
	var btn = document.getElementById("nav-button-90");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 90 degree navigation button
function disableNav90()
{
	var btn = document.getElementById("nav-butto-90");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 120 degree navigation button
function enableNav120()
{
	var btn = document.getElementById("nav-button-120");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 120 degree navigation button
function disableNav120()
{
	var btn = document.getElementById("nav-butto-120");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 150 degree navigation button
function enableNav150()
{
	var btn = document.getElementById("nav-button-150");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 180 degree navigation button
function disableNav150()
{
	var btn = document.getElementById("nav-butto-150");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 180 degree navigation button
function enableNav180()
{
	var btn = document.getElementById("nav-button-180");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 180 degree navigation button
function disableNav180()
{
	var btn = document.getElementById("nav-butto-180");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 210 degree navigation button
function enableNav210()
{
	var btn = document.getElementById("nav-button-210");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 210 degree navigation button
function disableNav210()
{
	var btn = document.getElementById("nav-butto-210");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 240 degree navigation button
function enableNav240()
{
	var btn = document.getElementById("nav-button-240");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 240 degree navigation button
function disableNav240()
{
	var btn = document.getElementById("nav-butto-240");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 270 degree navigation button
function enableNav270()
{
	var btn = document.getElementById("nav-button-270");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 270 degree navigation button
function disableNav270()
{
	var btn = document.getElementById("nav-butto-270");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 300 degree navigation button
function enableNav300()
{
	var btn = document.getElementById("nav-button-300");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 300 degree navigation button
function disableNav300()
{
	var btn = document.getElementById("nav-butto-300");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable 330 degree navigation button
function enableNav330()
{
	var btn = document.getElementById("nav-button-330");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable 330 degree navigation button
function disableNav330()
{
	var btn = document.getElementById("nav-butto-330");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable navigation buttons
// TODO: test function
function enableNavButtons()
{
	enableNav0();
	enableNav30();
	enableNav60();
	enableNav90();
	enableNav120();
	enableNav150();
	enableNav180();
	enableNav210();
	enableNav240();
	enableNav270();
	enableNav300();
	enableNav330();
}


// disable navigation buttons
// TODO: test function
function disableNavButtons()
{
	disableNav0();
	disableNav30();
	disableNav60();
	disableNav90();
	disableNav120();
	disableNav150();
	disableNav180();
	disableNav210();
	disableNav240();
	disableNav270();
	disableNav300();
	disableNav330();
}


// enable the distance select controllers
function enableDistSelect()
{
	var btn = document.getElementById("cp-select");
	btn.disabled = false;
	
	// change color to grey
	btn.style.color = '#07B800';
	btn.style.borderColor = '#07B800';
}


// disable the distance select controllers
function disableDistSelect()
{
	var btn = document.getElementById("cp-select");
	btn.disabled = true;
	
	// change color back to green
	btn.style.color = '#888888';
	btn.style.borderColor = "#888888";
}


// enable the navigation panel
// TODO: enableNavButtons() is not working
function enableNavPanel()
{
	// enable all nav buttons and set to grey
	enableJumpButton();
	enableActionButton();
	enableScanButton();
	//enableDistSelect();
	//enableNavButtons();
}


// disable the navigation panel
// TODO: disableNavButtons() is not working
function disableNavPanel()
{
	// disable all nav buttons and set to grey
	disableJumpButton();
	disableActionButton();
	disableScanButton();
	//disableDistSelect();
	//disableNavButtons();
}


/*--------------------------- INITIALIZATION --------------------------------*/


// initialize board on startup
// TODO: test and finish function
/*
function initializeGame() 
{
	player.setEnergy(INITIAL_ENERGY);    // set players initial energy
	player.updateEnergy();
}
*/
let objectInMap = {
    numberAsteroids:4,
    numberPlanets:11,
    numberSpaceStations:4,
    numberWormHoles:4
}
// DEBUG: new map initialization later
var map;
//let map = new Map(128, objectInMap)

//console.log(map.getMapShow(50,50))

/*----------------------------- GAME LOGIC ----------------------------------*/

// starts logic for next turn
// TODO: test and finish function
function clickedJumpBtn()
{
	//alert("jump button clicked");
	var direction = document.getElementsByName("direction-select");
	for(i = 0; i < direction.length; i++) 
	{
		if(direction[i].checked)
		{
			let directionValue = direction[i].value;
			//alert("direction value is " + directionValue);
			
			// move ship based on angle and distance selected
			switch(eval(directionValue)) 
			{
				case 0:
				{
					Right();  // move right
					targetCoords();
					break;
				}
				case 90:
				{
					Up();  // move up
					targetCoords();
					break;
				}
				case 180:
				{	
					Left();  // move left
					targetCoords();
					break;
				}
				case 270:
				{	
					Down();  // move down
					targetCoords();
					break;
				}
				default:
					postToLog("Sorry, " + directionValue + " movement is not currently implemented");
			}
		}
	}
	x = getCoords().x;
	y = getCoords().y;
    console.log(x, y);

    postToLog("Now jumping to coordinates (" + x + "," +y + ")");

    console.log(map.getMessage(x, y).message);

	// check if player position is the same as a planet
	if(map.getMessage(x,y).message == "This is a Planet")
	{ // switch action button to orbit button
		switchActionToOrbit();
	}
	else
	{ // keep action button in it's default state
		defaultActionSettings();
    }

	// save ship orientation
	var shipDirection = document.querySelector("#ship").style.transform;
	if (document.getElementById("admin-mode-off").checked) {
		document.getElementById("main-view").innerHTML = ''
		map.renderMap(getCoords().x, getCoords().y);
	}
	if (document.getElementById("admin-mode2-on").checked) {
		document.getElementById("main-view").innerHTML = ''
		map.renderMap(getCoords().x, getCoords().y);
		for (var i = 0; i < map.mapObject.length; i++) {
			document.getElementById(map.mapObject[i]).style.visibility = "visible"
		}
	}
	// rotate ship
	document.querySelector("#ship").style.transform = shipDirection;
}

function clickedActionBtn()
{
    postToLog("Navigate to a planet to enable orbit functionality");
}

function showAllItems() {
  // save ship orientation
  var shipDirection = document.querySelector("#ship").style.transform;
	if (document.getElementById("admin-mode2-off").checked) {
		document.getElementById("main-view").innerHTML = ''
		map.renderMap(getCoords().x, getCoords().y);
	} else {
		document.getElementById("main-view").innerHTML = ''
		map.renderMap(getCoords().x, getCoords().y);
		for (var i = 0; i < map.mapObject.length; i++) {
			document.getElementById(map.mapObject[i]).style.visibility = "visible"
		}
	}
  document.querySelector("#ship").style.transform = shipDirection;
}


function viewCelestial() {
    if (document.getElementById("game-password").value == 'cs300' && document.getElementById("btn-admin").textContent != "Hide") {
		for (var i = 0; i < map.mapObject.length; i++) {
			document.getElementById(map.mapObject[i]).style.visibility = "visible"
		}
		document.getElementById("btn-admin").textContent = "Hide"
	}
	else if (document.getElementById("btn-admin").textContent == "Hide") {
		for (var i = 0; i < map.mapObject.length; i++) {
            document.getElementById(map.mapObject[i]).style.visibility = "hidden"
		}
		document.getElementById("game-password").value = ''
		document.getElementById("btn-admin").textContent = "Celestial"
	}
}

function targetCoords(){
	var answer = document.getElementById("cp-select").selectedIndex;
	answer = 1 + answer;
	coords = getCoords();
	//x = returnX();
	//y = returnY();
	var direction = document.getElementsByName("direction-select");
	for(i = 0; i < direction.length; i++) 
	{
		if(direction[i].checked)
		{
			let directionValue = direction[i].value;
			//alert("direction value is " + directionValue);
			
			// move ship based on angle and distance selected
			switch(eval(directionValue)) 
			{
				case 0:
				{
					console.log(coords.x,coords.y);
					newy = y + answer;
					updateTargetCoord(x,newy)
					break;
				}
				case 90:
				{
					newx = coords.x - answer;
					updateTargetCoord(newx,coords.y);
					break;
				}
				case 180:
				{
					newy = y - answer;
					updateTargetCoord(x,newy);
					break;
				}
				case 270:
				{
					newx = x + answer;
					updateTargetCoord(newx,y);
					break;
				}
				default:
					postToLog("Sorry, " + directionValue + " movement is not currently implemented");
			}
		}
	}	
}


// starts logic for next turn
// TODO: test and finish function
function clickedScanBtn()
{
    postToLog("Ship is now scanning local region");

	if (isScanning == false) {
		isScanning = true
		var view = document.getElementById("scan-result");
		document.getElementById("time-view").style.visibility = 'visible'
		//document.getElementById("artifact-panel").style.height = '0px'

		// scanning cost 2% of supplies --> remove 2% of supplies
		decSupplies(2);

		// remove previous items on celestrial map --> avoid bugs
    
		if (document.getElementById("admin-mode-on").checked) {
			var shipDirection = document.querySelector("#ship").style.transform;
			document.getElementById("main-view").innerHTML = ''
			map.renderMap(getCoords().x, getCoords().y);
			document.querySelector("#ship").style.transform = shipDirection; // rotate ship
		}

		view.style.visibility='visible';
		var timeleft = 10;
		var downloadTimer = setInterval(function(){
		if(timeleft <= 0){
			clearInterval(downloadTimer);
			document.getElementById("time-left").innerHTML = "Finished";
			view.style.visibility='hidden';
			document.getElementById("time-view").style.visibility = 'hidden'
			//document.getElementById("artifact-panel").style.height = 'auto'
			isScanning = false
			// remove planets, icons on celestrial map if admin-mode is off after timer is over

      /* DEBUG: Admin mode on pause */
			if (document.getElementById("admin-mode-off").checked) {
				for (var i = 0; i < map.mapObject.length; i++) {
					document.getElementById(map.mapObject[i]).style.visibility = "hidden";
				}
			}
		} else {
			document.getElementById("time-left").innerHTML = timeleft + " seconds remaining";
		}
		timeleft -= 1;
		}, 1000);
		
		planetHtml = map.getListScanResult()
		view.innerHTML = planetHtml
		map.scanObject()
		
	}

}


// fill GUI with stuff
function fillGUI()
{
	//checkSavedGame();

	if(loadedGame) 
		loadShipMap();

	else
		fillmap();

	fillUpgradesPanel();
	fillArtifactsPanel();
	fillEventsLog();
	
	if(loadedGame) 
		loadPlayerLabels();

}

function checkSavedGame() {
  var hasTestMap = false;
  //var hasGame = false;
	// Check if there is a saved game
	if(localStorage.length > 0) {
		// Loop through the local storage and look for a saved game
		for(var i = 0; i < localStorage.length; ++i) {
			if(localStorage.key(i).startsWith("gme-")) {
				// Found a saved game, load the save game UI
        hasTestMap = true;
				fillSavedGameUI();
			}
		}
	}
  if(hasTestMap == false) {
    saveTestMap();
  }
}

function saveTestMap() {
  loadedGame = false;
  fillGUI();
  saveGame("gme-test-map");
  checkSavedGame();
}

// DEBUG: new game setup too
function loadSavedGame(game_name) {
	if(game_name == null) {
		loadedGame = false;
	}
	else {
		loadedGame = true;
		loadGame(game_name);
		player = loadPlayer();
	}

  fillGUI();
}

// Loads the saved map and ship orientation
function loadShipMap() {
	map = new Map(getGameSize(), objectInMap, loadMap());
	map.renderMap(getCoords().x, getCoords().y);
    document.querySelector("#ship").style.transform = loadShip();

	// load in new map movement variables from Funderburgh.js
	arraySize = parseInt(getGameSize(), 10);
	arr2D = Array(arraySize).fill(0).map(x => Array(arraySize).fill(0))
}

// Sets the lables of energy, supplies, and credits
// to the newly loaded players values
function loadPlayerLabels() {
	document.getElementById("supplies-text").value = player.supplies + "%";
	document.getElementById("energy-text").value = player.energy;
	document.getElementById("credits-text").value = player.credits;
	document.getElementById("max-game-size").value = getGameSize();
}


// fill main view with 21 rows and 13 columns of 38x38 pixel tiles
function fillmap()
{
	if (isMap == false) {
		map = new Map(128, objectInMap, null);
		isMap = true;
		map.renderMap(getCoords().x, getCoords().y);

	}
}

function fillUpgradesPanel()
{
	//alert("fillUpgradesPanel() called");
	var view = document.getElementById("upgrade-panel");
	
	//	add upgrades to panel
	for(var i = 0; (i < 20); i++)
	{
		let num = i + 1;
		view.innerHTML = view.innerHTML + "<div class='upgrade-wrapper'>+ example upgrade " + num + " </div>";
	}
}

function fillArtifactsPanel()
{
	//alert("fillUpgradesPanel() called");
	var view = document.getElementById("artifact-panel");
	planetHtml = map.getPlannetHtml()
	view.innerHTML = planetHtml

	/*
	//	add upgrades to panel
	for(var i = 0; (i < 20); i++)
	{
		let num = i + 1;
		view.innerHTML = view.innerHTML + "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/64_planet.png' alt='planet artifact'><p class='artifact-text'>NAME: Planet " + num + "</p>	<p class='artifact-text'>LOCATION: (12, 12)</p></div>";
	}
	*/
}

function fillEventsLog()
{
	if(loadedGame)
		loadEvents();
	else { 
		postToLog("Welcome commander, may you have luck on your voyage.");
	}
}

// pass the data to event log
// TODO: test function
function postToLog(sentence)
{
	var view = document.getElementById("log-panel");
	view.innerHTML = "<div class='event-log-text'>" + sentence + "</div>" + view.innerHTML;
}


// enable enter orbit options
// TODO: test function
function switchActionToOrbit()
{
	view = document.getElementById("action-btn")
	view.innerHTML = "<button class='fill-button' id='action-button' onclick='enterOrbit()' value='enter-orbit'>ENTER ORBIT</button>"
}


// return action button to default settings
// TODO: test function
function defaultActionSettings()
{
    view = document.getElementById("action-btn");
    view.innerHTML = "<button class='fill-button' id='action-button' onclick='clickedActionBtn()' >ACTION</button>";
}


// load enter orbit screen and allow landing on planet 
// TODO: finish and test function
// TODO: add check to see if energy was used up
function enterOrbit()
{
	// disable navigation 
	disableNavPanel();
	
	// load orbit screen
	loadOrbitScreen();
	
	// post to event log
	postToLog("Ship is now entering orbit");
	
	// decrement energy by 1
	player.decreaseEnergy(ENTER_ORBIT_ENERGY_COST);
	updateEnergy();
}


// leave orbit screen and return to the standard map
// TODO: finish and test function
function leaveOrbit()
{
	// load map screen
    //var shipDirection = document.querySelector("#ship").style.transform;
    if (document.getElementById("admin-mode-off").checked) {
        document.getElementById("main-view").innerHTML = ''
        map.renderMap(getCoords().x, getCoords().y);
    }
    if (document.getElementById("admin-mode2-on").checked) {
        document.getElementById("main-view").innerHTML = ''
        map.renderMap(getCoords().x, getCoords().y);
        for (var i = 0; i < map.mapObject.length; i++) {
            document.getElementById(map.mapObject[i]).style.visibility = "visible"
        }
    }

    // rotate ship
    //document.querySelector("#ship").style.transform = shipDirection; 
	
	// enable navigation
	enableNavPanel();
	
	// post to event log
    postToLog("Ship is now leaving orbit");    
}


// bring up landed on planet screen and allow planetary options
// At this time, the only options are to scan planet for recipe and collect recipe
// TODO: add check to see if energy was used up
function landOnPlanet()
{
	// decrement energy
	player.decreaseEnergy(LAND_ON_PLANET_ENERGY_COST);
	updateEnergy();
	
	// load planet menubar
	postToLog("Ship is now landing on the planet");
	loadPlanetScreen();
}


function returnToOrbit()
{
	loadOrbitScreen();
    postToLog("Ship is now returning to orbit");
}


// load screen in main view for entering planet orbit
// screen allows player to either land on a planet or
// leave a planet's orbit
// TODO: finish and test function
function loadOrbitScreen()
{
	//alert("loading orbit screen");
	view = document.getElementById("main-view");
	message = "<p class='orbit-box-text'>Now entering planet orbit.  It will cost 10 energy to land on the planet.</p>";
	boxHeader = "<div class='orbit-box'>";
	landButton = "<button class='orbit-button' id='land-button' onclick='landOnPlanet()'>LAND ON PLANET</button>";
	leaveOrbitButton="<button class='orbit-button' id='leave-orbit-button' onclick='leaveOrbit()'>LEAVE ORBIT</button>";
	boxEnd = "</div>"

	// write html for box and buttons
	view.innerHTML = boxHeader + message + landButton + leaveOrbitButton + boxEnd;
	//alert(boxHeader + message + boxEnd);
}


// load screen in main view for landing on a planet
// screen allows player so scan for recipe, collect recipe, and return to orbit
// TODO: at a later time, planets will have more functionality
// TODO: customize options per planet
function loadPlanetScreen()
{
	//alert("loading landing screen");
	view = document.getElementById("main-view");
	message = "<p class='orbit-box-text'>You have now landed on the planet.</p>";
	boxHeader = "<div class='orbit-box'>";
	ScanPlanetButton = "<button class='orbit-button' id='scan-planet-button' onclick='clickedScanPlanetBtn()'>SCAN PLANET FOR RECIPE</button>";
	SearchPlanetButton = "<button class='orbit-button' id='search-planet-button' onclick='clickedSearchPlanetBtn()'>SEARCH FOR RECIPE</button>";
	returnToOrbitButton ="<button class='orbit-button' id='return-orbit-button' onclick='returnToOrbit()'>RETURN TO ORBIT</button>";
	boxEnd = "</div>"

	// write html for box and buttons
	view.innerHTML = boxHeader + message + ScanPlanetButton + SearchPlanetButton + returnToOrbitButton + boxEnd;	
}


// function called when scanning on a planet
// TODO: implement and test function
function clickedScanPlanetBtn()
{
	postToLog("scan planet is not yet implemented");
}


// function called when searching planet for recipe
// TODO: implement and test function
function clickedSearchPlanetBtn()
{
	postToLog("search planet is not yet implemented");
}



/*
// fill main view with 14 rows of 45x45 pixel tiles
function fill45()
{
	//alert("fill45() called");
	view = document.getElementById("main-view");

	// add 196 tiles
	for(var i = 0; (i < 196); i++)
	{
		if(i == 0)
		{
			view.innerHTML ="<div class='tile-small'></div>";
		}
		else
		{
			view.innerHTML = view.innerHTML + "<div class='tile-small'></div>";
		}
	
	}
}

// add an information screen
function fillInformation()
{
	view = document.getElementById("main-view");
	
	// add into text
	view.innerHTML = "<p style='color: white'> Welcome team. Here is a description describing the purpose "
                                        + "of the game and what the player needs to do to win and avoid losing </p>";

	// add some buttons and a text box for player name
	view.innerHTML = view.innerHTML + "<p style='color: white'>please enter name here:<input type='text' name='username' size='15'></p>";
	view.innerHTML = view.innerHTML + "<button>submit</button>";
}
*/






