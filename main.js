import { buttonByCategory}  from './factoryFunctions.js';
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
        if (button.classList.contains("favorite")) showFavorites();
        if(button.classList.contains("user")) console.log("loading the user");
    })
})
function cleanContain() {
    let containsElements = document.getElementsByClassName('contains');
    for (let i = 0; i < containsElements.length; i++) {
        containsElements[i].replaceChildren();
    }
}

let categoriesToBeSearchedInApi = [];

function category(){
    let categoryDiv =document.getElementsByClassName('contains')[0];
      if (categoryDiv) {
        categoryDiv.innerHTML = '';
    }
    if (!categoryDiv) return;
    categoryDiv.style.gap = '15px';
    
    let title = document.createElement('h2');
    title.textContent="CATEGORIES POKEMONS";
    title.style.marginLeft = '30px'; 
    title.style.color='#A8A77A';
    categoryDiv.appendChild(title);
    categoryDiv.appendChild(document.createElement('br'));
    

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('category-buttons');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexWrap = 'wrap';
    buttonsContainer.style.marginTop = '4%';
    buttonsContainer.style.justifyContent = 'flex-start';

    categoryDiv.appendChild(buttonsContainer);

    const tableHashTypePokemons = [
        { color: '#A8A77A', name: 'Normal' },
        { color: '#EE8130', name: 'Fire' },
        { color: '#6390F0', name: 'Water' },
        { color: '#7AC74C', name: 'Grass' },
        { color: '#A98FF3', name: 'Electric' },
        { color: '#96D9D6', name: 'Ice' },
        { color: '#F7D02C', name: 'Fighting' },
        { color: '#C22E28', name: 'Poison' },
        { color: '#A33EA1', name: 'Ground' },
        { color: '#E2BF65', name: 'Flying' },
        { color: '#A6B91A', name: 'Psychic' },
        { color: '#F95587', name: 'Bug' },
        { color: '#B6A136', name: 'Rock' },
        { color: '#735878', name: 'Ghost' },
        { color: '#6F35FC', name: 'Dragon' },
        { color: '#705746', name: 'Steel' },
        { color: '#B7B7CE', name: 'Dark' },
        { color: '#D685AD', name: 'Fairy' }
    ];
    const mainButton = document.createElement('button');
    mainButton.textContent = 'show types ▼';
    mainButton.style.backgroundColor = '#A8A77A';
    mainButton.style.color = 'while';
    mainButton.style.border = 'none';
    mainButton.style.borderRadius = '12px';
    mainButton.style.padding = '10px 18px';
    mainButton.style.fontWeight = 'bold';
    mainButton.style.cursor = 'pointer';
    mainButton.style.transition = '0.3s'; 
    mainButton.style.position = 'relative';


    const subButtonsContainer = document.createElement('div');
    subButtonsContainer.style.display = 'none';
    subButtonsContainer.style.flexWrap = 'wrap'; 
    subButtonsContainer.style.gap = '15px';
    subButtonsContainer.style.marginTop = '8px';
    subButtonsContainer.style.position = 'absolute';
    subButtonsContainer.style.background = '#1b1b1b';
    subButtonsContainer.style.padding = '12px';
    subButtonsContainer.style.borderRadius = '12px';
    subButtonsContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    subButtonsContainer.style.zIndex = '1000';
    subButtonsContainer.style.width = '550px'; 
    subButtonsContainer.style.display = 'none';
    subButtonsContainer.style.flexDirection = 'row';
    subButtonsContainer.style.left = '50%';
    subButtonsContainer.style.transform = 'translateX(-50%)';
    subButtonsContainer.style.top = '27%';


    tableHashTypePokemons.forEach(type=>{
        const subButton = document.createElement('button');
        subButton.textContent = type.name;
        subButton.style.backgroundColor = type.color;
        subButton.style.color = 'white';
        subButton.style.border = 'none';
        subButton.style.borderRadius = '10px';
        subButton.style.padding = '8px 12px';
        subButton.style.cursor = 'pointer';
        subButton.style.transition = '0.2s';
        subButton.style.minWidth = '70px';
        subButton.addEventListener('mouseenter', ()=>{
            subButton.style.transform = 'scale(1.1)';
        });
        subButton.addEventListener('mouseleave', ()=>{
            subButton.style.transform ='scale(1)';
        });
        subButton.addEventListener('click',()=>{
            if (categoriesToBeSearchedInApi.includes(type.name)){
                subButton.style.border = 'none';
                subButton.style.boxShadow = 'none';
                categoriesToBeSearchedInApi = categoriesToBeSearchedInApi.filter(p => p !== type.name)
            }else{
                subButton.style.border = '3px solid #00FFFF';
                subButton.style.boxShadow = '0 0 6px #17ef9cdd';
                categoriesToBeSearchedInApi.push(type.name);
            }
        })
        subButtonsContainer.appendChild(subButton);
    });

    mainButton.addEventListener('click', ()=>{
        const visible = subButtonsContainer.style.display === 'flex';
        subButtonsContainer.style.display =visible ? 'none' : 'flex';
        mainButton.textContent = visible ? 'show types ▼' :  'hide types ▲';
    });
    
    categoryDiv.appendChild(mainButton);
    categoryDiv.appendChild(subButtonsContainer);
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


