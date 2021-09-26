//alert("script linked");


// fill main view with 9 rows of 70x70 pixel tiles
function fill70()
{
	//alert("fill70() called");
	view = document.getElementById("main-view");

	// add 81 tiles
	for(var i = 0; (i < 81); i++)
	{
		if(i == 0)
		{
			view.innerHTML ="<div class='tile'></div>";
		}
		else
		{
			view.innerHTML = view.innerHTML + "<div class='tile'></div>";
		}
	
	}
}

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

