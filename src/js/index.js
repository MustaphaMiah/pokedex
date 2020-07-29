console.log("connected to JavaScript");
document.addEventListener("DOMContentLoaded", function() {
    const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=807/";
    const pokemonList = document.querySelectorAll(".pokedex-list")[0]; //querySelectorAll always returns an array - manipulating the dom
    const parser = new DOMParser(); // DOMParser is a built in JS functionality. //keyword "new" creates a new object!
    fetch(`${apiURL}`) //fetch means "GET" in javaScript aka tells the browser to make a get request. fetch returns a promise
        .then((response) => {
            // in JS means THEN do this. ONLY USE IT TO EXTEND PROMISES
            return response.json(); // use a built in JS function to return our response as a JSON.
        })
        .then((responseJSON) => {
            const pokemon = [...responseJSON.results]; // create an array of all  807 pokemon //... is a spread operator, it spreads open the array
            return pokemon;
        })
        .then((pokemon) => {
            pokemon.forEach(function(currentPokemon) {
                // use iterator method to go through the array
                const pokemonLi = parser.parseFromString(
                    //. dot notation is happeningggg. parseFromString turns text into HTML
                    `<li id=${currentPokemon.name}></li>`,
                    "text/html"
                );
                pokemonList.appendChild(pokemonLi.body.firstChild); // append child

                fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`) // make a request for each pokemon
                    .then((pokemonResponse) => {
                        console.log("This is my pokemon response", pokemonResponse);
                        return pokemonResponse.json();
                    })
                    .then((pokemonResponseJSON) => {
                        currentPokemon.images = {...pokemonResponseJSON.sprites }; // add sprite for each pokemon to existing array - " currentPokemon.image = response.sprite" lines 26-28.
                        currentPokemon.types = [...pokemonResponseJSON.types]; // add pokemon type for each pokemon to the array we already have
                        currentPokemon.id = pokemonResponseJSON.id; // add pokemon ID number
                        const typeHTML = currentPokemon.types[1] ?
                            `<p class=${currentPokemon.types[0].type.name}>${currentPokemon.types[0].type.name}</p><p class=${currentPokemon.types[1].type.name}>${currentPokemon.types[1].type.name}</p>` :
                            `<p class=${currentPokemon.types[0].type.name}>${currentPokemon.types[0].type.name}</p>`;
                        const pokemonA = parser.parseFromString(
                            //parse from string?
                            `<a href="./pokemon.html#${currentPokemon.id}"><div><p><span>ID: ${currentPokemon.id}</span></p><p class="pokemon-name">${currentPokemon.name}</p>${typeHTML}</div>
              <img class="lazy" src="${currentPokemon.images.front_default}" /><p class="view"> View More <p></a>`,
                            "text/html"
                        );
                        document
                            .getElementById(`${currentPokemon.name}`)
                            .appendChild(pokemonA.body.firstChild);
                    });
            });
        });
});