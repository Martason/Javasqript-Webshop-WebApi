import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1; //TODO localstorage här kanske om man inte alltid vill att de ska börja på 1 ved refresh?

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

function HandleReadMoreClick(e) {
  const clickedPokemonID = e.target.id;
  console.log(clickedPokemonID);
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

   shop.getPokemons(pageNr).then(pokemons => { 
    emptyShop();
    for (let pokemon of pokemons) {

      let name = pokemon.name;
      let price = pokemon.height * pokemon.weight;
      let image = pokemon.sprites;
      let type = pokemon.type;
      let weight = pokemon.weight;
      let height = pokemon.height;
      let base_experience = pokemon.base_experience;
      let id = pokemon.id;
      let abilities = pokemon.abilities;
      let flavorText = pokemon.flavorText;
  
      pokemonDiv =  `
         
            <div class="product-container">
            <h3 class="name">${name}</h3>
            <img class="sprite" src="${image}">
            <div class="type">Type: ${type}</div>            
            <div class="price">Price: ${price} :-</div>
            <button class="button add-to-shart">Buy</button>
            
            
            <!-- Button trigger modal -->
            <button
              type="button"
              class="button read-more"
              id ="${id}"
              data-bs-toggle="modal"
              data-bs-target="#readMoreModal${id}"
            >
              Read more
            </button>

            <!-- Modal -->
              <div
                class="modal fade"
                id="readMoreModal${id}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3 class="modal-title name" id="exampleModalLabel">${name}</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <img class="sprite" src="${image}">                    
                      <div>Type: ${type}</div>                    
                      <div>Start XP: ${base_experience}</div>
                      <div class="measurement">
                        <div class="weight">Weight: ${weight} g</div>
                        <div class="height">Height: ${height} cm</div>
                      </div>
                      <div class="type">Abilities: ${abilities}</div>
                      <br>
                      <p class="type">Info: ${flavorText}</p>
                    </div>
                    <div class="modal-footer">
                    </button>
                      <button type="button" class="button" id="buyButton">Buy</button>
                      <button
                        type="button"
                        class="button" id="closeBtn"
                        data-bs-dismiss="modal"
                      >
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
    document
      .querySelectorAll(".read-more")
      .forEach((btn) => btn.addEventListener("click", HandleReadMoreClick));
  });
}

updatePage(currentPage);

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
