
export class logic {

/**
 * 
 * @param {*} id 
 * @returns promise of that pokemon
 */

//TODO måste få in en cath i detta. BLir kajko när den inte hittar vissa pokemos
fetchPokemon = async (id) =>{

    const url = new URL("https://pokeapi.co");
    url.pathname = `/api/v2/pokemon/${id}`;

    const result = await fetch(url);
    const pokemon = await result.json();
    return pokemon;
}
/**
 * 
 * @param {*} pageNr 
 * @returns promiseArray of the ten pokemons on that page
 */

getPokemons = async (pageNr) => {

    const pokemons = [];
    pageNr = pageNr * 10;
    for (let i = pageNr -9; i <= pageNr; i++)
    {
        const pokemon = await this.fetchPokemon(i)
        pokemons.push(pokemon);
    }

    console.log(pokemons);

    return (pokemons); //TODO men hur ska man tänka här med att man returnerar ett promise?
};


}
