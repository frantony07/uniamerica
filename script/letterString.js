function hoverLatter(string) {
  const pokedexString = document.querySelector(string);


  if (!pokedexString) {
    console.warn(`Elemento "${string}" não encontrado nesta página`);
    return;
  }

  const text = pokedexString.textContent;

  pokedexString.innerHTML = text
    .split('')
    .map(letter => `<span>${letter}</span>`)
    .join('');
}

hoverLatter('.pokedex.align-content-center.fw-bold.mt-2')