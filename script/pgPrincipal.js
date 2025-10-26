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
        areaResultado.innerHTML = `
            <div class="pokemon-resultado">
                <img src="${pokemon.photo_url}" alt="${pokemon.name}">
                <h4>${pokemon.name}</h4>
                <p>Número: #${pokemon.id}</p>
                <p>Tipo: ${pokemon.type.join(', ')}</p>
                <p>Região: ${pokemon.region}</p>
                
                <div class="stats">
                    <p>Vida: ${pokemon.base_stats.hp}</p>
                    <p>Ataque: ${pokemon.base_stats.attack}</p>
                    <p>Defesa: ${pokemon.base_stats.defense}</p>
                </div>
                
                <p>Evolução: ${pokemon.evolution_line.map(e => e.name).join(' → ')}</p>
            </div>
        `;
    }

    // Busca ao clicar no botão
    botaoBusca.addEventListener('click', () => {
        if (campoBusca.value) {
            buscarPokemon(campoBusca.value);
        }
    });

    // Busca ao apertar Enter
    campoBusca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && campoBusca.value) {
            buscarPokemon(campoBusca.value);
        }
    });
});