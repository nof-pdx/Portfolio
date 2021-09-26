/*****************************************/
/* Saved Game variables */
var saveGameCount = 0;


var game_config = {
    playmode: "playmode",
    wormhole_behave: false, // false = random
    wormhole_specific: "0,0",
    game_sz: 0
};

var game_state = {
    player_data: player,
    shipDirection: "rotate(0deg)",
    map_data: Map,
    game_config_data: game_config,
    coordinates: getCoords(),
    events: "events"
};

// GAME CONFIG
function saveGameConfig() {
    game_config.playmode = document.getElementById("playmode").value;
    game_config.wormhole_behave = document.getElementById("wormhole-behaviour-specific").checked;
    game_config.wormhole_specific = document.getElementById("wormhole-behaviour").value;
    game_config.game_sz = document.getElementById("max-game-size").value;
}

function getGameSize() {
    return game_config.game_sz;
}

function saveGameState() {
    game_state.player = player;
    game_state.coordinates = getCoords();
    game_state.map_data = map;
    game_state.events = document.getElementById("log-panel").innerHTML;
    if(document.querySelector("#ship") != null)
        game_state.shipDirection = document.querySelector("#ship").style.transform;
}

function saveGame(save_name) {
    if(checkStorage()) {
        saveGameConfig();
        saveGameState();
        localStorage.setItem(save_name, JSON.stringify(game_state));
    }
}

function loadEvents() {
    document.getElementById("log-panel").innerHTML = game_state.events;
}

function loadMap() {    
    return game_state.map_data;
}


function loadPlayer() {
    x = game_state.coordinates.x;
    y = game_state.coordinates.y;
    updateCurrentCoord(game_state.coordinates.x, game_state.coordinates.y);
    return game_state.player_data;
}

function loadGame(game_name) {
    var loadedGame = localStorage.getItem(game_name);
    game_state = JSON.parse(loadedGame);
    game_config = game_state.game_config_data;
}

function loadShip() {
    return game_state.shipDirection;
}

function checkStorage() {
    if(typeof(Storage) == "undefined") {
        console.log("Storage not allowed");
        return false;
    }
    return true;
}

// Sets the main-view to display previosly
// saved games
function fillSavedGameUI() {
    saveGameCount = 0;
    view = document.getElementById("main-view");
    // add into text
	view.innerHTML = "<p style='color: green'> Welcome. Please select a game to load, or create a new game </p>";

    for(var i = 0; i < localStorage.length; ++i) {
        if(localStorage.key(i).startsWith('gme-')) {
            view.innerHTML +=  "<div class='upgrade-wrapper'>  <input type='radio' id='game_" + saveGameCount +"' " + 
            "value='" + localStorage.key(i) + "'> " +  
            localStorage.key(i).substring(4).toLocaleUpperCase() + 
            " </div>";
            ++saveGameCount;
        }
    }
    //view.innerHTML += "<div class='config-item-wrapper";
    //view.innerHTML += "<div class='config-item-left";
    view.innerHTML += "<button onclick='getSelectedGame()' value='test'>LOAD</button>";
    //view.innerHTML += "</div>"
    view.innerHTML += "<button onclick='newGame()'>NEW</button>";
    //view.innerHTML += "</div>"
}

function newGame() {
    loadSavedGame(null);
}

function getSelectedGame() {
    for(var i = 0; i < saveGameCount; ++i) {
        var game_id = document.getElementById("game_" + i.toString());
        if(game_id.checked) {
            loadSavedGame(game_id.value);
            return;
        }
    }
}

function clickedSave() {
    var gameName = prompt("Enter the name for your saved game");
    if(gameName != null) {
        var name = "gme-" + gameName;
        saveGame(name);
    }
}
