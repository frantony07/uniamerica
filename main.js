import { category } from './category.js';

const tipe = document.querySelectorAll(".Home , .category , .cardPokemon , .mapPokemon , .favorite , .user");
tipe.forEach(button =>{
    button.addEventListener("click",()=>{
        tipe.forEach(b=>b.classList.remove("selected"));
        button.classList.add("selected");
        cleanContain();

        if(button.classList.contains("Home")) console.log("loading the home") ;
        if(button.classList.contains("category"))  category();
        if(button.classList.contains("cardPokemon")) console.log("loading the card pokemons");
        if(button.classList.contains("mapPokemon")) console.log("loading the map pokemons");
        if(button.classList.contains("favorite")) showFavorites();
        if(button.classList.contains("user")) console.log("loading the user");
    });
});
function cleanContain() {
    let containsElements = document.getElementsByClassName('contains');
    for (let i = 0; i < containsElements.length; i++) {
        containsElements[i].replaceChildren();
    }
}




function showFavorites() {
  const container = document.querySelector('.contains');
  container.innerHTML = `
    <h1 style="color: #ffcc00; text-align: center;">⭐ POKÉMON FAVORITOS ⭐</h1>
    <p style="text-align: center; color: white;">Sua coleção especial de Pokémon favoritos</p>

    <div style="display: flex; flex-direction: column; align-items: center;">
      <button style="
        background: linear-gradient(90deg, #ffa500, #ff4500);
        color: white;
        border: none;
        border-radius: 30px;
        padding: 12px 30px;
        font-weight: bold;
        cursor: pointer;
        margin: 20px 0;
        box-shadow: 0 4px 10px rgba(255, 140, 0, 0.5);
      ">
        ❤️ 0 Pokémons Favoritos
      </button>

      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #aaa;
      ">
        <i style="font-size: 2em;">⭐</i>
        <p>Vazio</p>
      </div>

      <h3 style="color: white;">Nenhum Pokémon Favorito</h3>
      <p style="text-align: center; color: #ccc;">
        Você ainda não adicionou nenhum Pokémon aos seus favoritos.<br>
        Explore as categorias e clique na estrela para favoritar!
      </p>
    </div>
  `;
}