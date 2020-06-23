// wait for document load
// on load make get request for all Pokemon
// https://pokeapi.co/api/v2/pokemon?limit=807
// make a reuqest for all pokemon

console.log("connected to JavaScript");
document.addEventListener("DOMContentLoaded", function () {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=807/";
  const pokemonList = document.querySelectorAll(".pokedex-list")[0]; //querySelectorAll always returns an array
  const parser = new DOMParser(); // DOMParser is a built in JS functionality. //keyword new creates a new object!
  fetch(`${apiURL}`) //fetch means "GET" in javaScript aka tells the browser to make a get request. fetch returns a promise
    .then((response) => {
      // in JS means THEN do this. ONLY USE IT TO EXTEND PROMISES
      return response.json();
    })
    .then((responseJSON) => {
      const pokemon = [...responseJSON.results]; // create an array of all  807 pokemon //... is a spread operator, it spreads open the array
      return pokemon;
    })
    .then((pokemon) => {
      const pokemonImages = [];
      pokemon.forEach(function (currentPokemon) {
        // use iterator method to go through the array
        const pokemonLi = parser.parseFromString(
          //. dot notation is happeningggg. parseFromString turns text into HTML
          `<li id=${currentPokemon.name}></li>`,
          "text/html"
        );
        pokemonList.appendChild(pokemonLi.body.firstChild); // append child?

        fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`) // make a request for each pokemon
          .then((pokemonResponse) => {
            return pokemonResponse.json();
          })
          .then((pokemonResponseJSON) => {
            currentPokemon.images = { ...pokemonResponseJSON.sprites }; // add sprite for each pokemon to existing array - " currentPokemon.image = response.sprite" lines 26-28.
            currentPokemon.types = [...pokemonResponseJSON.types]; // add pokemon type for each pokemon to the array we already have
            currentPokemon.id = pokemonResponseJSON.id; // add pokemon ID number
            const typeHTML = currentPokemon.types[1]
              ? `<p class=${currentPokemon.types[0].type.name}>${currentPokemon.types[0].type.name}</p><p class=${currentPokemon.types[1].type.name}>${currentPokemon.types[1].type.name}</p>`
              : `<p class=${currentPokemon.types[0].type.name}>${currentPokemon.types[0].type.name}</p>`;
            const pokemonA = parser.parseFromString(
              //parse from string?
              `<a href="./pokemon.html#${currentPokemon.id}"><div><p><span>ID: ${currentPokemon.id}</span></p><p class="pokemon-name">${currentPokemon.name}</p>${typeHTML}</div>
              <img class="lazy" src="https://cdn.glitch.com/3a5b333c-942b-4088-9930-e7ea1e516118%2Fplaceholder.png?v=1560442648212" datasrc=${currentPokemon.images.front_default} /></a>`,
              "text/html"
            );
            document
              .getElementById(`${currentPokemon.name}`)
              .appendChild(pokemonA.body.firstChild);
            // console.log(document.getElementById(`${currentPokemon.name}`).querySelector("img"));
            pokemonImages.push(
              document
                .getElementById(`${currentPokemon.name}`)
                .querySelector("img")
            );
          });
      });
      console.log(pokemonImages);
      return pokemonImages;
    })
    .then((pokemonImages) => {
      console.log("after.then", pokemonImages);
      const lazyLoader = mustysLazyLoad({
        images: pokemonImages,
      });
      console.log("lazy loader", lazyLoader);
    });
});
