console.log("pokemon page connected", window.location.href);
document.addEventListener("DOMContentLoaded", function() {
    const url = window.location.href;
    const hashPoint = url.indexOf("#");
    const pokemonId = url.substring(hashPoint + 1);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((pokemonIdResponse) => {
            //.then lets you control the flow of your JS
            // console.log(pokemonIdResponse);
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
            const pokemonDescriptions = pokemonCJson.descriptions;
            const lastDescription = pokemonDescriptions[pokemonDescriptions.length - 1].description;
            document.getElementsByClassName("description")[0].innerHTML = lastDescription;
        })
        .catch((error) => console.log(error));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
        .then((pokemonS) => {
            return pokemonS.json();
        })
        .then((pokemonSJson) => {
            const i = findEnglish(0, pokemonSJson);
            const pokemonA = pokemonSJson.flavor_text_entries[i].flavor_text;
            document.getElementsByClassName("abilities")[0].innerHTML = pokemonA;
        });

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(handleErrors)
        .then((pokemonImagesJson) => {
            // console.log("pokemon images", pokemonImagesJson);
            let pokemonImages = {...pokemonImagesJson.sprites };
            delete pokemonImages.other && delete pokemonImages.versions;
            const allPokemonImages = Object.entries(pokemonImages); //TURNED IN TO AN ARRAY!!
            // console.log("all Pokemon Images", allPokemonImages);
            let revisedImages = [];
            const validImages = allPokemonImages.filter(function(x) {
                // to get all images that are NOT null because the response was also giving us images with a value of null.
                return x[1] !== null;
            });
            if (validImages.length > 2 && validImages.length / 2) {
                // using if statement for re ordering images. when using. reverse it was giving me the shiny image first. also the condition in the brackets is only for pokemon with more than 2 images, pokemon with 2 images or less were already displayed in the right order.
                const firstHalf = validImages.slice(0, validImages.length / 2);
                const secondHalf = validImages.slice(validImages.length / 2);
                revisedImages = [...secondHalf, ...firstHalf];
            } else {
                revisedImages = [...validImages];
            }
            // Create a new image html node and append to HTML for each image that exist inside the object
            revisedImages.forEach(function(currentValue) {
                const container = document.createElement("div");
                const img = document.createElement("img");
                img.src = currentValue[1];
                let string = currentValue[0].replace(/_/g, " "); //using regex to remove underscore and create space in the name
                string = string.replace(/female/g, "&#9792;");
                const label = document.createElement("p");
                label.innerHTML = string;
                container.appendChild(img);
                container.appendChild(label);
                const src = document.getElementById("pokemon-image");
                src.appendChild(container);
            });
        })
        .catch((error) => console.log(error));

    const pokemonIdNumber = parseInt(pokemonId);
    const next = document.createElement("button");
    const prev = document.createElement("button");
    const firstHalfHref = window.location.href.slice(0, hashPoint + 1);
    const nextPokemonId = pokemonIdNumber === 807 ? 1 : pokemonIdNumber + 1;
    const prevPokemonId = pokemonIdNumber === 1 ? 807 : pokemonIdNumber - 1;
    prev.addEventListener("click", function() {
        window.location.href = `${firstHalfHref}${prevPokemonId}`;
        location.reload();
    });
    next.addEventListener("click", function() {
        window.location.href = `${firstHalfHref}${nextPokemonId}`;
        location.reload();
    });
    prev.innerHTML = "prev";
    next.innerHTML = "next";
    document.getElementsByClassName("prev-button")[0].appendChild(prev);
    document.getElementsByClassName("next-button")[0].appendChild(next);
});

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

function findEnglish(x, pokemonSJson) {
    if (pokemonSJson.flavor_text_entries[x].language.name !== "en") {
        x++;
        return findEnglish(x, pokemonSJson); //recursive function
    }
    return x;
}