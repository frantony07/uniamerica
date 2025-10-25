document.addEventListener('DOMContentLoaded', () => {
    fetch('pokemons.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards-container');
            data.forEach(pokemon => {
                const card = `
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title text-center">${pokemon.name}</h5>
                        </div>
                        <div class="card-body">
                            <img src="${pokemon.photo_url}" alt="${pokemon.name}">
                            <p class="card-text">Tipo: ${pokemon.type.join(', ')}</p>
                            <p class="card-text">HP: ${pokemon.hp}</p>
                            <p class="card-text">Ataque: ${pokemon.attack}</p>
                            <p class="card-text">Defesa: ${pokemon.defense}</p>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => console.error('Erro ao carregar os dados dos Pokémon:', error));
});
