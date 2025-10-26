import { category } from './category.js';

const tipe = document.querySelectorAll(".Home , .category , .cardPokemon , .mapPokemon , .favorite , .user");
tipe.forEach(button => {
  button.addEventListener("click", () => {
    tipe.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    cleanContain();

    if (button.classList.contains("Home")) console.log("loading the home");
    if (button.classList.contains("category")) category();
    if (button.classList.contains("cardPokemon")) console.log("loading the card pokemons");
    if (button.classList.contains("mapPokemon")) console.log("loading the map pokemons");
    if (button.classList.contains("favorite")) showFavorites();
    if (button.classList.contains("user")) console.log("loading the user");
  });
});
function cleanContain() {
  let containsElements = document.getElementsByClassName('contains');
  for (let i = 0; i < containsElements.length; i++) {
    containsElements[i].replaceChildren();
  }
}

async function navbar(url, elementId) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
  }
}

document.addEventListener('DOMContentLoaded', () => {
  navbar('navbar.html', 'navbar-placeholder');
});