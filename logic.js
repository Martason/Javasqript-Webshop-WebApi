export class logic {
  constructor() {
    this.currentPage = 1;
  }
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

    let flavorTexts = [];

    species.flavor_text_entries.forEach((entry) => {
      if (entry.language.name == "en") {
        flavorTexts.push(entry.flavor_text);
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

  savePageNr() {
    localStorage.setItem("savedPageNr", JSON.stringify(this.currentPage));
  }

  loadPageNr() {
    let savedPage = +localStorage.getItem("savedPageNr");
    if (savedPage > 1) {
      this.currentPage = savedPage;
      return this.currentPage;
    } else {
      return 1;
    }
  }
}
