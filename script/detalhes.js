const GerenciadorPokemon = (() => {
    let dadosPokemon = null;

    return {
        async carregarPokemon(id) {
            try {
                const resposta = await fetch('/pokemons.json');
                const pokemons = await resposta.json();
                dadosPokemon = pokemons.find(p => p.id === id);
                return dadosPokemon;
            } catch (erro) {
                console.error('Erro ao carregar Pokémon:', erro);
                return null;
            }
        },
    };
})();

const Renderizador = {
    renderizarInfoBasica(pokemon) {
        document.querySelector('[data-id-pokemon]').textContent = String(pokemon.id).padStart(3, '0');
        document.querySelector('[data-nome-pokemon]').textContent = pokemon.name;
        document.querySelector('[data-imagem-pokemon]').src = pokemon.photo_url;
        document.querySelector('[data-raridade]').textContent = 'Comum';
        document.querySelector('[data-descricao-pokemon]').textContent = 
            `Um Pokémon do tipo ${pokemon.type.join('/')} com características únicas.`;
    },

    renderizarTipos(pokemon) {
        const container = document.querySelector('[data-tipos-pokemon]');
        container.innerHTML = '';

        const coresTipo = {
            'Grass': 'bg-success',
            'Poison': 'bg-danger',
            'Fire': 'bg-danger',
            'Water': 'bg-info',
            'Electric': 'bg-warning',
            'Bug': 'bg-success',
            'Flying': 'bg-primary',
            'Normal': 'bg-secondary'
        };

        pokemon.type.forEach(tipo => {
            const span = document.createElement('span');
            span.className = `badge rounded-pill text-white me-2 pokemon-type-badge ${coresTipo[tipo] || 'bg-secondary'}`;
            span.textContent = tipo;
            container.appendChild(span);
        });
    },

    renderizarEstatisticas(pokemon) {
        const mapaEstat = {
            'hp': pokemon.base_stats.hp,
            'attack': pokemon.base_stats.attack,
            'defense': pokemon.base_stats.defense,
            'speed': pokemon.base_stats.speed
        };

        Object.entries(mapaEstat).forEach(([chave, valor]) => {
            const itemEstat = document.querySelector(`[data-estatistica="${chave}"]`);
            if (itemEstat) {
                const spanValor = itemEstat.querySelector('.stat-value');
                const barraEstat = itemEstat.querySelector('.stat-bar');
                spanValor.textContent = valor;
                barraEstat.style.width = `${(valor / 150) * 100}%`;
            }
        });
    },

  renderizarLinhaEvolutiva(pokemon) {
    pokemon.evolution_line.forEach((evolucao, indice) => {
        const container = document.querySelector(`[data-indice-evolucao="${indice}"]`);
        if (container) {
            const img = container.querySelector('.evolution-circle');
            const badge = container.querySelector('[data-badge-evolucao]');

            if (img) {
                img.src = evolucao.photo_url || `/html/img/${evolucao.name}.png`;
            }

            if (badge) {
                badge.textContent = evolucao.name;
                if (evolucao.id === pokemon.id) {
                    badge.className = 'badge rounded-pill bg-info text-dark';
                } else {
                    badge.className = 'badge rounded-pill bg-secondary text-white';
                }
            }
        }
    });
    },

    renderizarFraquezasEFortalezas(pokemon) {
        const fraquezasPorTipo = {
            'Grass': ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
            'Poison': ['Ground', 'Psychic'],
            'Fire': ['Water', 'Ground', 'Rock'],
            'Water': ['Electric', 'Grass'],
            'Electric': ['Ground'],
            'Bug': ['Fire', 'Flying', 'Rock'],
            'Flying': ['Electric', 'Ice', 'Rock'],
            'Normal': ['Fighting'],
            'Psychic': ['Bug', 'Ghost', 'Dark'],
            'Ghost': ['Ghost', 'Dark'],
            'Ground': ['Water', 'Grass', 'Ice'],
            'Rock': ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'],
            'Dark': ['Fighting', 'Bug', 'Fairy'],
            'Steel': ['Fire', 'Water', 'Ground'],
            'Fairy': ['Poison', 'Steel']
        };

        const fortalezasPorTipo = {
            'Grass': ['Water', 'Ground', 'Rock'],
            'Poison': ['Grass', 'Bug', 'Fairy'],
            'Fire': ['Grass', 'Ice', 'Bug', 'Steel'],
            'Water': ['Fire', 'Ground', 'Rock'],
            'Electric': ['Water', 'Flying'],
            'Bug': ['Grass', 'Psychic', 'Dark'],
            'Flying': ['Grass', 'Fighting', 'Bug'],
            'Normal': [],
            'Psychic': ['Fighting', 'Poison'],
            'Ghost': ['Ghost', 'Psychic'],
            'Ground': ['Poison', 'Rock'],
            'Rock': ['Fire', 'Ice', 'Flying', 'Bug'],
            'Dark': ['Ghost', 'Dark'],
            'Steel': ['Rock', 'Ice', 'Fairy'],
            'Fairy': ['Fighting', 'Bug', 'Dark']
        };

        const mapaCorTipo = {
            'Fire': '#f08030',
            'Water': '#6890f0',
            'Grass': '#78c850',
            'Electric': '#f8d030',
            'Ice': '#98d8d8',
            'Fighting': '#c03028',
            'Poison': '#a040a0',
            'Ground': '#e0c068',
            'Flying': '#a890f0',
            'Psychic': '#f85888',
            'Bug': '#a8b820',
            'Rock': '#b8a038',
            'Ghost': '#705898',
            'Dragon': '#7038f8',
            'Dark': '#705848',
            'Steel': '#b8b8d0',
            'Fairy': '#ee99ac'
        };

        const containerFraquezas = document.querySelector('[data-fraquezas]');
        containerFraquezas.innerHTML = '';
        const fraquezas = new Set();
        pokemon.type.forEach(tipo => {
            fraquezasPorTipo[tipo]?.forEach(fraqueza => fraquezas.add(fraqueza));
        });
         [...fraquezas].sort().forEach(fraqueza => {
            const span = document.createElement('span');
            span.className = 'badge type-badge';
            span.style.background = mapaCorTipo[fraqueza] || '#0088dd';
            span.textContent = fraqueza;
            containerFraquezas.appendChild(span);
        });

        const containerFortalezas = document.querySelector('[data-fortalezas]');
        containerFortalezas.innerHTML = '';
        const fortalezas = new Set();
        pokemon.type.forEach(tipo => {
            fortalezasPorTipo[tipo]?.forEach(fortaleza => fortalezas.add(fortaleza));
        });
        [...fortalezas].sort().forEach(fortaleza => {
            const span = document.createElement('span');
            span.className = 'badge type-badge';
            span.style.background = mapaCorTipo[fortaleza] || '#0088dd';
            span.textContent = fortaleza;
            containerFortalezas.appendChild(span);
        });
    }
};


