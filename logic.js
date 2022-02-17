//Metod för att hämta pokemons


//


//Hämta en array av spec lenght av pokemon JsonObj från pokeApi:n
//argument in vilken "sida" usern står på. typ 1-10, 11-20, osv osv rimligt? 
// return fetch(pokemonJson.species.url); //TODO detta är för att utveckla en readmore knapp senare

// 
// The Promise.all() method takes an iterable of promises as an input, 
//and returns a single Promise that resolves to an array of the results of the input promises. 
// 

/* const fetchPokemon = (id) =>{

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      fetch(url)
      .then((response) => response.json())
      .then(pokemonJsonObj => {
          console.log(pokemonJsonObj);
          return pokemonJsonObj;

      });
} */

/* 1 = 1-10
2 = 11-20
3 = 21-30
4 = 31-40
5 = 41-50
 */

/* const getPokemonArray = (pageNr) =>{

    pageNr * 10;

const pokemons = [];
    for (let i = pageNr - 9; i <= pageNr; i++){

        pokemons.push = (fetchPokemon(i));
    }
return pokemons;

} */

const fetchPokemon = async id =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    return pokemon;
}

const getPokemons = async (pageNr) => {



    const pokemons = [];
    pageNr = pageNr * 10;
    for (let i = pageNr -9; i <= pageNr; i++)
    {
        const pokemon = await fetchPokemon(i)
        pokemons.push(pokemon);
    }

    return (pokemons); //Ett jävla promise!! behöver en .then funktion till på nått sätt. 

};

getPokemons(10).then(function(result){
    for(let pokemon of result)
    {
        console.log(pokemon)
    }
})




  
 /*  const promises = [];
  for (let i = pageNr -9; i <= pageNr; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(promises)

  .then((results) => {
     results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      //type: data.types.map((type) => type.type.name).join(", "),
    }));
    
  });
 */
