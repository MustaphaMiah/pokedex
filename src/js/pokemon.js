console.log("pokemon page connected", window.location.href);
document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  const hashPoint = url.indexOf("#");
  const pokemonId = url.substring(hashPoint + 1);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((pokemonIdResponse) => {
      //.then lets you control the flow of your JS
      return pokemonIdResponse.json();
    })
    .then((pokemonIdResponseJson) => {
      const pokemonName = pokemonIdResponseJson.name;
      document.getElementsByClassName(
        "pokemon-name"
      )[0].innerHTML = pokemonName;
    });

  fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}/`)
    .then(handleErrors)
    .then((pokemonCJson) => {
      console.log("danesh is a p", pokemonCJson);
      const pokemonD = pokemonCJson.descriptions[1].description;
      document.getElementsByClassName("description")[0].innerHTML = pokemonD;
    })
    .catch((error) => console.log(error));

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    .then((pokemonS) => {
      return pokemonS.json();
    })
    .then((pokemonSJson) => {
      function findEnglish(x) {
        if (pokemonSJson.flavor_text_entries[x].language.name !== "en") {
          x++;
          return findEnglish(x);
        }
        return x;
      }
      const i = findEnglish(0);
      const pokemonA = pokemonSJson.flavor_text_entries[i].flavor_text;
      document.getElementsByClassName("abilities")[0].innerHTML = pokemonA;
    });

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    .then(handleErrors)
    .then((pokemonImagesJson) => {
      pokemonImages = pokemonImagesJson.sprites.front_default;
      console.log(pokemonImages);
      const img = document.createElement("img");
      img.src = pokemonImages;
      const src = document.getElementById("pokemon-image");
      src.appendChild(img);

      // Iterate over each value inside the object
      // Create a new image html node and append to HTML for each image that exist inside the object
    })
    .catch((error) => console.log(error));
});
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

// capitalise title DONEEEE
// get image rendered on screen
// get description rendered on screen - i am so gasseddddd, not all pokemons have descriptions
// get abilities on screen
// minimal styling / positioning
// create a next pokemon button on single page (create an a-tag using JS)
// create a previous pokemon button
// iterate through images and display all available images on screen - mvp +
