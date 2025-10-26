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

// UM SÓ DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('pokemonBuscado');
    const botaoBusca = document.getElementById('botaoBusca');
    const areaResultado = document.getElementById('procurarPokemon');

    async function buscarPokemon(busca) {
        try {
            const dados = await fetch('pokemons.json');
            const pokemons = await dados.json();

            busca = busca.toLowerCase().trim();
            const pokemon = pokemons.find(p =>
                p.name.toLowerCase() === busca ||
                p.id.toString() === busca
            );

            if (pokemon) {
                mostrarPokemon(pokemon);
            } else {
                areaResultado.innerHTML = '<p>Pokemon não encontrado</p>';
            }
        } catch (erro) {
            areaResultado.innerHTML = '<p>Erro ao buscar Pokemon</p>';
        }
    }

    function mostrarPokemon(pokemon) {
       window.location.href = `/html/detalhes.html?id=${pokemon.id}`;
    }

    botaoBusca.addEventListener('click', () => {
        if (campoBusca.value) {
            buscarPokemon(campoBusca.value);
        }
    });

    campoBusca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && campoBusca.value) {
            buscarPokemon(campoBusca.value);
        }
    });

    // ADICIONA AQUI
    hoverLatter('.pokedex.align-content-center.fw-bold.mt-2');
});