/**
 * @param {string} string 
 */
function hoverLatter(string){
    const pokedexString = document.querySelector(`${string}`);
    const text = pokedexString.textContent;

    pokedexString.innerHTML = text
      .split('')
      .map(letter => `<span>${letter}</span>`)
      .join('');
}

hoverLatter('.pokedex')