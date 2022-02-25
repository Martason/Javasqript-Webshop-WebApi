import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1;

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("searchButton").addEventListener("click", searchPage);

function prevPage() {
  if (currentPage <= 1) {
    currentPage = 94;
    updatePage(shop.lastpageUrl);
    currentPageNumber();
  } else {
    currentPage--;
    updatePage(shop.previousPageUrl);
    currentPageNumber();
  }
}

function nextPage() {
  if (currentPage == 94) {
    currentPage = 1;
    updatePage(shop.firstPageUrl);
    currentPageNumber();
  } else {
    currentPage++;
    updatePage(shop.nextPageUrl);
    currentPageNumber();
  }
}

window.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let pageNr = document.getElementById("numberSearch").value;
    updatePage(shop.getJupmpToPageUrl(pageNr));
    currentPage = pageNr;
    currentPageNumber();
  }
});

function searchPage() {
  let pageNr = document.getElementById("inputSearch").value;
  updatePage(pageNr);
  currentPage = pageNr;
  currentPageNumber();
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

function updatePage(url) {
  let pokemonDiv = "";
  shop.fetchPokemons(url).then((pokemons) => {
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
                      <div>Page: FIXADETTAS</di
                    </div>                    
                    <div class="modal-footer">
                    </button>
                      <button type="button" class="button" id="buyButton">Buy</button>
                      <buttonSSS
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
  });
}

updatePage(shop.firstPageUrl);
