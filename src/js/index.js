// wait for document load
// on load make get request for all Pokemon
// https://pokeapi.co/api/v2/pokemon?limit=807
// make a reuqest for all pokemon

console.log("connected to JavaScript");
document.addEventListener("DOMContentLoaded", function () {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=807/";
  //   const pokemon = [];
  //   const response = await fetch(apiURL);
  //   const json = await response.json();

  fetch(`${apiURL}`)
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      console.log(responseJSON);
      const pokemon = [...responseJSON.results];
      console.log(pokemon);
    });
    
});

// create an array of all  807 pokemon
// make a request for each pokemon
// add an image and pokemon type for each pokemon to array
// use an iterator method to loop over array and create a html node with image and pokemon id number
