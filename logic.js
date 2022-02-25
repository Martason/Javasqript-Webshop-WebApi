export class logic {
  flavorTexts = [];
  pokemons = [];

  firstPageUrl;
  lastpageUrl;
  previousPageUrl = "";
  nextPageUrl = "";

  constructor() {
    this.firstPageUrl = new URL("https://pokeapi.co");
    this.firstPageUrl.pathname = "/api/v2/pokemon";
    this.firstPageUrl.searchParams.set("limit", "12");

    this.lastpageUrl = new URL("https://pokeapi.co");
    this.lastpageUrl.pathname = "/api/v2/pokemon";
    this.lastpageUrl.searchParams.set("limit", "12");
    this.lastpageUrl.searchParams.set("offset", "1114");
  }

  getJupmpToPageUrl(askedPageNr) {
    let offsetObj = askedPageNr * 12;
    console.log(typeof offsetObj);

    this.jumpToPageUrl = new URL("https://pokeapi.co");
    this.jumpToPageUrl.pathname = "/api/v2/pokemon";
    this.jumpToPageUrl.searchParams.set("limit", "12");
    this.jumpToPageUrl.searchParams.set("offset" + { offsetObj });

    console.log(this.jumpToPageUrl);
  }

  /**
   * @description Async function fetching pokemons
   * @param {*} url of the page the pokemons should be fetchd from
   * @returns array of pokemonObjekt
   */
  async fetchPokemons(url) {
    const promises = [];
    let pageData = await fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Something went wrong, status: " + response.status;
      }
    });

    this.previousPageUrl = pageData.previous;
    this.nextPageUrl = pageData.next;
    const pokemonsOnCurrentPage = pageData.results;

    for (let pokemonData of pokemonsOnCurrentPage) {
      const pokemon = this.fetchPokemon(pokemonData.url);
      promises.push(pokemon);
    }

    const resluts = await Promise.allSettled(promises);

    return resluts
      .filter((promises) => promises.status === "fulfilled")
      .map((promises) => promises.value);
  }

  async fetchPokemon(url) {
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
  }
}
