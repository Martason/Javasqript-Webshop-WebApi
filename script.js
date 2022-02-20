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
  if (currentPage == 1) {
    currentPage = 89;
    updatePage(currentPage);
    currentPageNumber();
  } else {
    currentPage -= 1;
    updatePage(currentPage);
    currentPageNumber();
  }
}

function nextPage() {
  if (currentPage == 89) {
    currentPage = 1;
    updatePage(currentPage);
    currentPageNumber();
  } else {
    currentPage += 1;
    updatePage(currentPage);
    currentPageNumber();
  }
}

currentPageNumber();

function currentPageNumber() {
  document.getElementById("currentPage").innerHTML = "Page: " + currentPage;
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
            <button id="${pokemon.id}" class="button read-more">Read More</button>
            <button class="button add-to-shart">Buy</button> 
            `;

      document
        .getElementById("pokemonShop")
        .insertAdjacentHTML("beforeend", pokemonDiv);
    }
  });
}

updatePage(currentPage);

document.querySelectorAll(".read-more").forEach(btn => btn.addEventListener('click', readMore)); // TODO detta funkar inte. förmodligen för att readmore knappe inte finns innan listener skapas? Skriva bootstrap och modal när an genererar rutan istället?  
//TODO använda pagnation frå bootstrap istället för detta?
document.getElementById("prevPage").addEventListener('click', prevPage);
document.getElementById("nextPage").addEventListener('click', nextPage);


