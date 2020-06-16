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
      const pokemonImages = { ...pokemonImagesJson.sprites };
      const allPokemonImages = Object.entries(pokemonImages); //TURNED IN TO AN ARRAY!!
      let revisedImages = [];
      const validImages = allPokemonImages.filter(function (x) {
        return x[1] !== null;
      });
      if (validImages.length > 2 && validImages.length / 2) {
        const firstHalf = validImages.slice(0, validImages.length / 2);
        const secondHalf = validImages.slice(validImages.length / 2);
        revisedImages = [...secondHalf, ...firstHalf];
      } else {
        revisedImages = [...validImages];
      }
      // Create a new image html node and append to HTML for each image that exist inside the object
      revisedImages.forEach(function (currentValue) {
        const container = document.createElement("div");
        const img = document.createElement("img");
        img.src = currentValue[1];
        const string = currentValue[0].replace(/_/g, " "); //using regex to remove underscore and create space in the name
        const label = document.createElement("p");
        label.innerHTML = string;
        container.appendChild(img);
        container.appendChild(label);
        const src = document.getElementById("pokemon-image");
        src.appendChild(container);
      });
    })
    .catch((error) => console.log(error));
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

// sort out images in SCSS e.g #701 howlucha 
// create next pokemon button (a tag)
// create previous pokemon button (a tag too)
// back to pokdex button (a tag)