//Link HTML and CSS
//Import jQuery
//Read API documentation (1)
//Get API Endpoint URL for both API's
//Basic site setup
//Start with empty object to contain scripts
//Ajax Calls

//User clicks on a button
//Get data - diff recipes for diff button clicked (2)
//Get data - diff movie genre for diff category clicked (2)
//Store that data
//Display corresponding data on the page (3)


//Empty object
var app = {};

//Store API key for Yummly
app.myKey = '2f95e94af1d965c82d87b5a4a0779706';

//Run function once document is ready- call event function
app.init = function(){
	//Start event listener
	app.event();
};

//ON CLICKING IMG/TEXT, store the value for recipe - then display results
//ON CLICKING IMG/TEXT make call to specific movie genre
app.event = function(){
	$('.selection1').on('click', function(){
		app.query = $(this).find('p').data('value'); 
		app.getRecipes();
		$('section.results').addClass('show');
		app.popularMoviesByDrama();
	});

	$('.selection2').on('click', function(){
		app.query = $(this).find('p').data('value'); 
		app.getRecipes();
		$('section.results').addClass('show');
		app.popularMoviesByRomance();
	});

	$('.selection3').on('click', function(){
		app.query = $(this).find('p').data('value'); 
		app.getRecipes();
		$('section.results').addClass('show');
		app.popularMoviesByMusic();
	});

	$('.selection4').on('click', function(){
		app.query = $(this).find('p').data('value'); 
		app.getRecipes();
		$('section.results').addClass('show');
		app.popularMoviesByFamily();
	});

	$('.selection5').on('click', function(){
		app.query = $(this).find('p').data('value'); 
		app.getRecipes();
		$('section.results').addClass('show');
		app.popularMoviesByComedy();
	});

	$('.selection6').on('click', function(){
		app.query = $(this).find('p').data('value'); 
		app.getRecipes();
		$('section.results').addClass('show');
		app.popularMoviesByDocumentary();
	});
};

//GET request to Yummly API for recipes
app.getRecipes = function(){

	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			_app_id: 'fedcee7b',
			_app_key: app.myKey,
			q: app.query,
			requirePictures: true,
			maxResult: 3 ,
		},
		success: function(result){
			app.results = result.matches;
			console.log(app.results);
			app.sortRecipes();
		}
	});
};

//Display image, title, ingredients 
app.sortRecipes = function(){
    $('.container2').empty();
    $.each(app.results, function(item, content){
        var $title = $('<h3>').text(content.recipeName);
        var $secondTitle = $('<h4>').text('Ingredients:');
        var space = ("" + content.ingredients).replace(/,/g, ', ');
        var $ingredients = $('<p>').addClass('ingredients').text(space);
        var imagePattern = /=s90/;
        var $image = $('<img>').attr('src', content.smallImageUrls[0].replace(imagePattern, '=s250'));
        var $recipeId = $('<a>').attr('href', 'http://www.yummly.com/recipe/' + content.id);
        var $recipeLink = $recipeId.append($image, $title, $secondTitle, $ingredients);
        var $fullRecipe = $('<div>').addClass('together').append($recipeLink);
        $('.container2').append($fullRecipe);
    })
};

// sorts romance movies
app.popularMoviesByRomance = function (query){
    $.ajax({
        url: "https://api.themoviedb.org/3/genre/10749/movies",
        type: "GET",
        dataType: "jsonp",
        data: {
            api_key: "3c9a01ae287e63be5b9af537e6b1b3e3",
            format: "jsonp",
            certification: query
        },
        success: function(data){
            app.displayMovies(data);
        }
    });    
};

// sorts music movies
app.popularMoviesByMusic = function (query){
    $.ajax({
        url: "https://api.themoviedb.org/3/genre/10402/movies",
        type: "GET",
        dataType: "jsonp",
        data: {
            api_key: "3c9a01ae287e63be5b9af537e6b1b3e3",
            format: "jsonp",
            certification: query
        },
        success: function(data){
            app.displayMovies(data);
        }
    });    
};

// sorts drama movies
app.popularMoviesByDrama = function (query){
    $.ajax({
        url: "https://api.themoviedb.org/3/genre/18/movies",
        type: "GET",
        dataType: "jsonp",
        data: {
            api_key: "3c9a01ae287e63be5b9af537e6b1b3e3",
            format: "jsonp",
            certification: query
        },
        success: function(data){
            app.displayMovies(data);
        }
    });    
};

// sorts comedy movies
app.popularMoviesByComedy = function (query){
    $.ajax({
        url: "https://api.themoviedb.org/3/genre/35/movies",
        type: "GET",
        dataType: "jsonp",
        data: {
            api_key: "3c9a01ae287e63be5b9af537e6b1b3e3",
            format: "jsonp",
            certification: query
        },
        success: function(data){
            app.displayMovies(data);
        }
    });    
};

// sorts family movies
app.popularMoviesByFamily = function (query){
    $.ajax({
        url: "https://api.themoviedb.org/3/genre/10751/movies",
        type: "GET",
        dataType: "jsonp",
        data: {
            api_key: "3c9a01ae287e63be5b9af537e6b1b3e3",
            format: "jsonp",
            certification: query
        },
        success: function(data){
            app.displayMovies(data);
        }
    });    
};

// sorts documentary movies
app.popularMoviesByDocumentary = function (query){
    $.ajax({
        url: "https://api.themoviedb.org/3/genre/99/movies",
        type: "GET",
        dataType: "jsonp",
        data: {
            api_key: "3c9a01ae287e63be5b9af537e6b1b3e3",
            format: "jsonp",
            certification: query
        },
        success: function(data){
            app.displayMovies(data);
        }
    });    
};


//Empties .movieContainer
//Append results to .container1
app.displayMovies = function(movieData){
    $(".container1").empty();
    $('.movieTitle').append("<h2>Which Movie to Watch!</h2>");
    $('.recipeTitle').append("<h2>What to Eat!</h2>");

    for(var i = 0; i < 3; i++){
        var $title = $("<h3>").text(movieData.results[i].title);
        var $image = $("<img>").attr("src", "https://image.tmdb.org/t/p/w396" + movieData.results[i].poster_path);
        var $movieDiv = $('<div>').addClass('movieWrap').append($title, $image);
         
         
        $('.container1').append($movieDiv);
        // $(".container1").append($title, $image);
    }

};


//DOCUMENT READY - CALL INIT FUNCTION
$(function (){
	app.init();
	$('a').smoothScroll();
});



