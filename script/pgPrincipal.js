document.addEventListener('DOMContentLoaded', async () => {
    const campoBusca = document.getElementById('pokemonBuscado');
    const botaoBusca = document.getElementById('botaoBusca');
    const areaResultado = document.getElementById('procurarPokemon');
    const spinner = document.getElementById('spinner');

    let listaPokemons = [];
    try {
        const listaReq = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");//mudei para pegar da api
        const listaJson = await listaReq.json();
        listaPokemons = listaJson.results;
    } catch (e) {
        console.error("Erro ao carregar lista de Pokémons.");
    }

    function mostrarPokemon(id) {
        window.location.href = `/html/detalhes.html?id=${id}`;
    }

    botaoBusca.addEventListener('click', async () => {
        const termo = campoBusca.value.trim().toLowerCase();
        if (!termo) return;

        areaResultado.innerHTML = "";
        spinner.style.display = "inline-block";

        if (!isNaN(termo)) {
            try {
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);
                if (!resp.ok) throw new Error();
                const pokemon = await resp.json();
                spinner.style.display = "none";
                return mostrarPokemon(pokemon.id);
            } catch {
                spinner.style.display = "none";
                return areaResultado.innerHTML = "<p>Pokémon não encontrado</p>";
            }
        }

        const encontrado = listaPokemons.find(p =>
            p.name.startsWith(termo)//busca com as iniciais
        );

        if (!encontrado) {
            spinner.style.display = "none";
            return areaResultado.innerHTML = "<p>Pokémon não encontrado</p>";
        }

        try {
            const resp = await fetch(encontrado.url);
            const pokemon = await resp.json();
            spinner.style.display = "none";
            mostrarPokemon(pokemon.id);
        } catch {
            spinner.style.display = "none";
            areaResultado.innerHTML = "<p>Erro ao carregar Pokémon</p>";
        }
    });
});