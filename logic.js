export class logic {

//TODO måste få in en cath i detta. sidan bLir kajko när den inte hittar vissa pokemos
/* Async functions enable us to write promise based code as if it were synchronous, 
but without blocking the execution thread. It operates asynchronously via the event-loop. 
Async functions will always return a value. Using async simply implies that a promise will 
be returned, and if a promise is not returned, JavaScript automatically wraps it in a 
resolved promise with its value. 

A Promise tells you that it will execute at some point in time, without telling you when.

The await operator is used to wait for a Promise. It can be used inside an Async block only.
The keyword Await makes JavaScript wait until the promise returns a result. It has to be 
noted that it only makes the async function block wait and not the whole program execution.

*/

/** 
 * @description Async functions will always return a value. Using async simply implies that a promise will 
be returned, and if a promise is not returned, JavaScript automatically wraps it in a 
resolved promise with its value.
 * @param {*} id 
 * @returns pokemon object
 */

fetchPokemon = async (id) =>{

    const url = new URL("https://pokeapi.co");
    url.pathname = `/api/v2/pokemon/${id}`;

    const result = await fetch(url);
    const pokemon = await result.json();

   const result2 = await fetch(pokemon.species.url);
    const species = await result2.json();

    const pokemonObj = {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: pokemon.sprites.front_default,
        type: pokemon.types.map(mapArr => mapArr.type.name).join(" / "),
        abilities: pokemon.abilities.map(mapArr => mapArr.ability.name).join(", "),
        base_experience: pokemon.base_experience,
        flavorText: species.flavor_text_entries[0].flavor_text
    }

    console.log(pokemonObj)
    return pokemonObj;
}

//TODO kan man effektivisera denna funktion genom att göra nån promise.all()? Nu inväntas ju fetchen av VARJE pokemon, kan man inte hämta alla pokemons paralellt och bara vänta på att alla tio är hämtade och SEN returna de här arrayen? 
/** 
 * @description Async functions will always return a value. Using async simply implies that a promise will 
be returned, and if a promise is not returned, JavaScript automatically wraps it in a 
resolved promise with its value.
 * @param {*} pageNr 
 * @returns array of the 12 pokemons on that page.  
 */
 getPokemons = async (pageNr) => {

    const pokemons = [];
    
    pageNr = pageNr * 12;
    for (let i = pageNr -11; i <= pageNr; i++)
    {
        const pokemon = await this.fetchPokemon(i) //TODO testa att ändrat ill promise.all()
        const preloadPokemonsInBrowserChacheMoory = this.fetchPokemon(i+12) //ska inte vara await!

        pokemons.push(pokemon)
    }
    return (pokemons);
    // utan asynch await vet inte nästa när den är klar. programet går vidare utan att veta när den ska sluta. 
    //asynch await talar om för datron när man är redo att gå vidare. 
};

}




