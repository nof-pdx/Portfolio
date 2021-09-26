var savedImageUp = "";
var savedImageDown = "";
var savedImageLeft = "";
var savedImageRight = "";
var lastMove = "";

function updateMapRight() {

    if (document.getElementById("admin-mode-off").checked) {
        return;
    }

    if (onlyWorksFor1CP()) {
        return;
    }

    var view = document.getElementById("main-view");
    var tiles = view.getElementsByClassName("tile");

    // variables needed to avoid eating universe
    var lastMoveLocal = lastMove;
    lastMove = "right";
    var savedImageNew = tiles[137].innerHTML;
    var savedImageUse = savedImageRight;
    savedImageRight = savedImageNew;

    // update images on map bc of movement
    for (var i = 1; i <= 270; i++) {
        if (i != 136 && i != 137) {
            tiles[i-1].innerHTML = tiles[i].innerHTML;
        }

        // avoid eating universe
        if (i == 135) {
            switch(lastMoveLocal) {
                case "down": tiles[i].innerHTML = savedImageDown; break;
                case "left": tiles[i].innerHTML = savedImageLeft; break;
                case "up": tiles[i].innerHTML = savedImageUp; break;
                case "right": tiles[i].innerHTML = savedImageUse; break;
            }
        }
    }

    // edges
    for (var j = 20; j <= 272; j+=21) {
        tiles[j].innerHTML = "";
    }
}


function updateMapLeft() {

    if (document.getElementById("admin-mode-off").checked) {
        return;
    }

    if (onlyWorksFor1CP()) {
        return;
    }

    var view = document.getElementById("main-view");
    var tiles = view.getElementsByClassName("tile");

    // variables needed to avoid eating universe
    var lastMoveLocal = lastMove;
    lastMove = "left";
    var savedImageNew = tiles[135].innerHTML;
    var savedImageUse = savedImageLeft;
    savedImageLeft = savedImageNew;

    // update images on map bc of movement
    for (var i = 272; i >= 1; i--) {
        if (i != 136 && i != 137) {
            tiles[i].innerHTML = tiles[i-1].innerHTML;
        }

        // avoid eating universe
        if (i == 137) {
            switch(lastMoveLocal) {
                case "down": tiles[i].innerHTML = savedImageDown; break;
                case "up": tiles[i].innerHTML = savedImageUp; break;
                case "right": tiles[i].innerHTML = savedImageRight; break;
                case "left": tiles[i].innerHTML = savedImageUse; break;
            }
        }

        // edges
        if (i <= 20) {
            for (var j = 0; j <= 272; j+=21) {
                tiles[j].innerHTML = "";
            }
        }
        
    }
}


function updateMapUp() {

    if (document.getElementById("admin-mode-off").checked) {
        return;
    }

    if (onlyWorksFor1CP()) {
        return;
    }

    var view = document.getElementById("main-view");
    var tiles = view.getElementsByClassName("tile");

    // variables needed to avoid eating universe
    var lastMoveLocal = lastMove;
    lastMove = "up";
    var savedImageNew = tiles[115].innerHTML;
    var savedImageUse = savedImageUp;
    savedImageUp = savedImageNew;

    // update images on map bc of movement
    for (var i = 272; i >= 21; i--) {
        if (i != 136 && i != 157) {
            tiles[i].innerHTML = tiles[i-21].innerHTML;
        }

        // avoid eating universe
        if (i == 157) {
            switch(lastMoveLocal) {
                case "down": tiles[i].innerHTML = savedImageDown; break;
                case "left": tiles[i].innerHTML = savedImageLeft; break;
                case "right": tiles[i].innerHTML = savedImageRight; break;
                case "up": tiles[i].innerHTML = savedImageUse; break;
            }
        }

        if (i <= 21) {
            for (var j = 0; j <= 20; j++) {
                tiles[j].innerHTML = "";
            }
        }
    }

    
}

function updateMapDown() {

    if (document.getElementById("admin-mode-off").checked) {
        return;
    }

    if (onlyWorksFor1CP()) {
        return;
    }
    
    var view = document.getElementById("main-view");
    var tiles = view.getElementsByClassName("tile");

    // variables needed to avoid eating universe
    var lastMoveLocal = lastMove;
    lastMove = "down";
    var savedImageNew = tiles[157].innerHTML;
    var savedImageUse = savedImageDown;
    savedImageDown = savedImageNew;

    // update images on map bc of movement
    for (var i = 0; i <= 251; i++) {
        if (i != 136 && i != 115) {
            tiles[i].innerHTML = tiles[i+21].innerHTML;
        }

        // avoid eating universe
        if (i == 115) {
            switch(lastMoveLocal) {
                case "up": tiles[i].innerHTML = savedImageUp; break;
                case "left": tiles[i].innerHTML = savedImageLeft; break;
                case "right": tiles[i].innerHTML = savedImageRight; break;
                case "down": tiles[i].innerHTML = savedImageUse; break;
            }
        }
    }

    // edges
    for (var j = 252; j <= 272; j++) {
        tiles[j].innerHTML = "";
    }
    
}


function onlyWorksFor1CP() {
    // does not work if ship moves more than 1 cp at once
    if (document.getElementById("cp-select").value !== "cp_1") {
        var shipDirection = document.querySelector("#ship").style.transform;
        document.getElementById("main-view").innerHTML = ''
		map.renderMap(getCoords().x, getCoords().y);
        // rotate ship
	    document.querySelector("#ship").style.transform = shipDirection;
        return true;
    } else {
        return false;
    }
}
