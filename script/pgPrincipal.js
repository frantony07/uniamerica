// UM SÓ DOMContentLoaded
document.addEventListener('DOMContentLoaded', async() => {
    const campoBusca = document.getElementById('pokemonBuscado');
    const botaoBusca = document.getElementById('botaoBusca');
    const areaResultado = document.getElementById('procurarPokemon');

    const searchedPokemon = campoBusca.value;
    const dados = await fetch('../pokemons.json');
    const pokemons = await dados.json();

    function mostrarPokemon(pokemon) {
       window.location.href = `/html/detalhes.html?id=${pokemon.id}`;
    }

    botaoBusca.addEventListener('click', () => {
    const searchedPokemon = campoBusca.value.trim(); // garante que espaços não atrapalhem
    if (searchedPokemon) {
        const pokemonEncontrado = pokemons.find(p => 
            p.name.toLowerCase() === searchedPokemon.toLowerCase() || 
            p.id.toString() === searchedPokemon
        );

        if (pokemonEncontrado) {
            mostrarPokemon(pokemonEncontrado);
        } else {
            areaResultado.innerHTML = '<p>Pokémon não encontrado</p>';
        }
    }
});



});