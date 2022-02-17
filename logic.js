//Metod för att hämta pokemons


//
//TODO påverka vad man hämtar via argument för searchParams?

const url = new URL(" https://pokeapi.co");

url.pathname = "/api/v2/pokemon";
url.searchParams.set("limit", 10);

fetch(url)
    // när vi får svar från servern
    .then((data) => {
        console.log(data);
         // true om responskoden är 200-299
         // be om att få innehållet i svaret som en text
            return data.text();
    })
    // när vi fått hela textresultatet från servern.
    //TODO Men säg nu att man vill ha någon fräck DOM metod som lägger ut det man hämtar på hemsidan. Var ska det ligga? tänker logic vs script. 
    // return allPokemonInfo typ? sen ha andra metoder som  
    .then((pokemonInfo) =>{
        console.log(pokemonInfo);
    })
