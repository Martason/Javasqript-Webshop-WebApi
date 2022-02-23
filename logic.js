export class logic {
  /**
   * @description Async function
   * @param {*} id
   * @returns pokemon object
   */

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  /*  flavorTexts[getRandomInt(this.flavorText.length)] */

  fetchPokemon = async (id) => {
    const url = new URL("https://pokeapi.co");
    url.pathname = `/api/v2/pokemon/${id}`;

    const pokemon = await fetch(url).then((response) => response.json());
    const species = await fetch(pokemon.species.url).then((response) =>
      response.json()
    );

    let flavorTexts = [];

    species.flavor_text_entries.forEach((entry) => {
      if (entry.language.name == "en") {
        flavorTexts.push(entry.flavor_text);
      } else flavorTexts.push("No information in english avalable");
    });

    const pokemonObj = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      sprites: pokemon.sprites.front_default,
      type: pokemon.types.map((mapArr) => mapArr.type.name).join(" / "),
      abilities: pokemon.abilities
        .map((mapArr) => mapArr.ability.name)
        .join(", "),
      base_experience: pokemon.base_experience,
      flavorText: flavorTexts[0],
    };

    return pokemonObj;
  };

  /**
   * @description Async function
   * @param {*} pageNr
   * @returns array of the 12 pokemonObj on that page.
   */
  //TODO fixa en try catch för fetch pokemon?

  getPokemons = async (pageNr) => {
    const promises = [];
    pageNr = pageNr * 12;
    for (let i = pageNr - 11; i <= pageNr; i++) {
      const pokemon = this.fetchPokemon(i);
      promises.push(pokemon);

      const preloadPokemonsInBrowserChacheMoory = this.fetchPokemon(i + 12); //ska inte vara await!
    }

    const pokemons = await Promise.all(promises);
    return pokemons;
  };
}
