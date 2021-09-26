
const Wormholes = 4
const Planets = 1
const Asteroids = 2
const SpaceStations = 3
const Probability = 20
let arrayObj = [0,Planets,Asteroids,SpaceStations,Wormholes]

for (var i = 0; i < Probability; i ++) {
    arrayObj.push(0);
}
class Map {

    constructor (size, objectInMap, copy) {
        this.mapHtml = ''
        this.mapObject = []
        if(copy == null) {
            this.numberWormHoles = 0;
            this.numberPlanets = 0;
            this.numberAsteroids = 0;
            this.numberSpaceStations = 0;

            objectInMap.numberWormHoles && (this.numberWormHoles=objectInMap.numberWormHoles)
            objectInMap.numberPlanets && (this.numberPlanets=objectInMap.numberPlanets)
            objectInMap.numberAsteroids && (this.numberAsteroids=objectInMap.numberAsteroids)
            objectInMap.numberSpaceStations && (this.numberSpaceStations=objectInMap.numberSpaceStations)

            this.size = size;
            this.myMap = new Array()
            this.arrayOfPlanet = new Array()
            this.arrayOfwormHole = new Array()
            this.arrayOfAsteroid = new Array()
            this.arrayOfSpaceStation = new Array()

            this.arrayOfPostionPlanet = new Array()
            this.arrayOfPostionwormHole = new Array()
            this.arrayOfPostionAsteroid = new Array()
            this.arrayOfPostionSpaceStation = new Array()

            this.arrayOfPlanetMap = new Array()
            this.arrayOfwormHoleMap = new Array()
            this.arrayOfAsteroidMap = new Array()
            this.arrayOfSpaceStationMap = new Array()

            for (var i = 0; i < this.size; i++) {
                this.myMap[i] = new Array()
                let itemOnRow = 10;
                for (var j = 0; j < this.size; j++) {
                let choosen = Math.floor(Math.random() * Probability)
                if (itemOnRow > 0 && i > this.size/3 && j > this.size/6 && i < 3 * this.size/5) {
                    if (choosen == Wormholes){
                        this.numberWormHoles--
                        if (this.numberWormHoles <= 0){
                            arrayObj[Wormholes] = 0
                        } else
                            this.arrayOfwormHole.push("("+i+", "+j+")")
                            this.arrayOfPostionwormHole.push({
                                x:i,
                                y:j
                            })
                    }
                    else if (choosen == Planets){
                        this.numberPlanets--   
                        if (this.numberPlanets <= 0){
                            arrayObj[Planets] = 0
                        } else {
                            this.arrayOfPlanet.push("("+i+", "+j+")");
                            this.arrayOfPostionPlanet.push({
                                x:i,
                                y:j
                            })
                        }
                    }          
                    else if (choosen == Asteroids){
                        this.numberAsteroids--   
                        if (this.numberAsteroids <= 0){
                            arrayObj[Asteroids] = 0
                        } else
                            this.arrayOfAsteroid.push("("+i+", "+j+")")
                            this.arrayOfPostionAsteroid.push({
                                x:i,
                                y:j
                            })
                    }         
                    else if (choosen == SpaceStations){
                        this.numberSpaceStations--
                        if (this.numberSpaceStations <= 0){
                            arrayObj[SpaceStations] = 0
                        } else
                            this.arrayOfSpaceStation.push("("+i+", "+j+")")
                            this.arrayOfPostionSpaceStation.push({
                                x:i,
                                y:j
                            })
                            
                    }
                    if (choosen != 0)
                        itemOnRow -= 1
                } else
                    choosen = 0;
 
                this.myMap[i][j] = arrayObj[choosen];
                }
            }
        }
        else {
            this.numberWormHoles = copy.numberWormHoles;
            this.numberPlanets = copy.numberPlanets;
            this.numberAsteroids = copy.numberAsteroids;
            this.numberSpaceStations = copy.numberSpaceStations;
    
            this.size = copy.size; // DEBUG: testing array copy instructor
            this.myMap = copy.myMap;
            this.arrayOfPlanet = copy.arrayOfPlanet;
            this.arrayOfwormHole = copy.arrayOfwormHole;
            this.arrayOfAsteroid = copy.arrayOfAsteroid;
            this.arrayOfSpaceStation = copy.arrayOfSpaceStation;
    
            this.arrayOfPostionPlanet = copy.arrayOfPostionPlanet;
            this.arrayOfPostionwormHole = copy.arrayOfPostionwormHole;
            this.arrayOfPostionAsteroid = copy.arrayOfPostionAsteroid;
            this.arrayOfPostionSpaceStation = copy.arrayOfPostionSpaceStation;
    
            this.arrayOfPlanetMap = copy.arrayOfPlanetMap;
            this.arrayOfwormHoleMap = copy.arrayOfwormHoleMap;
            this.arrayOfAsteroidMap = copy.arrayOfAsteroidMap;
            this.arrayOfSpaceStationMap = copy.arrayOfSpaceStationMap;
        }
    }

