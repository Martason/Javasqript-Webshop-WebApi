import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1; //TODOCommer behöva nån localstorage här kanske om man inte alltid vill att de ska börja på 1 ved refresh?

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

function HandleReadMoreClick(e)
{
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

//TODO ett alternativ är ju att själva  <!-- Modal --> får ligga kvar i index.html. Så hämtar man och uppdaterar bara specefika variabler med en ny avancerad fetch när någon klickar på en readmore knapp
//Problemet med att eventlisternern inte funkar för kbappar skapade senare kvarstår dock. 

function updatePage(pageNr) {
  let pokemonDiv = "";

  //TODO jag förstår inte rikigt vad function gör här? behövs den ens?! 
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
            <button class="button add-to-shart">Buy</button>
            
            
            <!-- Button trigger modal -->
            <button
              type="button"
              class="button read-more"
              id ="${pokemon.id}"
              data-bs-toggle="modal"
              data-bs-target="#readMoreModal${pokemon.id}"
            >
              Read more
            </button>

            <!-- Modal -->
              <div
                class="modal fade"
                id="readMoreModal${pokemon.id}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                    <img class="sprite" src="${pokemon.sprites.front_shiny}">
                    <br>
                    <p>${pokemon.base_experience}</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-dark">Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            `;

      document
        .getElementById("pokemonShop")
        .insertAdjacentHTML("beforeend", pokemonDiv);
    }
   document.querySelectorAll(".read-more").forEach(btn => btn.addEventListener('click', HandleReadMoreClick)); 
  });
}

updatePage(currentPage);


document.getElementById("prevPage").addEventListener('click', prevPage);
document.getElementById("nextPage").addEventListener('click', nextPage);






