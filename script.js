//En eventlistener för pagnation knappen. Hämtar vilken sida man önksar förflytta sig till. info från pilarna

// En evenlistner readmore knappen. rätt enkel

// en eventlistner för searchbaren? leta reda på spec pokemon via namn? 

// DOM för readmore knappen
// DOME att presentera info om pokemon på sidan

import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();


document.querySelectorAll(".read-more").forEach(btn => btn.addEventListener('click', readMore)); // TODO detta funkar inte. förmodligen för att readmore kbappe ninte finns innan detta? Den skapas ju efteåt... 
//eventlistnener för att ta in pagenu från en pagnation typ och koppla samman med updatePage

function handleReadMore(e){

    const clickedPokemonId = e.target.id;
    console.log(clickedPokemonId);
}

function moreInfoPopUp(pokemon)
{

}

function updatePage(e) //TODO kommer ta in event från pagnation. 
{
const pageNr = e // e.target.id;

let pokemonDiv = "";

shop.getPokemons(2).then(function(pokemons){
    for(let pokemon of pokemons)
    {
        console.log(pokemon)

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
}); 


    
}

updatePage(8)


/* 
   
*/