    // copy constructor for loading saved map
    /*constructor (copy) {
        this.numberWormHoles = copy.numberWormHoles;
        this.numberPlanets = copy.numberPlanets;
        this.numberAsteroids = copy.numberAsteroids;
        this.numberSpaceStations = copy.numberSpaceStations;

        this.size = copy.size; // DEBUG: testing array copy instructor
        this.myMap = new Array(copy.myMap);
        this.arrayOfPlanet = new Array(copy.arrayOfPlanet);
        this.arrayOfwormHole = new Array(copy.arrayOfwormHole);
        this.arrayOfAsteroid = new Array(copy.arrayOfAsteroid);
        this.arrayOfSpaceStation = new Array(copy.arrayOfSpaceStation);

        this.arrayOfPostionPlanet = new Array(copy.arrayOfPostionPlanet);
        this.arrayOfPostionwormHole = new Array(copy.arrayOfPostionwormHole);
        this.arrayOfPostionAsteroid = new Array(copy.arrayOfPostionAsteroid);
        this.arrayOfPostionSpaceStation = new Array(copy.arrayOfPostionSpaceStation);

        this.arrayOfPlanetMap = new Array(copy.arrayOfPlanetMap);
        this.arrayOfwormHoleMap = new Array(copy.arrayOfwormHoleMap);
        this.arrayOfAsteroidMap = new Array(copy.arrayOfAsteroidMap);
        this.arrayOfSpaceStationMap = new Array(copy.arrayOfSpaceStationMap);
    }*/

    
    getMessage = (x, y, show_alert = false) => {
        const Wormholes = 4
        const Planets = 1
        const Asteroids = 2
        const SpaceStations = 3

        let stringCompare = "("+x+", "+y+")"
        let message = "Nothing Happen. Keep moving"
        let code = 0
        if (x > this.size || y > this.size || x < 0 || y < 0) {
            message = "Out of bound"
            code = -1
        }
        else if (this.arrayOfAsteroid.includes(stringCompare)) {
            message = "This is a Asteriod"
            code = Asteroids
        }
        else if (this.arrayOfPlanet.includes(stringCompare)) {
             message = "This is a Planet"
             code = Planets
        }
        else if (this.arrayOfSpaceStation.includes(stringCompare)) {
            message = "This is a Space Station"
            code = SpaceStations
        } 
        else if (this.arrayOfwormHole.includes(stringCompare)) {
            message = "This is a Wormhole"
            code = SpaceStations
        }
        if (show_alert && code != 0) {
            alert(message)
        }
        return {
            message: message,
            code: code
        }
    }       

