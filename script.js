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

function updatePage(pageNr) {

  let pokemonDiv = "";
  let name = "";
  let image = "";
  let type = "";
  let weight = "";
  let height = "";
  let price = "";
  let id = "";
  let base_experience = "";

  //TODO jag förstår inte rikigt vad function gör här? behövs den ens?! 
  shop.getPokemons(pageNr).then(function (pokemons) {
    emptyShop();
    for (let pokemon of pokemons) {


      name = pokemon.name;
      price = pokemon.height * pokemon.weight;
      image = pokemon.sprites.front_default;
      type = pokemon.types.map(mapArr => mapArr.type.name).join(" / ");
      weight = pokemon.weight;
      height = pokemon.height;
      base_experience = pokemon.base_experience;
      
      pokemonDiv = `      
            <div class="product-container">
            <h3 class="name">${name}</h3>
            <img class="sprite" src="${image}">
            <div class="type">Type: ${type}</div>
            <div class="measurement">
            <div class="weight">Weight: ${weight} -</div>
            <div class="height">Height: ${height}</div>
            </div>
            <div class="price">${price} SEK</div>
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
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                    <img class="sprite" src="${image}">
                    <br>
                    <p>${base_experience}</p>
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






