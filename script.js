
import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1; //TODOCommer behöva nån localstorage här kanske om man inte alltid vill att de ska börja på 1 ved refresh?


document.querySelectorAll(".read-more").forEach(btn => btn.addEventListener('click', readMore)); // TODO detta funkar inte. förmodligen för att readmore knappe inte finns innan listener skapas? Skriva bootstrap och modal när an genererar rutan istället?  
//TODO använda pagnation frå bootstrap istället för detta?
document.getElementById("prevPage").addEventListener('click', prevPage);
document.getElementById("nextPage").addEventListener('click', nextPage);

function prevPage(){

    if(currentPage == 1) return

    currentPage -= 1;
    updatePage(currentPage)
}

function nextPage(){

   if(currentPage == 130) return; //hur många sidor ska vi ha? 

    currentPage += 1;
    updatePage(currentPage)
}
/**
 * 
 * @description emptys all product-container divs 
 */
function emptyShop(){
    document.getElementById("pokemonShop").innerHTML = "";

}

function updatePage(pageNr){
    
    let pokemonDiv = "";

    shop.getPokemons(pageNr).then(function(pokemons){
        emptyShop();

        for(let pokemon of pokemons){

            pokemonDiv = `
                <div class="product-container">
                <h3 class="name">${pokemon.name}</h3>
                <img class="sprite" src="${pokemon.sprites.front_default}">
                <div class="type">${pokemon.types[0].type.name}</div>
                <div class="price">999 SEK</div>
                
                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#readMoreModal"
                >
                  Read more
                </button>

                <button class="btn btn-dark">AddToShart</button> 

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="readMoreModal"
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

            document.getElementById("pokemonShop").insertAdjacentHTML("beforeend", pokemonDiv)

        }
    })
};

updatePage(currentPage);






