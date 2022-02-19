
import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1; //TODOCommer behöva nån localstorage här kanske om man inte alltid vill att de ska börja på 1 ved refresh?


document.querySelectorAll(".read-more").forEach(btn => btn.addEventListener('click', readMore)); // TODO detta funkar inte. förmodligen för att readmore knappe inte finns innan listener skapas? Skriva bootstrap och modal när an genererar rutan istället?  
//TODO använda pagnation frå bootstrap istället för detta?
document.getElementById("prevPage").addEventListener('click', prevPage);
document.getElementById("nextPage").addEventListener('click', nextPage);

function prevPage(){

    if(currentPage == 1) return;

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
    document.querySelectorAll(".product-container").forEach(div => {div.innerHTML = ""});

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
            <div class="type">${pokemon.type}</div>
            <div class="price">999 SEK</div>
            <button id="${pokemon.id}" class="button read-more">Readmore</button>
            <button class="button add-to-shart">AddToShart</button> 
            `;

            document.getElementById("pokemonShop").insertAdjacentHTML(  "beforeend", pokemonDiv)

        }
    })
};

updatePage(currentPage);






