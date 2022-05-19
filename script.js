import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = shop.loadPageNr();

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("choosePage").addEventListener("keyup", jumpToPage);

function prevPage() {
  if (currentPage <= 1) {
    currentPage = 94;
    updatePokemonsOnPage(shop.lastpageUrl);
  } else {
    currentPage--;
    updatePokemonsOnPage(shop.previousPageUrl);
  }
  updatePageNummer();
}

function nextPage() {
  if (currentPage >= 94) {
    currentPage = 1;
    updatePokemonsOnPage(shop.pageOneUrl);
  } else {
    currentPage++;
    updatePokemonsOnPage(shop.nextPageUrl);
  }
  updatePageNummer();
}

function jumpToPage(event) {
  if (event.keyCode === 13) {
    currentPage = parseInt(document.getElementById("choosePage").value);
    if (currentPage >= 1 && currentPage <= 94) {
      updatePokemonsOnPage(shop.getJupmpToPageUrl(currentPage));
      updatePageNummer();
      document.getElementById("choosePage").value = "";
    } else {
      document.getElementById("choosePage").value = "";
    }
  }
}

function updatePageNummer() {
  document.getElementById("currentPage").innerHTML = "Page: " + currentPage;
  shop.savePageNr(currentPage);
}

function emptyShop() {
  document.getElementById("pokemonShop").innerHTML = "";
}

function updatePokemonsOnPage(url) {
  let pokemonDiv = "";
  shop.fetchPokemons(url).then((pokemons) => {
    emptyShop();
    for (let pokemon of pokemons) {
      let name = pokemon.name;
      let price = pokemon.height * pokemon.weight;
      let image = pokemon.sprites != null ? pokemon.sprites : "/img/ball.png";
      let type = pokemon.type;
      let weight = pokemon.weight / 10;
      let height = pokemon.height * 10;
      let base_experience = pokemon.base_experience;
      let id = pokemon.id;
      let abilities = pokemon.abilities;
      let flavorText = pokemon.flavorText;

      pokemonDiv = `
         
      <div class="product-container">
      <h3 class="name">${name}</h3>
      <img class="sprite" src="${image}">
      <div class="type">Type: ${type}</div>
      <div class="price">Price: ${price} :-</div>
      <button class="button add-to-shart">Buy</button>
    
    
      <!-- Button trigger modal -->
      <button type="button" class="button read-more" id="${id}" data-bs-toggle="modal" data-bs-target="#readMoreModal${id}">
        Read more
      </button>
    
      <!-- Modal -->
      <div class="modal fade" id="readMoreModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title name" id="exampleModalLabel">${name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img class="spriteModal" src="${image}">
              <div>Type: ${type}</div>
              <div>Start XP: ${base_experience}</div>
              <div class="pokemonMeasurement">
                <div class="weight">Weight: ${weight} kg</div>
                <div class="height">Height: ${height} cm</div>
              </div>
              <div class="type">Abilities: ${abilities}</div>
              <br>
              <p class="type">Info: ${flavorText}</p>
              <div class="modalPagination">
                <button class="modalPrevtBtn" onclick="prevPage()">Prev</button>
                <button>ID: ${id}</button>
                <button class="modalNextBtn" onclick="nextPage()">Next</button>
              </div>
            </div>
            <div class="modal-footer">
              </button>
              <button type="button" class="button" id="buyButton">Buy</button>
              <button type="button" class="button" id="closeBtn" data-bs-dismiss="modal">
                Close
            </div>
          </div>
        </div>
      </div>
            `;

      document
        .getElementById("pokemonShop")
        .insertAdjacentHTML("beforeend", pokemonDiv);
    }
  });
}

//https://www.w3schools.com/howto/howto_js_autocomplete.asp
const searchbarPokemonElem = document.getElementById("searchbar-pokemon");
const input = searchbarPokemonElem; //TODO fixa detta, du byter ju bara namn på den
//TODO skapa klass för autocomplete istället för att ha det här.
var currentFocus;
/*execute a function when someone writes in the text field:*/
searchbarPokemonElem.oninput = function () {
  const pokemonSugestions = shop.pokemonLibrary.map(
    (pokemons) => pokemons.name
  );

  input.addEventListener("input", function () {
    let inputValue = this.value;
    /*close any already open lists of autocompleted values:*/
    closeAllLists();
    if (!inputValue) {
      return false;
    }
    currentFocus = -1;

    /*create a DIV element that will contain the pokemons:*/
    let DivA = document.createElement("DIV");
    DivA.setAttribute("id", this.id + "pokemonSearch-list");
    DivA.setAttribute("class", "pokemonSearch-items");

    /*append that DIV as a child of the pokemonSearch container:*/
    this.parentNode.appendChild(DivA);

    /*for each item in the Suggestions array...*/
    for (let i = 0; i < pokemonSugestions.length; i++) {
      /*check if the items starts with the same letters as the text inputValue:*/
      if (
        pokemonSugestions[i].substr(0, inputValue.length).toUpperCase() ==
        inputValue.toUpperCase()
      ) {
        /*create a DIV element for each element that match:*/
        let DivB = document.createElement("DIV");
        /*make the matching letters bold:*/
        DivB.innerHTML =
          "<strong>" +
          pokemonSugestions[i].substr(0, inputValue.length) +
          "</strong>";
        DivB.innerHTML += pokemonSugestions[i].substr(inputValue.length);

        /*insert a input field that will hold the current array item's value:*/
        DivB.innerHTML +=
          "<input type='hidden' value='" + pokemonSugestions[i] + "'>";
        /*execute a function when someone clicks on the item value / DIV element:*/
        DivB.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          input.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        DivA.appendChild(DivB);
      }
    }
  });

  /*execute a function when keydown is pressed on the keyboard:*/
  input.addEventListener("keydown", function (e) {
    const key = e.key;
    var x = document.getElementById(this.id + "pokemonSearch-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.key == "ArrowDown") {
      //If the arrow DOWN key is pressed,
      //increase the currentFocus variable:
      currentFocus++;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.key == "ArrowUp") {
      //If the arrow UP key is pressed,
      //decrease the currentFocus variable:
      currentFocus--;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.key == "Enter") {
      //If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();
      if (currentFocus > -1) {
        //and simulate a click on the "active" item:
        if (x) x[currentFocus].click();
      }
    }
  });
};
//TODO bugg i att den hoppar över.
function addActive(x) {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
  var x = document.getElementsByClassName("pokemonSearch-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != input) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*close a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});

updatePageNummer();
updatePokemonsOnPage(shop.firstPageUrl);
