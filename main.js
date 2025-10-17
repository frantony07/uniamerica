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
        if(button.classList.contains("favorite"))console.log("loading the favorite") ;
        if(button.classList.contains("user")) console.log("loading the user");
    })
})
function cleanContain() {
    let containsElements = document.getElementsByClassName('contains');
    for (let i = 0; i < containsElements.length; i++) {
        containsElements[i].replaceChildren();
    }
}
function category(){
    let categoryDiv =document.getElementsByClassName('contains')[0];
      if (categoryDiv) {
        categoryDiv.innerHTML = '';
    }
    if (!categoryDiv) return;
    
    let title = document.createElement('h2');
    title.textContent="CATEGORIAS POKEMONS";
    title.style.marginLeft = '30px'; 
    title.style.color='#A8A77A';
    categoryDiv.appendChild(title);
    

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexWrap = 'wrap';
    buttonsContainer.style.marginTop = '4%';
    buttonsContainer.style.justifyContent = 'flex-start';

    buttonsContainer.classList.add('category-buttons');
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

    
   const firstThreeTypes = tableHashTypePokemons.slice(0, 3);
   
    firstThreeTypes.forEach(type => {
        let newButton = buttonByCategory(type.color, type.name);
        newButton.classList.add('category-button'); 
        buttonsContainer.appendChild(newButton);
    });
}

