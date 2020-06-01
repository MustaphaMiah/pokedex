// wait for document load
// on load make get request for all Pokemon
// https://pokeapi.co/api/v2/pokemon?limit=807
// make a reuqest for all pokemon

console.log("connected to JavaScript");
document.addEventListener("DOMContentLoaded", function () {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=807/";
  fetch(`${apiURL}`) //fetch means get in javaScript aka tells the browser to make a get request. fetch returns a promise which is defined as .then in JS
    .then((response) => {
      // in JS means THEN do this.
      return response.json();
    })
    .then((responseJSON) => {
      //   console.log(responseJSON);
      const pokemon = [...responseJSON.results]; // create an array of all  807 pokemon //... is a spread operator, it spreads open the array
      return pokemon;
    })
    .then((pokemon) => {
      pokemon.forEach(function (currentPokemon, i) {
        // use iterator method to go through the array
        fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`) // make a request for each pokemon
          .then((pokemonResponse) => {
            return pokemonResponse.json();
          })
          .then((pokemonResponseJSON) => {
            console.log(pokemonResponseJSON);
            currentPokemon.image = pokemonResponseJSON.sprites.front_default;
            console.log(currentPokemon.image);
            currentPokemon.type = pokemonResponseJSON.types[0].type.name;
            console.log(currentPokemon.type);

            if (pokemonResponseJSON.types.length > 1) {
              currentPokemon.secondType =
                pokemonResponseJSON.types[1].type.name;
              console.log(currentPokemon.secondType);
            }
          });
      });
    });
});

// add sprite for each pokemon to existing array - " currentPokemon.image = response.sprite" lines 26-28.
// add an image and pokemon type for each pokemon to the array we already have
// use an iterator method to loop over array and create a html node with image and pokemon id number
