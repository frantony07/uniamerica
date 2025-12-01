const CarregadorPokemon = (() => {
    const URL_BASE = "https://pokeapi.co/api/v2";

    async function carregarCadeiaEvolucao(url) {
        const resposta = await fetch(url);
        return resposta.json();
    }

    async function carregarEspecie(url) {
        const resposta = await fetch(url);
        return resposta.json();
    }

    async function carregarPokemonCompleto(id) {
        try {
            const respostaPokemon = await fetch(`${URL_BASE}/pokemon/${id}`);
            const pokemon = await respostaPokemon.json();

            const especie = await carregarEspecie(pokemon.species.url);
            const cadeiaEvolucao = await carregarCadeiaEvolucao(especie.evolution_chain.url);

            return {
                ...pokemon,
                cadeiaEvolucao,
                especie
            };
        } catch (erro) {
            console.error("Erro ao carregar Pokémon:", erro);
            return null;
        }
    }

    return {
        carregar: carregarPokemonCompleto
    };
})();


const RenderizadorPokemon = {
    corsPorTipo: {
    "grass": "bg-success",
    "poison": "bg-danger",
    "fire": "bg-danger",
    "water": "bg-info",
    "electric": "bg-warning",
    "bug": "bg-success",
    "flying": "bg-primary",
    "normal": "bg-secondary",
    "ground": "bg-warning",
    "psychic": "bg-danger",
    "rock": "bg-secondary",
    "ice": "bg-info",
    "dragon": "bg-primary",
    "dark": "bg-dark",
    "steel": "bg-secondary",
    "fairy": "bg-pink"
    },

    renderizarInfoBasica(pokemon) {
        document.querySelector('[data-id-pokemon]').textContent = 
            String(pokemon.id).padStart(3, '0');

        document.querySelector('[data-nome-pokemon]').textContent = 
            pokemon.forms[0].name;

        document.querySelector('[data-imagem-pokemon]').src = 
            pokemon.sprites.front_default;

        const tipos = pokemon.types.map(t => t.type.name);
        const descricaoTipos = tipos.join(" e ");

        document.querySelector('[data-descricao-pokemon]').textContent = 
            `Um Pokémon do tipo ${descricaoTipos} com características únicas.`;
    },

    renderizarTipos(pokemon) {
        const container = document.querySelector('[data-tipos-pokemon]');
        container.innerHTML = "";

        pokemon.types.forEach(obj => {
            const nomeTipo = obj.type.name;
            const classCor = this.corsPorTipo[nomeTipo] || "bg-secondary";

            const badge = document.createElement("span");
            badge.className = `badge rounded-pill text-white me-2 ${classCor}`;
            badge.textContent = nomeTipo;

            container.appendChild(badge);
        });
    },

    renderizarEstatisticas(pokemon) {
        const estatisticas = {};
        pokemon.stats.forEach(stat => {
            estatisticas[stat.stat.name] = stat.base_stat;
        });

        Object.entries(estatisticas).forEach(([nomeEstat, valor]) => {
            const elemento = document.querySelector(`[data-estatistica="${nomeEstat}"]`);
            if (!elemento) return;

            const campoValor = elemento.querySelector('.stat-value');
            const barraProgresso = elemento.querySelector('.stat-bar');

            if (campoValor) campoValor.textContent = valor;

            if (barraProgresso) {
                const percentual = Math.min(100, (valor / 150) * 100);
                barraProgresso.style.width = `${percentual}%`;
            }
        });
    },

    renderizarLinhaEvolutiva(pokemon) {
        const cadeia = pokemon.cadeiaEvolucao.chain;
        const nomesPokemon = [];

        const percorrerCadeia = (no) => {
            nomesPokemon.push(no.species.name);
            if (no.evolves_to.length > 0) {
                percorrerCadeia(no.evolves_to[0]);
            }
        };

        percorrerCadeia(cadeia);

        nomesPokemon.forEach((nome, indice) => {
            const container = document.querySelector(`[data-indice-evolucao="${indice}"]`);
            if (!container) return;

            fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
                .then(r => r.json())
                .then(pokemon => {
                    const imagem = container.querySelector(".evolution-circle");
                    const badge = container.querySelector("[data-badge-evolucao]");

                    imagem.src = pokemon.sprites.front_default;
                    badge.textContent = pokemon.name;
                });
        });
    },

    async renderizarFraquezasEFortalezas(pokemon) {
        const tiposAtivos = pokemon.types.map(t => t.type.name);

        const fraquezas = new Set();
        const fortalezas = new Set();

        for (const tipo of tiposAtivos) {
            const resposta = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
            const dados = await resposta.json();

            dados.damage_relations.double_damage_from.forEach(t => fraquezas.add(t.name));

            dados.damage_relations.double_damage_to.forEach(t => fortalezas.add(t.name));
        }

        const coresTipo = {
            "fire": "#f08030",
            "water": "#6890f0",
            "grass": "#78c850",
            "electric": "#f8d030",
            "ice": "#98d8d8",
            "fighting": "#c03028",
            "poison": "#a040a0",
            "ground": "#e0c068",
            "flying": "#a890f0",
            "psychic": "#f85888",
            "bug": "#a8b820",
            "rock": "#b8a038",
            "ghost": "#705898",
            "dragon": "#7038f8",
            "dark": "#705848",
            "steel": "#b8b8d0",
            "fairy": "#ee99ac"
        };

        this._renderizarBadges("[data-fraquezas]", fraquezas, coresTipo);
        this._renderizarBadges("[data-fortalezas]", fortalezas, coresTipo);
    },

    _renderizarBadges(seletor, conjunto, cores) {
        const container = document.querySelector(seletor);
        container.innerHTML = "";

        [...conjunto].forEach(nome => {
            const badge = document.createElement("span");
            badge.className = "badge type-badge";
            badge.style.background = cores[nome] || "#888";
            badge.textContent = nome;
            container.appendChild(badge);
        });
    }
};