const GerenciadorFavoritos = {
    obterFavoritos() {
        const fav = localStorage.getItem('pokemon_favoritos');
        return fav ? JSON.parse(fav) : [];
    },

    adicionarFavorito(id) {
        const favoritos = this.obterFavoritos();
        if (!favoritos.includes(id)) {
            favoritos.push(id);
            localStorage.setItem('pokemon_favoritos', JSON.stringify(favoritos));
        }
    },

    removerFavorito(id) {
        const favoritos = this.obterFavoritos();
        const filtrado = favoritos.filter(fav => fav !== id);
        localStorage.setItem('pokemon_favoritos', JSON.stringify(filtrado));
    },

    ehFavorito(id) {
        return this.obterFavoritos().includes(id);
    }
};

function configurarBotaoFavoritar(idPokemon) {
    const botaoFavoritar = document.querySelector('[data-favorite-btn]');

    if (GerenciadorFavoritos.ehFavorito(idPokemon)) {
        botaoFavoritar.classList.add('ativo');
        botaoFavoritar.innerHTML = '<i class="fas fa-star me-2"></i>Desfavoritar';
    }

    botaoFavoritar.addEventListener('click', () => {
        if (GerenciadorFavoritos.ehFavorito(idPokemon)) {
            GerenciadorFavoritos.removerFavorito(idPokemon);
            botaoFavoritar.classList.remove('ativo');
            botaoFavoritar.innerHTML = '<i class="fas fa-star me-2"></i>Favoritar';
        } else {
            GerenciadorFavoritos.adicionarFavorito(idPokemon);
            botaoFavoritar.classList.add('ativo');
            botaoFavoritar.innerHTML = '<i class="fas fa-star me-2"></i>Desfavoritar';
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idPokemon = parseInt(parametrosUrl.get('id')) || 1;

    const pokemon = await GerenciadorPokemon.carregarPokemon(idPokemon);

    if (pokemon) {
        Renderizador.renderizarInfoBasica(pokemon);
        Renderizador.renderizarTipos(pokemon);
        Renderizador.renderizarEstatisticas(pokemon);
        Renderizador.renderizarLinhaEvolutiva(pokemon);
        Renderizador.renderizarFraquezasEFortalezas(pokemon);
        configurarBotaoFavoritar(idPokemon);
    } else {
        console.error('Pokémon não encontrado');
    }
});