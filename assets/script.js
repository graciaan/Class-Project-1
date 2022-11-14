//GLOBAL VARIABLES
var quoteEl = document.createElement('p');
var authorEl = document.createElement('p');
var displayMovie = document.getElementById("nameOf");
var displayDirect = document.getElementById('movDir');
var displayRelease = document.getElementById('movRel');
var displayGenre = document.getElementById('moveGen');
var displayRating = document.getElementById('movRat');
var displayDescription = document.getElementById('movDes');
var displayPoster = document.getElementById('imgPoster');
var movieName = document.createElement('p');
var directorName = document.createElement('p');
var rating = document.createElement('p');
var releaseYear = document.createElement('p');
var actors = document.createElement('ul');
var genre = document.createElement('p');
var movieDescription = document.createElement('p');
const movieImage = new Image(200, 400);
var seenButton = document.createElement('button');
var movieResult = null


//RANDOM QUOTE API
function getAPI() {
  let requestURL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=movies&count=10'
  const options = {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': '96daaa2a72msh6617cdf732329f0p101675jsnf073a3307b06',
      'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
    }
  };
  fetch(requestURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        var movieQuote = document.getElementById("quote");
        quoteEl.innerText = data[i].quote;
        authorEl.innerText = "~ "+data[i].author;
        movieQuote.append(quoteEl, authorEl);
      }
    })
    .catch(err => console.error(err));
}
window.onload = getAPI;
// getAPI()

//RANDOM MOVIE GENERATOR
function pad(number, length) {
  var str = '' + number;
  while(str.length < length) {
    str = '0' + str;
  }
  return str;
}
let movieGen = function(event) {
  if(event){
    event.preventDefault()
  }
  var movie = pad(Math.floor((Math.random() * 2155529) + 1), 7)
  console.log(movie)
  let requestAPITest = 'https://movie-details1.p.rapidapi.com/imdb_api/movie?id=tt'+movie;
  const option = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '96daaa2a72msh6617cdf732329f0p101675jsnf073a3307b06',
    'X-RapidAPI-Host': 'movie-details1.p.rapidapi.com'
  }
  };
  fetch(requestAPITest, option)
  .then(function (responses) {
    if (responses.ok){
      return responses.json();
    }
    else {
      movieGen()
console.log(responses)
}
  })
  .then(function (data) {
    console.log(data)
      movieName.innerText = data.title || "No Title Provided"
      directorName.innerText = data.director_names || "No Director Provided";
      rating.innerText = data.rating || "No Rating Provided";
      genre.innerText = data.genres || "No Genre Provided";
      releaseYear.innerText = data.release_year || "No Release Year Provided";
      movieDescription.innerText = data.description || "No Description Provided";
      movieImage.src = data.image || "./assets/images/imageplaceholder.png" //CHOOSES BETWEEN IMAGE IN API OR PLACEHOLDER IMAGE
      seenButton.innerText = "Already Seen"
      displayMovie.append(movieName);
      displayDirect.append(directorName);
      displayRelease.append(releaseYear);
      displayGenre.append(genre);
      displayRating.append(rating);
      displayDescription.append(movieDescription);
      displayPoster.append(movieImage);
      seenButton.addEventListener("click", saveMovie)
      movieResult = data.title;
      })
    .catch(err => console.error(err));
  }

  function saveMovie(e){
    e.preventDefault()
    console.log("saveMovie")
    var existingViewedMovies = JSON.parse(localStorage.getItem("viewedMovies")) || [];
    existingViewedMovies.push(movieResult)
    localStorage.setItem("viewedMovies", JSON.stringify(existingViewedMovies))
  }
  
//EVENT LISTENER TO RUN MOVIE GENERATOR FUNCTION
var randomButton = document.getElementById("bgen")
randomButton.addEventListener("click", movieGen)