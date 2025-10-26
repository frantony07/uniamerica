let categoriesToBeSearchedInApi = [];

async function createArrayPokemon(){
  try {
    const response = await fetch('/pokemons.json'); 
    const arrayPokemon =  await response.json();
    return arrayPokemon;
  } catch (error) {
    console.error('Erro ao carregar os dados dos Pokémon:', error);
    return [];
  }
}

function createVisualitiPokemon(pokemons) {
    let fragment = document.createDocumentFragment();

    if (!pokemons || pokemons.length === 0) {
        let message = document.createElement('p');
        message.textContent = "Nenhum Pokémon encontrado para esta seleção.";
        fragment.appendChild(message);
        return fragment;
    }
    pokemons.forEach((pokemon) => {
        let divPokemon = document.createElement('div');
        divPokemon.classList.add('divPokemon');

        let linkPokemon = document.createElement('a');
        linkPokemon.href = `/html/detalhes.html?id=${pokemon.id}`;
        linkPokemon.style.textDecoration = 'none';
        linkPokemon.style.color = 'inherit';

        let pokemonId = document.createElement('h3');
        pokemonId.textContent = `#${pokemon.id}`;
        linkPokemon.appendChild(pokemonId);

        let pokemonName = document.createElement('h2');
        pokemonName.textContent = pokemon.name;
        linkPokemon.appendChild(pokemonName);

        let pokemonsPhoto = document.createElement('img');
        pokemonsPhoto.src = pokemon.photo_url;
        pokemonsPhoto.alt = `Photo of ${pokemon.name}`;
        linkPokemon.appendChild(pokemonsPhoto);
      
        divPokemon.appendChild(linkPokemon);
        fragment.appendChild(divPokemon);
    });

    return fragment; 
}

async function searchedCategory(){
  let  arrayPokemonsSelected =[];
  if ( !categoriesToBeSearchedInApi || categoriesToBeSearchedInApi.length === 0){
    alert("escolhe uma categoria pokemon antes de pesquisar.");
    
    return []; 
  } 
  const arrayPokemons = await createArrayPokemon();
  arrayPokemons.forEach(pokemon =>{
    const typeIsSelected = categoriesToBeSearchedInApi.some(category => 
        pokemon.type.includes(category)
    );

    if (typeIsSelected){
      arrayPokemonsSelected.push(pokemon)
    }
  });

  return arrayPokemonsSelected;
}


function createButtonOfSearched(containerPokemons){
  const buttonSearch = document.createElement('button');
   buttonSearch.classList.add('button-search');
   buttonSearch.textContent = 'pesquisar';
   

   buttonSearch.addEventListener('click' , async () => {
      
      const selectedPokemonArray = await searchedCategory();
     
      if (!selectedPokemonArray || selectedPokemonArray.length === 0) {
        buttonSearch.classList.remove('selected');
        containerPokemons.innerHTML = ''; 
      }
    
   
      const newPokemonFragment = createVisualitiPokemon(selectedPokemonArray);
      containerPokemons.innerHTML = '';
      containerPokemons.appendChild(newPokemonFragment);

      buttonSearch.classList.add('selected');
   });
  return buttonSearch ;
}

function createButtonForTypePokemons(subButtonsContainer){
  const tableHashTypePokemons = [
    { color: '#A8A77A', name: 'Normal' },{ color: '#EE8130', name: 'Fire' },{ color: '#6390F0', name: 'Water' },{ color: '#7AC74C', name: 'Grass' },{ color: '#A98FF3', name: 'Electric' },{ color: '#96D9D6', name: 'Ice' },{ color: '#F7D02C', name: 'Fighting' },{ color: '#C22E28', name: 'Poison' },{ color: '#A33EA1', name: 'Ground' },{ color: '#E2BF65', name: 'Flying' },{ color: '#A6B91A', name: 'Psychic' },{ color: '#F95587', name: 'Bug' },{ color: '#B6A136', name: 'Rock' },{ color: '#735878', name: 'Ghost' },{ color: '#6F35FC', name: 'Dragon' },{ color: '#705746', name: 'Steel' },{ color: '#B7B7CE', name: 'Dark' },{ color: '#D685AD', name: 'Fairy' }
  ];

   tableHashTypePokemons.forEach(type => {
    const subButton = document.createElement('button');
    subButton.textContent = type.name;
    subButton.classList.add('type-button'); 
    subButton.style.backgroundColor = type.color; 
    
    subButton.addEventListener('mouseenter', () => {
      subButton.classList.add('type-button-hover');
    });
    subButton.addEventListener('mouseleave', () => {
      subButton.classList.remove('type-button-hover');
    });
        
    subButton.addEventListener('click', () => {
      if (categoriesToBeSearchedInApi.includes(type.name)) {
        subButton.classList.remove('type-button-selected');
        categoriesToBeSearchedInApi = categoriesToBeSearchedInApi.filter(p => p !== type.name);
      } else {
                
        subButton.classList.add('type-button-selected');
        categoriesToBeSearchedInApi.push(type.name);
      }      
    });
        
    subButtonsContainer.appendChild(subButton);
    });
  
}

export function category(){
  
  let categoryDiv = document.getElementsByClassName('contains')[0];
    
  if (categoryDiv) {
    categoryDiv.innerHTML = '';
    categoryDiv.classList.add('contains');
  }
  if (!categoryDiv) return;

  const pokemonDisplayContainer = document.createElement('div');
  pokemonDisplayContainer.id = 'pokemon-results'; 
  
  const filterControls = document.createElement('div'); 
  filterControls.classList.add('filter-controls');

  const mainButton = document.createElement('button'); 
  mainButton.textContent = 'show types ▼';
  mainButton.classList.add('main-category-button'); 
    
  const subButtonsContainer = document.createElement('div');
  subButtonsContainer.classList.add('sub-buttons-container'); 

  createButtonForTypePokemons(subButtonsContainer); 
  const buttonSearch = createButtonOfSearched(pokemonDisplayContainer); 

  filterControls.appendChild(mainButton);
  filterControls.appendChild(buttonSearch);
  filterControls.appendChild(subButtonsContainer);
  
  mainButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isVisible = subButtonsContainer.style.display === 'flex';
    subButtonsContainer.style.display = isVisible ? 'none' : 'flex';
    mainButton.textContent = isVisible ? 'hide types ▲' : 'show types ▼';
  });

  document.addEventListener('click', () =>{
   
    if(mainButton.textContent == 'hide types ▲' && subButtonsContainer.style.display == 'flex'){
        subButtonsContainer.style.display = 'none';
        mainButton.textContent = 'show types ▼';
        buttonSearch.classList.remove('selected');
    }
  });

  categoryDiv.appendChild(filterControls);
  categoryDiv.appendChild(pokemonDisplayContainer); 
}
document.addEventListener('DOMContentLoaded', () => {
  
    if (document.getElementsByClassName('contains').length > 0) {
        category();
    }
});

