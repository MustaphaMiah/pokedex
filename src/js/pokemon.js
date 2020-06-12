console.log("pokemon page connected", window.location.href);

//  cut the number off at the end of the URL or get the number from the URL (slice?)
// slice off the end of the string, after the hashtag - find hash in string
// should be a number
// then cut off from that url, which will give us the pokemon's ID
// make request using fetch, with the single pokemon's ID. use $string interpolation
// type out line 30 with id instead of name.
// no need for a for each loop.
// then the page should render out the name in the h1 tag.
// do not try short cut this, write line by line, look at the instructions, slow it down,
// only use fetch from index.js nothing else, use baby steps.

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
      console.log(pokemonIdResponseJson);
      const pokemonName = pokemonIdResponseJson.name;
      console.log(pokemonName);
      console.log(document.getElementsByClassName("pokemon-name")[0]);
      document.getElementsByClassName(
        "pokemon-name"
      )[0].innerHTML = pokemonName;
    });

  fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonId}/`)
    .then((pokemonC) => {
      return pokemonC.json();
    })
    .then((pokemonCJson) => {
      const pokemonD = pokemonCJson.descriptions[1];
      console.log(pokemonD);
    });
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    .then((pokemonS) => {
      return pokemonS.json();
    })
    .then((pokemonSJson) => {
      console.log(pokemonSJson);
    });
});
