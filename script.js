import { logic, logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

//pagination -

let currentPage = shop.loadPageNr();

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);

function prevPage() {
  if (currentPage <= 1) {
    currentPage = 74;
    updatePage(currentPage);
    uppdatePageNummer();
  } else {
    currentPage--;
    updatePage(currentPage);
    uppdatePageNummer();
  }
}

function nextPage() {
  if (currentPage >= 74) {
    currentPage = 1;
    updatePage(currentPage);
    uppdatePageNummer();
  } else {
    currentPage++;
    updatePage(currentPage);
    uppdatePageNummer();
  }
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let pageNr = document.getElementById("numberSearch").value;
    updatePage(pageNr);
    currentPage = pageNr;
    uppdatePageNummer();
    document.getElementById("numberSearch").value = "";
  }
});

uppdatePageNummer();

function uppdatePageNummer() {
  document.getElementById("currentPage").innerHTML = "Page: " + currentPage;
  shop.currentPage = currentPage;
  shop.savePageNr();
  console.log(currentPage);
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

  shop.getPokemons(pageNr).then((pokemons) => {
    emptyShop();
    for (let pokemon of pokemons) {
      let name = pokemon.name;
      let price = pokemon.height * pokemon.weight;
      let image = pokemon.sprites;
      let type = pokemon.type;
      let weight = pokemon.weight / 10;
      let height = pokemon.height * 10;
      let base_experience = pokemon.base_experience;
      let id = pokemon.id;
      let abilities = pokemon.abilities;
      let flavorText = pokemon.flavorText;

      pokemonDiv = `
         
      <div class="product-container">
      <h3 class="name">${name}</h3>
      <img class="sprite" src="${image}">
      <div class="type">Type: ${type}</div>
      <div class="price">Price: ${price} :-</div>
      <button class="button add-to-shart">Buy</button>
    
    
      <!-- Button trigger modal -->
      <button type="button" class="button read-more" id="${id}" data-bs-toggle="modal" data-bs-target="#readMoreModal${id}">
        Read more
      </button>
    
      <!-- Modal -->
      <div class="modal fade" id="readMoreModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title name" id="exampleModalLabel">${name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img class="spriteModal" src="${image}">
              <div>Type: ${type}</div>
              <div>Start XP: ${base_experience}</div>
              <div class="measurement">
                <div class="weight">Weight: ${weight} kg</div>
                <div class="height">Height: ${height} cm</div>
              </div>
              <div class="type">Abilities: ${abilities}</div>
              <br>
              <p class="type">Info: ${flavorText}</p>
              <div class="modalPagination">
                <button class="modalPrevtBtn" onclick="prevPage()">Prev</button>
                <button>ID: ${id}</button>
                <button class="modalNextBtn" onclick="nextPage()">Next</button>
              </div>
            </div>
            <div class="modal-footer">
              </button>
              <button type="button" class="button" id="buyButton">Buy</button>
              <button type="button" class="button" id="closeBtn" data-bs-dismiss="modal">
                Close
            </div>
          </div>
        </div>
      </div>
            `;

      document
        .getElementById("pokemonShop")
        .insertAdjacentHTML("beforeend", pokemonDiv);
    }
  });
}

updatePage(currentPage);
