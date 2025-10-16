import { buttonByCategory}  from './factoryFunctions.js';
const tipe = document.querySelectorAll(".Home , .category , .cardPokemon , .mapPokemon , .favorite , .user");
tipe.forEach(button =>{
    button.addEventListener("click",()=>{
        tipe.forEach(b=>b.classList.remove("selected"));
        button.classList.add("selected")

        if(button.classList.contains("Home"))  ;
        if(button.classList.contains("category"))  category();
        if(button.classList.contains("cardPokemon")) ;
        if(button.classList.contains("mapPokemon")) ;
        if(button.classList.contains("favorite")) ;
        if(button.classList.contains("user")) ;
    })
})
function category(){
    let categoryDiv =document.getElementsByClassName('contains')[0];
      if (categoryDiv) {
        categoryDiv.innerHTML = '';
    }
    const tableHashTypePokemons = [
        { color: '#A8A77A', name: 'Normal' },
        { color: '#EE8130', name: 'Fire' },
        { color: '#6390F0', name: 'Water' },
        { color: '#7AC74C', name: 'Grass' },
        { color: '#A98FF3', name: 'Electric' },
        { color: '#F7D02C', name: 'Ice' },
        { color: '#96D9D6', name: 'Fighting' },
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

    tableHashTypePokemons.forEach(type=> {
        let newButton = buttonByCategory(type.color, type.name);
        newButton.classList.add('category-button'); 
        if (categoryDiv) {
            categoryDiv.appendChild(newButton);
        }
    });
}

