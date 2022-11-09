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
}

window.onload = getAPI;

