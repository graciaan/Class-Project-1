//GLOBAL VARIABLES
var quoteEl = document.createElement('p');
var authorEl = document.createElement('p');
var displayTitle = document.getElementById('nameOf');
var likedMovies = localStorage.getItem('viewedMovies');
likedMovies = JSON.parse(likedMovies);
var clearBttn = document.getElementById('clearBttn');

//IF STATEMENT WITH FOR LOOP THAT DISPLAYS CONTENT FROM LOCAL STORAGE
if (likedMovies !== null) {
  for (var i=0; i<likedMovies.length; i++){
    var list = document.createElement('li');
    list.innerText = likedMovies[i]
    displayTitle.append(list)
  }
}

//FUNCTION THAT CLEARS LOCALSTORAGE DATA
clearBttn.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
})

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