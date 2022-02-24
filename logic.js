export class logic {
  flavorTexts = [];

  /**
   * @description Async function
   * @param {*} id
   * @returns pokemon object
   */
  fetchPokemon = async (id) => {
    const url = new URL("https://pokeapi.co");
    url.pathname = `/api/v2/pokemon/${id}`;

    const pokemon = await fetch(url).then((response) => response.json());
    const species = await fetch(pokemon.species.url).then((response) =>
      response.json()
    );

    species.flavor_text_entries.forEach((entry) => {
      if (entry.language.name == "en") {
        this.flavorTexts.push(entry.flavor_text);
      }
    });

    const pokemonObj = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      sprites: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((mapArr) => mapArr.type.name).join(" / "),
      abilities: pokemon.abilities
        .map((mapArr) => mapArr.ability.name)
        .join(", "),
      base_experience: pokemon.base_experience,
      flavorText: this.flavorTexts[0],
    };
    return pokemonObj;
  };

  /**
   * @description Async function
   * @param {*} pageNr
   * @returns array of 12 pokemonObj on that page.
   */
  getPokemons = async (pageNr) => {
    const promises = [];
    pageNr = pageNr * 12;
    for (let i = pageNr - 11; i <= pageNr; i++) {
      i = i < 899 ? i : i + 9102;
      const pokemon = this.fetchPokemon(i);
      i = i > 899 ? i - 9102 : i;
      promises.push(pokemon);

      /*    const preloadPokemonsInBrowserChacheMemory = this.fetchPokemon(
        i + 12
      ).catch((_) =>
        console.log("fetchError while atemting to preload nextpage")
      ); */
    }

    const resluts = await Promise.allSettled(promises);
    return resluts
      .filter((promises) => promises.status === "fulfilled")
      .map((promises) => promises.value);
  };
}