const GerenciadorFavoritos = (() => {
    const CHAVE_STORAGE = "pokemon_favoritos";

    function obterTodos() {
        const dados = localStorage.getItem(CHAVE_STORAGE);
        return dados ? JSON.parse(dados) : [];
    }

    function salvar(lista) {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
    }

    function adicionar(id) {
        const lista = obterTodos();
        if (!lista.includes(id)) {
            lista.push(id);
            salvar(lista);
        }
    }

    function remover(id) {
        const lista = obterTodos().filter(favorito => favorito !== id);
        salvar(lista);
    }

    function contem(id) {
        return obterTodos().includes(id);
    }

    function alternar(id) {
        if (contem(id)) {
            remover(id);
            return false;
        } else {
            adicionar(id);
            return true;
        }
    }

    return {
        obterTodos,
        adicionar,
        remover,
        contem,
        alternar
    };
})();


function configurarBotaoFavoritar(idPokemon) {
    const botao = document.querySelector("[data-favorite-btn]");

    function atualizarBotao(ativado) {
        if (ativado) {
            botao.classList.add("ativo");
            botao.innerHTML = '<i class="fas fa-star me-2"></i>Desfavoritar';
        } else {
            botao.classList.remove("ativo");
            botao.innerHTML = '<i class="fas fa-star me-2"></i>Favoritar';
        }
    }

    atualizarBotao(GerenciadorFavoritos.contem(idPokemon));

    botao.addEventListener("click", () => {
        const agora_ativado = GerenciadorFavoritos.alternar(idPokemon);
        atualizarBotao(agora_ativado);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const parametros = new URLSearchParams(window.location.search);
    const idPokemon = parseInt(parametros.get("id"));

    const pokemon = await CarregadorPokemon.carregar(idPokemon);

    RenderizadorPokemon.renderizarInfoBasica(pokemon);
    RenderizadorPokemon.renderizarTipos(pokemon);
    RenderizadorPokemon.renderizarEstatisticas(pokemon);
    RenderizadorPokemon.renderizarLinhaEvolutiva(pokemon);
    RenderizadorPokemon.renderizarFraquezasEFortalezas(pokemon);

    configurarBotaoFavoritar(idPokemon);
});