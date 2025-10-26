function loadPokemons() {
    const container = document.getElementById('cards-container');

    if (!container) {
        console.error('Container de cards não encontrado!');
        return;
    }

    fetch('../pokemons.json')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            
            data.forEach(pokemon => {
                const card = `
                    <div class="card">
                        <div class="card-header">
                            <h5 id="card-title">${pokemon.name}</h5>
                        </div>
                        <div class="card-body">
                            <img src="${pokemon.photo_url}" alt="${pokemon.name}">
                            <p class="card-text">Tipo: ${pokemon.type.join(', ')}</p>
                            <p class="card-text">HP: ${pokemon.base_stats.hp}</p>
                            <p class="card-text">Ataque: ${pokemon.base_stats.attack}</p>
                            <p class="card-text">Defesa: ${pokemon.base_stats.defense}</p>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
            
            console.log(`${data.length} pokémons carregados com sucesso!`);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos Pokémon:', error);
            if (container) {
                container.innerHTML = '<p style="color: white; text-align: center;">Erro ao carregar os pokémons. Verifique se o arquivo pokemons.json existe.</p>';
            }
        });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPokemons);
} else {
    loadPokemons();
}