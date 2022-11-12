//GLOBAL VARIABLES
var quoteEl = document.createElement('p');
var authorEl = document.createElement('p');
var displayMovie = document.getElementById("movpag");
var movieName = document.createElement('p');
var directorName = document.createElement('p');
var rating = document.createElement('p');
var releaseYear = document.createElement('p');
var actors = document.createElement('ul');
var genre = document.createElement('p');
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


//RANDOM MOVIE GENERATOR
function pad(number, length) {
  var str = '' + number;
  while(str.length < length) {
    str = '0' + str;
  }
  return str;
}
let movieGen = function() {
  var movie = pad(Math.floor((Math.random() * 2155529) + 1), 7)
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
    }
  })
  .then(function (data) {
    console.log(data)
      movieName.innerText = data.title;
      directorName.innerText = "Directed by: "+data.director_names;
      rating.innerText = "IMDB Rating: "+data.rating;
      genre.innerText = "Genre: "+data.genres;
      releaseYear.innerText = "Released in: "+data.release_year;
      movieImage.src = data.image || "./assets/images/imageplaceholder.png" //CHOOSES BETWEEN IMAGE IN API OR PLACEHOLDER IMAGE
      seenButton.innerText = "Already Seen"
      displayMovie.append(movieName, directorName, releaseYear, rating, genre, movieImage, seenButton)
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







