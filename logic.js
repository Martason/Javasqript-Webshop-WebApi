
export class logic {

/**
 * 
 * @param {*} id 
 * @returns promise of that pokemon
 */
fetchPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
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

    return (pokemons); //TODO men hur ska man tänka här med att man returnerar ett promise?
};


}

