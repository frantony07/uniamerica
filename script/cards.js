const API_KEY = '8cfbc0eb-de3d-486e-95e6-33e14b3dce8b';
const API_BASE_URL = 'https://api.pokemontcg.io/v2/cards';

function createPokemonCard(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    const header = document.createElement('div');
    header.className = 'card-header';

    const title = document.createElement('h5');
    title.id = 'card-title';
    title.textContent = card.name;

    header.appendChild(title);
    cardElement.appendChild(header);

    const body = document.createElement('div');
    body.className = 'card-body';

    const img = document.createElement('img');
    img.src = card.images.small;
    img.alt = card.name;
    body.appendChild(img);

    if (card.types && card.types.length > 0) {
        const typeText = document.createElement('p');
        typeText.className = 'card-text';
        typeText.textContent = `Tipo: ${card.types.join(', ')}`;
        body.appendChild(typeText);
    }

    if (card.hp) {
        const hpText = document.createElement('p');
        hpText.className = 'card-text';
        hpText.textContent = `HP: ${card.hp}`;
        body.appendChild(hpText);
    }

    if (card.rarity) {
        const rarityText = document.createElement('p');
        rarityText.className = 'card-text';
        rarityText.textContent = `Raridade: ${card.rarity}`;
        body.appendChild(rarityText);
    }

    if (card.set && card.set.name) {
        const setText = document.createElement('p');
        setText.className = 'card-text';
        setText.textContent = `Set: ${card.set.name}`;
        body.appendChild(setText);
    }

    cardElement.appendChild(body);

    return cardElement;
}

async function fetchCards(searchQuery = '') {
    let url = API_BASE_URL;

    if (searchQuery) {
        url += `?q=name:${encodeURIComponent(searchQuery)}*`;
    } else {
        url += '?pageSize=20';
    }

    console.log('Fetching from:', url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY,
                'Accept': 'application/json',
            }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Data received:', data);
        return data;
    } catch (error) {
        console.error('Fetch error details:', error);
        throw error;
    }
}

async function loadPokemonCards(searchQuery = '') {
    const container = document.getElementById('cards-container');

    if (!container) {
        console.error('Container de cards não encontrado!');
        return;
    }

    container.innerHTML = '<p style="color: white; text-align: center;">Carregando cartas...</p>';

    try {
        const data = await fetchCards(searchQuery);

        container.innerHTML = '';

        if (data.data.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center;">Nenhuma carta encontrada.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        data.data.forEach(card => {
            const cardElement = createPokemonCard(card);
            fragment.appendChild(cardElement);
        });

        container.appendChild(fragment);

        console.log(`${data.data.length} cartas carregadas com sucesso!`);
    } catch (error) {
        console.error('Erro ao carregar as cartas da API:', error);
        if (container) {
            container.innerHTML = '<p style="color: white; text-align: center;">Erro ao carregar as cartas. Verifique sua conexão com a internet.</p>';
        }
    }
}

function setupSearch() {
    const searchInput = document.getElementById('pokemon-search');
    const searchButton = document.getElementById('search-button');

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            loadPokemonCards(query);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                loadPokemonCards(query);
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupSearch();
        loadPokemonCards();
    });
} else {
    setupSearch();
    loadPokemonCards();
}