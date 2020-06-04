// wait for document load
// on load make get request for all Pokemon
// https://pokeapi.co/api/v2/pokemon?limit=807
// make a reuqest for all pokemon

console.log("connected to JavaScript");
document.addEventListener("DOMContentLoaded", function () {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=807/";
  const pokemonList = document.querySelectorAll(".pokedex-list")[0]; //querySelectorAll always returns an array
  const parser = new DOMParser(); // DOMParser is a built in JS functionality.
  //   console.log("musty99", pokemonList);
  fetch(`${apiURL}`) //fetch means "GET" in javaScript aka tells the browser to make a get request. fetch returns a promise
    .then((response) => {
      // in JS means THEN do this. ONLY USE IT TO EXTEND PROMISES
      return response.json();
    })
    .then((responseJSON) => {
      //   console.log(responseJSON);
      const pokemon = [...responseJSON.results]; // create an array of all  807 pokemon //... is a spread operator, it spreads open the array
      return pokemon;
    })
    .then((pokemon) => {
      console.log(pokemon);
      pokemon.forEach(function (currentPokemon, i) {
        // use iterator method to go through the array
        const pokemonLi = parser.parseFromString(
          `<li id=${currentPokemon.name}></li>`,
          "text/html"
        );
        pokemonList.appendChild(pokemonLi.body.firstChild);
        fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`) // make a request for each pokemon
          .then((pokemonResponse) => {
            return pokemonResponse.json();
          })
          .then((pokemonResponseJSON) => {
            currentPokemon.images = { ...pokemonResponseJSON.sprites }; // add sprite for each pokemon to existing array - " currentPokemon.image = response.sprite" lines 26-28.
            currentPokemon.types = [...pokemonResponseJSON.types]; // add pokemon type for each pokemon to the array we already have
            currentPokemon.id = pokemonResponseJSON.id; // add pokemon ID number
            const pokemonA = parser.parseFromString(
              `<a href="#"><p>${currentPokemon.name}</p><p>ID: ${currentPokemon.id}</p><img src=${currentPokemon.images.front_default} /></a>`,
              "text/html"
            );
            document
              .getElementById(`${currentPokemon.name}`)
              .appendChild(pokemonA.body.firstChild);
          });
      });
    });
  // use an iterator method to loop over array and create a html node with image and pokemon id number
  // append HTML nodes to pokemon list - HTML node: is a html element.
});
