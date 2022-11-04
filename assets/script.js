// function triggered by quoteBtn to get new quote
function getQuote(event){
    event.preventDefault()
    console.log("getting my quote")
    // need to connect to API in this function
    //fetch(some url).then(response =>{
    //     check if !Response.ok {
    //         console.log("response error")
    //         return
    //     }
    //     return Response.json()
    // }).then(data =>{
    //     ver que hacemos con el data
    // })
    //pass data that is received
}
// target quote button and add event listener
var quoteBtn = document.getElementById('quote-btn')
console.log(quoteBtn)
quoteBtn.addEventListener('click', getQuote)
