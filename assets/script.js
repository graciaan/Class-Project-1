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
      var quoteEl = document.createElement('p')
      var authorEl = document.createElement('p')
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
function randomMovieTest() {
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
      randomMovieTest()
    }
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(err => console.error(err));
}
console.log(randomMovieTest())



