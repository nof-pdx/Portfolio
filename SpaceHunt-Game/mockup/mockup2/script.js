//alert("script linked");


// fill GUI with stuff
function fillGUI()
{
	fillmap();
	fillUpgradesPanel();
	fillArtifactsPanel();
	fillEventsLog();
}


// fill main view with 21 rows and 13 columns of 38x38 pixel tiles
function fillmap()
{
	//alert("fillmap() called");
	var view = document.getElementById("main-view");

	// add 273 tiles
	for(var i = 0; (i < 273); i++)
	{
		if(i == 0)
		{
			view.innerHTML ="<div class='tile'></div>";
		}
		else if(i == 136)
		{
			view.innerHTML = view.innerHTML + "<div class='tile'><img class='tile-image-wrapper' src='img/64_ship.png' alt='planet'></div>";
		}
		else if(i == 60 || i == 200 || i == 127)
		{
			view.innerHTML = view.innerHTML + "<div class='tile'><img class='tile-image-wrapper' src='img/64_planet.png' alt='planet'></div>";
		}
		else
		{
			view.innerHTML = view.innerHTML + "<div class='tile'></div>";
		}
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
	
	//	add upgrades to panel
	for(var i = 0; (i < 20); i++)
	{
		let num = i + 1;
		view.innerHTML = view.innerHTML + "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/64_planet.png' alt='planet artifact'><p class='artifact-text'>NAME: Planet " + num + "</p>	<p class='artifact-text'>LOCATION: (12, 12)</p></div>";
	}
}

function fillEventsLog()
{
	postToLog("Welcome commander, may you have luck on your voyage.");
	postToLog("SCAN RESULT: 3 asteroids sicovered along with 1 wormhole.");
	postToLog("JUMP: now arriving at location (4, 3). WARNING: ship collided with asteroid and is now damaged. Please repair the ship as soon as possible");
	postToLog("JUMP: now arriving at location (5, 10)");
	postToLog("JUMP: now arriving at location (8, 16)");
	postToLog("JUMP: now arriving at location (14, 46)");
	postToLog("WARNING: ship energy is at or below 1%");
	postToLog("NOW DOCKING AT STATION. Please remember to repair ship and recharge energy.");
}

// pass the data to event log
function postToLog(sentence)
{
	var view = document.getElementById("log-panel");
	view.innerHTML = "<div class='event-log-text'>" + sentence + "</div>" + view.innerHTML;
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
