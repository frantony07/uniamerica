let categoriesToBeSearchedInApi = [];

function searchedCategory(){
  if ( !categoriesToBeSearchedInApi || categoriesToBeSearchedInApi.length === 0){
    alert("escolhe uma categoria pokemon antes de pesquisar.");
    return false;
  } 
  return true;
}

export function category(){
  let buttonBysearchIsActive = false ;
  let categoryDiv = document.getElementsByClassName('contains')[0];
    
  if (categoryDiv) {
    categoryDiv.innerHTML = '';
    categoryDiv.classList.add('contains');
  }
  if (!categoryDiv) return;

  let title = document.createElement('h2');
  title.textContent = "CATEGORIES POKEMONS";
  title.classList.add('category-title');
  categoryDiv.appendChild(title);
  categoryDiv.appendChild(document.createElement('br'));
    
  const buttonsContainer = document.createElement('div');
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
    
  const mainButton = document.createElement('button');
  mainButton.textContent = 'show types ▼';
  mainButton.classList.add('main-category-button'); 
    
  const subButtonsContainer = document.createElement('div');
  subButtonsContainer.classList.add('sub-buttons-container'); 
   
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

    mainButton.addEventListener('click', (event) => {
        event.stopPropagation();
      const isVisible = subButtonsContainer.style.display === 'flex';
      subButtonsContainer.style.display = isVisible ? 'none' : 'flex';
      mainButton.textContent = isVisible ? 'show types ▼' : 'hide types ▲';
  });

    document.addEventListener('click', () =>{
        if(mainButton.textContent == 'hide types ▲' && subButtonsContainer.style.display == 'flex'){
            subButtonsContainer.style.display = 'none';
            mainButton.textContent = 'show types ▼';
        }
    });

  const buttonSearch = document.createElement('button');
  buttonSearch.classList.add('button-search');
  buttonSearch.textContent = 'pesquisar'
  buttonSearch.addEventListener('click' , () => {
  if (!buttonBysearchIsActive){
    const searchSucceeded = searchedCategory();
    if (searchSucceeded) {
      buttonSearch.classList.add('selected');
      buttonBysearchIsActive = true;
    }
  } else {
    buttonSearch.classList.remove('selected');
    buttonBysearchIsActive = false;
  }
});
  
  categoryDiv.appendChild(mainButton);
  categoryDiv.appendChild(subButtonsContainer);
  categoryDiv.appendChild(buttonSearch);
}