    getPlannetHtml = () => {
        let planetHtml = ''
        for (let i=0; i < this.arrayOfPlanet.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/64_planet.png' alt='planet artifact'><p class='artifact-text'>NAME: Planet " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        console.log(planetHtml)
        return planetHtml
    }

   fillmap = (x, y) => {
        var view = document.getElementById("main-view");

        // add 273 tiles

        // scan from player
        list_obj = []

        for (var i= x-1; i > 0 && i > x-10; i--)
            for (var j = y+1; j < y+6; j++) {
                let stringCompare = "("+i+", "+j+")";
                if (this.arrayOfAsteroid.includes(stringCompare)) {
                    let message = "This is a Asteriod"
                    let offset_x = x-i;
                    let offset_y = j-y;
                    let position = 136 - offset_x - offset_y*21
                    list_obj.push(position)
                }
                else if (this.arrayOfPlanet.includes(stringCompare)) {
                     message = "This is a Planet"
                     let offset_x = x-i;
                     let offset_y = j-y;
                     let position = 136 - offset_x - offset_y*21
                     list_obj.push(position)
                }
                else if (this.arrayOfSpaceStation.includes(stringCompare)) {
                    message = "This is a Space Station"
                    let offset_x = x-i;
                    let offset_y = j-y;
                    let position = 136 - offset_x - offset_y*21
                    list_obj.push(position)
                } 
                else if (this.arrayOfwormHole.includes(stringCompare)) {
                    message = "This is a Wormhole"
                    let offset_x = x-i;
                    let offset_y = j-y;
                    let position = 136 - offset_x - offset_y*21
                    list_obj.push(position)
                }
            }
        for(var i = 0; (i < 273); i++)
        {
            
            if(i == 0)
            {
                view.innerHTML ="<div class='tile'></div>";
            }
            else if(i == 136)
            {
                view.innerHTML = view.innerHTML + "<div class='tile'><img class='tile-image-wrapper' src='img/64_ship.png' id='ship' alt='ship' title='ship'></div>";
            }

            else if(i == 3)
            {
                view.innerHTML = view.innerHTML + "<div class='tile'><img class='tile-image-wrapper' src='img/64_planet.png' alt='planet' title='planet'></div>";
            }
            else
            {
                view.innerHTML = view.innerHTML + "<div class='tile'></div>";
            }
        }
   }

    renderMap = (x,y) => {
        this.arrayOfPlanetMap = []
        this.arrayOfwormHoleMap = []
        this.arrayOfAsteroidMap = []
        this.arrayOfSpaceStationMap = []
        this.mapObject = []
        for (let i=0; i < this.arrayOfPlanet.length; i++) {
            var position_x = this.arrayOfPostionPlanet[i].x;
            var position_y = this.arrayOfPostionPlanet[i].y;
            var position_show = 136 + (position_x-x)*21 + position_y-y
            console.log(position_show)
            this.arrayOfPlanetMap.push(position_show)
        }
        for (let i=0; i < this.arrayOfPostionwormHole.length; i++) {
            var position_x = this.arrayOfPostionwormHole[i].x;
            var position_y = this.arrayOfPostionwormHole[i].y;
            var position_show = 136 + (position_x-x)*21 + position_y-y
            console.log(position_show)
            this.arrayOfwormHoleMap.push(position_show)
        }
        for (let i=0; i < this.arrayOfPostionAsteroid.length; i++) {
            var position_x = this.arrayOfPostionAsteroid[i].x;
            var position_y = this.arrayOfPostionAsteroid[i].y;
            var position_show = 136 + (position_x-x)*21 + position_y-y
            console.log(position_show)
            this.arrayOfAsteroidMap.push(position_show)
        }
        for (let i=0; i < this.arrayOfPostionSpaceStation.length; i++) {
            var position_x = this.arrayOfPostionSpaceStation[i].x;
            var position_y = this.arrayOfPostionSpaceStation[i].y;
            var position_show = 136 + (position_x-x)*21 + position_y-y
            console.log(position_show)
            this.arrayOfSpaceStationMap.push(position_show)
        }
        document.getElementById("main-view").innerHTML = ''
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
                view.innerHTML = view.innerHTML + "<div class='tile'><img class='tile-image-wrapper' src='img/64_ship.png' id='ship' alt='ship' title='ship'></div>";
            }
            else {
                if (map.arrayOfPlanetMap.includes(i)) {
                    this.mapObject.push("atf" + i );

                    console.log("Planet: " + i);
                    view.innerHTML = view.innerHTML + "<div class='tile'><img style='visibility: hidden;' id=atf" + i + " class='tile-image-wrapper' src='img/64_planet.png' alt='planet' title='planet'></div>";
                }
                else if (map.arrayOfwormHoleMap.includes(i)) {
                    this.mapObject.push("atf" + i );

                    console.log("Wormhole: " + i);
                    view.innerHTML = view.innerHTML + "<div class='tile'><img style='visibility: hidden;' id=atf" + i + " class='tile-image-wrapper' src='img/wormhole.jpeg' alt='wormhole' title='wormhole'></div>";
                }
                else if (map.arrayOfAsteroidMap.includes(i)) {
                    this.mapObject.push("atf" + i );

                    console.log("Asteriod: " + i);
                    view.innerHTML = view.innerHTML + "<div class='tile'><img style='visibility: hidden;' id=atf" + i + " class='tile-image-wrapper' src='img/asteriod.jpeg' alt='asteriod' title='asteriod'></div>";
                }
                else if (map.arrayOfSpaceStationMap.includes(i)) {
                    this.mapObject.push("atf" + i );

                    console.log("Space Station: " + i);
    
                    view.innerHTML = view.innerHTML + "<div class='tile'><img style='visibility: hidden;' id=atf" + i + " class='tile-image-wrapper' src='img/space_station.png' alt='spacestation' title='space_station'></div>";
                }
                else
                {

                    view.innerHTML = view.innerHTML + "<div class='tile'></div>";
                }
            }
            
        }
        this.mapHtml = view.innerHTML;

    };

    getMapHtml = () => this.mapHtml;

    renderMapFromSave = (htmlMap) => {      
      document.getElementById("main-view").innerHTML = htmlMap;
    }

    getMapArtifact = () => {
        let planetHtml = ''
        for (let i=0; i < this.arrayOfPlanet.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order
			view.innerHTML = view.innerHTML + "<div class='tile'><img class='tile-image-wrapper' src='img/64_planet.png' alt='planet' title='planet'></div>";

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/64_planet.png' alt='planet artifact'><p class='artifact-text'>NAME: Planet " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        for (let i=0; i < this.arrayOfAsteroid.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/asteriod.jpeg' alt='planet artifact'><p class='artifact-text'>NAME: Asteroid " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        for (let i=0; i < this.arrayOfSpaceStation.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/space_station.png' alt='planet artifact'><p class='artifact-text'>NAME: Space Station " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        for (let i=0; i < this.arrayOfwormHole.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/wormhole.jpeg' alt='planet artifact'><p class='artifact-text'>NAME: Worm Hole " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        console.log(planetHtml)
        return planetHtml
    }

    scanObject = () => {
        var scanArray = [138,135,137,134, 113, 116,115,114,117, 92,93,94,95,96, 159,157,156,155, 158, 180,177,176,179]
        for (i in scanArray) {
            var id_check = "atf" + scanArray[i];
            console.log(id_check);
            if (this.mapObject.includes(id_check)) {
                document.getElementById(id_check).style.visibility = "visible"
            }
        }
    }
    getListScanResult = () => {
        let planetHtml = ''
        for (let i=0; i < this.arrayOfPlanet.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/64_planet.png' alt='planet artifact'><p class='artifact-text'>NAME: Planet " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        for (let i=0; i < this.arrayOfAsteroid.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/asteriod.jpeg' alt='planet artifact'><p class='artifact-text'>NAME: Asteroid " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        for (let i=0; i < this.arrayOfSpaceStation.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/space_station.png' alt='planet artifact'><p class='artifact-text'>NAME: Space Station " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        for (let i=0; i < this.arrayOfwormHole.length; i++) {
            let order = i + 1
            let orderPlanet = (i<9)? "0"+order:order

            planetHtml += "<div class='artifact-wrapper'><img class='artifact-image-wrapper' src='img/wormhole.jpeg' alt='planet artifact'><p class='artifact-text'>NAME: Worm Hole " + orderPlanet + "</p>	<p class='artifact-text'>" + this.arrayOfPlanet[i] + "</p></div>";
    
        }
        console.log(planetHtml)
        return planetHtml
    }

    getMapHtml = () => {
        let myTable = `<table id='map'>` + '\n'
        for (let i=0; i < this.size; i++) {
            myTable += "<tr>" + '\n';
            for(let j=0; j< this.size; j++) {
                let cellColor = "white"
                if (this.myMap[i][j] == 1) {
                    cellColor = "green"
                }
                else if (this.myMap[i][j] == 2) {
                    cellColor = "blue"
                }
                else if (this.myMap[i][j] == 3) {
                    cellColor = "pink"
                }
                if (this.myMap[i][j] == 4) {
                    cellColor = "black"
                }
                myTable += '<td class="cell" id=' + i + '-' + j+ '"' + ' value=' + '"'+ this.myMap[i][j]  + '"' + ' style="background-color:' + cellColor + '"'+   ' >'
                myTable += this.myMap[i][j]
                myTable += '</td>' + '\n'
            }
            myTable += '</td>' + '\n'
        }
        myTable += '</table>' + '\n'
        return myTable
    }
 }
