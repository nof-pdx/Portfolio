/** game configuration file */

var startLocation = document.getElementById("start-location");
var energy = document.getElementById("energy");
var supplies = document.getElementById("supplies");
var credits = document.getElementById("credits");
var playmode = document.getElementById("playmode");
var wormholeCoordinate = document.getElementById("wormhole-behaviour");
var maxGameSize = document.getElementById("max-game-size");

/* Listener: If you change input in game configuration --> update inventory */

startLocation.addEventListener('change', function() {
    // check if player would be outside of new map-size
    if (!checkValidCP(parseInt(document.getElementById("start-location").value.split(",")[0],10), 
    parseInt(document.getElementById("start-location").value.split(",")[1], 10))) {
        alert("This CP doesn't exist!");
        startLocation.value = startLocation.defaultValue;
        return;
    }
// current-coordinate-text
    arr2D[x][y] = 0;
    x = parseInt(document.getElementById("start-location").value.split(",")[0],10);
    y = parseInt(document.getElementById("start-location").value.split(",")[1],10);
    arr2D[x][y] = 1;

    // Update GUI coordinate
   document.getElementById("current-coordinate-text").value = "(" + x + "," + y + ")";
   document.getElementById("main-view").innerHTML = '';

   //map = new Map(128, objectInMap, null);
   document.getElementById("main-view").innerHTML = ''

   map.renderMap(getCoords().x, getCoords().y);
});


energy.addEventListener('change', function() {
    //document.getElementById("energy-text").value = energy.value;
		document.getElementById("energy-text").value = energy.value;
    player.energy = energy.value;
});

supplies.addEventListener('change', function() {
    document.getElementById("supplies-text").value = supplies.value;
    player.supplies = supplies.value.replace('%', '');
});

credits.addEventListener('change', function() {
    document.getElementById("credits-text").value = credits.value;
    player.credits = credit.value;
});

wormholeCoordinate.addEventListener('change', function() {
    // check if specific wormhole is outside the map
    if (maxGameSize.value <= parseInt(wormholeCoordinate.value.split(",")[0], 10)
    || maxGameSize.value <= parseInt(wormholeCoordinate.value.split(",")[1], 10)) {
				postToLog("Your specific wormhole behavior coordinate is outside the map. Type in a valid coordinate!");
        wormholeCoordinate.value = wormholeCoordinate.defaultValue;
    }
});

maxGameSize.addEventListener('change', function() {
    // check conditions that cause errors:

    // check if number >= 1
    if (!checkNumberGameSize()) {
        return;
    }

    // check if player is outside of new map-size
    if (!checkValidCP(x, y)) {
				postToLog("You can't reduce the game size if your player is on a higher location!");
        maxGameSize.value = arraySize;
        return;
    }

    // check if specific wormhole is on a coordinate that is too high (only specific wormhole behavior)
    if (document.getElementById("wormhole-behaviour-specific").checked) {
        if (maxGameSize.value <= parseInt(wormholeCoordinate.value.split(",")[0], 10)
        || maxGameSize.value <= parseInt(wormholeCoordinate.value.split(",")[1], 10)) {
						postToLog("Your specific wormhole behavior coordinate is too high. Reduce this coordinate to reduce the MAX game size!");
            maxGameSize.value = arraySize;
            return;
        }
    }

    arraySize = parseInt(maxGameSize.value, 10);
    arr2D = Array(arraySize).fill(0).map(x => Array(arraySize).fill(0));
});

/**
 * invoke after player is on a coordinate with a wormhole:
 * checks which wormhole-behaviour is chosen and sets the player
 * a) to a random coordinate or
 * b) to the specific coordinate of the game configuration
 */
function setPlayerToPosition() {
    var x = 0;
    var y = 0;
    if (document.getElementById("wormhole-behaviour-random").checked) {
        console.log("random ");
        x = Math.floor(Math.random() * parseInt(maxGameSize.value), 10);
        y = Math.floor(Math.random() * parseInt(maxGameSize.value), 10);
        console.log("x:" + x + " | y:" + y);
				postToLog("ship has returned to random location: (" + x + ", " + y + ")");

    } else if (document.getElementById("wormhole-behaviour-specific").checked) { // wormhole-behaviour-specific
        console.log("specific");
        x = parseInt(wormholeCoordinate.value.split(",")[0], 10); // without parseInt typeError
        y = parseInt(wormholeCoordinate.value.split(",")[1], 10);
				postToLog("ship has returned to specific location: (" + x + ", " + y + ")");
    }

    var arrayCoords = new Array();
    arrayCoords[0] = x;
    arrayCoords[1] = y;
    return arrayCoords;
}

/** player dies if energy <= 0 and regular-play playmode */
function checkPlaymode() {
    if (playmode === "regular-play") {
        if (player._energy <= 0) {
						postToLog("Your energy is empty. You died!");
            die("You died from running out of energy!");
        }
    }
}

/** helping function */
function checkNumberGameSize() {
    if (!isNaN(maxGameSize.value) && maxGameSize.value !== "" && maxGameSize.value >= 1) {
        return true;
    } else {
        console.log("invalid input")
				postToLog("Please type in a valid number!");
        maxGameSize.value = arraySize;
        return false;
    }
}

/** helping function */
function checkValidCP(x, y) {
    if (x >= maxGameSize.value || 
    y >= maxGameSize.value ||
    x < 0 || 
    y < 0) {
        return false;
    } else {
        return true;
    }
}