// UM SÓ DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('pokemonBuscado');
    const botaoBusca = document.getElementById('botaoBusca');
   

    botaoBusca.addEventListener('click', () => { 
        const searchedPokemon = campoBusca.value.trim()

    if (!searchedPokemon) {
        alert('Digite um nome ou ID de Pokémon.');
        return;
    }
    const isNumber = parseInt(searchedPokemon , 10);

        if (!isNaN(isNumber)){
            mostrarPokemonPorId(searchedPokemon)
        }else{
            mostrarPokemonPorNome(searchedPokemon)
        }
        
    });
});
function mostrarPokemonPorId(pokemon) {
    window.location.href = `/html/detalhes.html?id=${pokemon}`;
}

async function mostrarPokemonPorNome(searchPokemon){
    try {
        const nomeFormatado = String(searchPokemon).toLowerCase()
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeFormatado}/`);
        if(!resposta.ok){
            console.error('ocorreu um erro ' , resposta.status);
            alert('pokemon não encontrado, verifique o nome ');
            return;
        }
        const pokemon = await resposta.json();

        mostrarPokemonPorId(pokemon.id);
    } catch (error) {
        
        console.error('Erro no fetch/parse:', error);
        alert('Ocorreu um erro ao buscar o Pokémon.');

    }
}