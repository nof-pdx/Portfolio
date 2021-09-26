 /******************************************************************************
 * Contains javaScript of functions for SPACEHUNT
 * File: script.js 
 *
 *****************************************************************************/

/*-------------------------- PLAYER VARIABLES ------------------------------*/
var player = {
    name: "name",
    _energy: 1000,
    _supplies: 100.0,
    credits: 1000,
    startEnergyLevel: 1000,
    recipeAcquired: false,
		damaged: false,
    dead: false,
  
    die: function(message) {
     //this.dead = true;
     var newDiv = $(document.createElement('div'));
     newDiv.html(message);                               
     newDiv.dialog( {
       title: "Game Over!",
       show: {
         effect: "blind",
         duration: 1000
       },
       hide: {
         effect: "explode",
         duration: 1000
       },
       close: function(event) {
         window.location.href = window.location.href;
       }
     });
    },
  
     /* For monitoring supply levels */
    supplyListener: function (val) { },
    set supplies(val) {
      this._supplies = val;
      if(val < 1)
        this.dead = true;
      updateSupplies();
      //this.supplyListener();
    },
    get supplies() {
      return this._supplies;
    },
    registerSupplyListener: function (listener) {
      this.supplyListener = listener;
    },
  
    /* For monitoring energy levels */
    energyListener: function (val) { },
    set energy(val) {
      this._energy = val;
      //this.energyListener(val);
    },
    get energy() {
      return this._energy;
    },
    registerEnergyListener: function (listener) {
      this.energyListener = listener;
    },
		
		// check if the ship is damaged
		// @ret: true if ship is damaged, else false if ship is not damaged
		isShipDamaged: function() 
		{
			if(this.damaged == true)
			{
				return true;
			}
			else
			{
				return false;
			}
		},

		// check if energy is 0
		// @pre: energy must be >= 0
		// @ret: true if energy is 0, else false if energy > 0
		isEnergyEmpty: function() 
		{
			if(this.energy <= 0) 
			{
				return true;
			}
			else 
			{
				return false;
			}
		},
		
		// increase player energy by a set amount
		// @param: increment:int [in] increase energy by increment, argument must be (+)
		// @ret: 0 if energy added correctly
		// @error: return -1 if passed argument is not positive
		increaseEnergy: function(increment) 
		{
			if(eval(increment) < 0)
			{
				return -1;
			}
			else
			{
				this.energy = eval(this.energy) + eval(increment);
				return 0;
			}
		},

		// decrease player energy by a set amount
		// @post: if energy drops below 0, then energy is set to 0
		// @param: decrement:int [in] decrease energy by decrement, argument must be (+)
		// @error: return -1 if passed argument is not positive
		decreaseEnergy: function(decrement) 
		{
			if(decrement < 0)
			{
				return -1;
			}
			else
			{
				this._energy = eval(this._energy) - eval(decrement);
				if(this._energy < 0)
				{
					this._energy = 0;
				}
				return 0;
			}
		},

		// set energy to the passed argument
		// @post: if past number is less than 0, playerEnergy will be set to 0
		// @param: number:int [in] set player energy to number, argument must be (+)
		// @ret: return value of energy after being set
		setEnergy: function(number) 
		{
			if(number < 0)
			{
				this.energy = 0;
				return this.energy;
			}
			else
			{
				this.energy = number;
				return this.energy;
			}
    },	

    // set recipe acquired to true
    setRecipeAcquired: function ()
    {
        this.recipeAcquired = true;
    },

    // check if recipe was acquired
    isRecipeAcquired: function () {
        if (this.recipeAcquired == true) {
            return true;
        }
        else
        {
            return false;
        }
    },
  };
  
  /*
  player.registerSupplyListener(function () {
    if ((player.supplies < 1)) {
      alert("Supplies fell below 1%");  // removing this alert box causes test to fail
			//postToLog("Supplies fell below 1%");    // leaving commented out to above test is modified
  
      // If game config is set to 'regular play' end the game
      var playmode = document.getElementById("playmode");
      if(playmode != null) {
        if (document.getElementById("playmode").value == 'regular-play') {
          //alert("player dead");
          //player.dead = true;
          player.die("You died from running out of supplies!");
        }
      }
    }
    // Update Supply label
    var supplyLbl = document.getElementById("supplies-text");
    if(supplyLbl != null){
      document.getElementById("supplies-text").value = player.supplies + '%';
    }
  }); */
  
  /*player.registerEnergyListener(function (val) {
    if ((player.energy / player.startEnergyLevel) < .01)
      alert("Energy fell below 1%");
  
    // Update energy label on webpage
    document.getElementById("energy").value = player.energy;
  });*/

  function die(message) {
    var newDiv = $(document.createElement('div'));
    newDiv.html(message);                               
    newDiv.dialog( {
      title: "Game Over!",
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      },
      close: function(event) {
        window.location.href = window.location.href;
      }
    });
   }

  // For testing 
  function decSupplies(val) {
    player.supplies -= val;
  }

  function updateSupplies() {
    if ((player.supplies < 1)) {
      alert("Supplies fell below 1%");  // removing this alert box causes test to fail
			//postToLog("Supplies fell below 1%");    // leaving commented out to above test is modified
  
      // If game config is set to 'regular play' end the game
      var playmode = document.getElementById("playmode");
      if(playmode != null) {
        if (document.getElementById("playmode").value == 'regular-play') {
          //alert("player dead");
          //player.dead = true;
          die("You died from running out of supplies!");
        }
      }
    }
    // Update Supply label
    var supplyLbl = document.getElementById("supplies-text");
    if(supplyLbl != null){
      document.getElementById("supplies-text").value = player.supplies + '%';
    }
  }

  /** decrease energy */
  function updateEnergy() {
    if ((player.energy / player.startEnergyLevel) < .01) {
      alert("Supplies fell below 1%");  // removing this alert box causes test to fail
			//postToLog("Supplies fell below 1%");    // leaving commented out to above test is modified
  
      // If game config is set to 'regular play' end the game
      var playmode = document.getElementById("playmode");
      if(playmode != null) {
        if (document.getElementById("playmode").value == 'regular-play') {
          //alert("player dead");
          //player.dead = true;
          die("You died from running out of supplies!");
        }
      }
    }
    // Update Supply label
    var supplyLbl = document.getElementById("energy-text");
    if(supplyLbl != null){
      document.getElementById("energy-text").value = player.energy;
    }
  }
  