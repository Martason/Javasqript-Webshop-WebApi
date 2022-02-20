import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1; //TODOCommer behöva nån localstorage här kanske om man inte alltid vill att de ska börja på 1 ved refresh?

document
  .querySelectorAll(".read-more")
  .forEach((btn) => btn.addEventListener("click", readMore)); // TODO detta funkar inte. förmodligen för att readmore knappe inte finns innan listener skapas? Skriva bootstrap och modal när an genererar rutan istället?
//TODO använda pagnation frå bootstrap istället för detta?
document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);

function prevPage() {
  if (currentPage == 1) return;

  currentPage -= 1;
  updatePage(currentPage);
}

function nextPage() {
  if (currentPage == 130) return; //hur många sidor ska vi ha?

  currentPage += 1;
  updatePage(currentPage);
}
/**
 *
 * @description emptys all product-container divs
 */
function emptyShop() {
  document.getElementById("pokemonShop").innerHTML = "";
}

function updatePage(pageNr) {
  let pokemonDiv = "";

  shop.getPokemons(pageNr).then(function (pokemons) {
    emptyShop();
    for (let pokemon of pokemons) {
      let price = pokemon.height * pokemon.weight;
      pokemonDiv = `      
            <div class="product-container">
            <h3 class="name">${pokemon.name}</h3>
            <img class="sprite" src="${pokemon.sprites.front_default}">
            <div class="type">Type: ${pokemon.types[0].type.name}</div>
            <div class="measurement">
            <div class="weight">Weight: ${pokemon.weight} -</div>
            <div class="height">Height: ${pokemon.height}</div>
            </div>
            <div class="price">${price} SEK</div>
            <button id="${pokemon.id}" class="button read-more">Readmore</button>
            <button class="button add-to-shart">Add To Cart</button> 
            `;

      document
        .getElementById("pokemonShop")
        .insertAdjacentHTML("beforeend", pokemonDiv);
    }
  });
}

updatePage(currentPage);

/* let tenPokemons;
let firstPokemon = 1;
let lastPokemon = firstPokemon + 10;
let pokeID = [];

morePokemon();

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

prevBtn.onclick = function () {
  if (currentPokemonId > 1) {
    currentPokemonId -= 1;
  }
  fetchPokemon(currentPokemonId);
};
nextBtn.onclick = function () {
  morePokemon();
  currentPokemonId += 1;
  fetchPokemon(currentPokemonId);
};

function morePokemon() {
  for (let i = firstPokemon; i < lastPokemon; i++) {
    if (i == 1);
    tenPokemons = i;
    pokeID.push(i);
    console.log(typeof tenPokemons);
  }
  console.log(pokeID);
  console.log(typeof pokeID);
  firstPokemon = lastPokemon;
  lastPokemon = firstPokemon + 10;
  pokeID = [];
}

{
  let currentPokemonId = 1;
  fetchPokemon(currentPokemonId);

  const spriteImg = document.getElementById("pokeImg");
  const nameP = document.getElementById("pokeName");
  const flavortextP = document.getElementById("pokeInfo");

  function fetchPokemon(id) {
    const pokemonUrl = new URL("https://pokeapi.co");
    pokemonUrl.pathname = `/api/v2/pokemon/${id}`;

    fetch(pokemonUrl)
      .then((response) => {
        if (!response.ok) throw `${response.status} ${response.statusText}`;
        return response.json();
      })
      .then((pokemon) => {
        spriteImg.src = pokemon.sprites.front_default;
        nameP.textContent = pokemon.name;

        // Här fortsätter jag fetch kedjan genom att returnera en ny fetch
        return fetch(pokemon.species.url);
      })
      .then((response) => {
        if (!response.ok) throw `${response.status} ${response.statusText}`;
        return response.json();
      })
      .then((species) => {
        flavortextP.textContent = species.flavor_text_entries[0].flavor_text;
      })
      // om något går fel i något av de fetch vi gör så kommer felet att samlas här
      .catch((error) => console.log(error));
  }
} */

/* let pokeID = "1";
let pID = pokeID;
const pokeURL = "https://pokeapi.co/api/v2/";
const pokeType = "pokemon"; */

// 1118 olika pokemons
/* for (let i = 0; i < 1119; i++) {
  if (i == 1);
  pokeID = i++;
} */

/* const apiData = {
  url: pokeURL,
  type: pokeType,
  id: pID,
};
console.log(apiData); */

/* const apiData = {
  url: "https://pokeapi.co/api/v2/",
  type: "pokemon",
  id: "1",
}; */
