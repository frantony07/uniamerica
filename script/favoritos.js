  document.addEventListener('DOMContentLoaded', async () => {
    const btnCount = document.getElementById('btn-favoritos');
    const cardsContainer = document.getElementById('cards-container');
    const vazioBox = document.getElementById('vazio-box');
    const nenhumTitle = document.getElementById('nenhum-title');
    const nenhumDesc = document.getElementById('nenhum-desc');

    // Key used across the app for favorites
    const raw = localStorage.getItem('pokemon_favoritos');
    const favoritosIds = raw ? JSON.parse(raw) : [];

    btnCount.innerHTML = `<i class="fa-solid fa-heart"></i> ${favoritosIds.length} Pokémons Favoritos`;

    if (!favoritosIds || favoritosIds.length === 0) {
      // keep the empty state visible
      cardsContainer.style.display = 'none';
      vazioBox.style.display = 'flex';
      return;
    }

    // There are favorites — hide empty state elements
    cardsContainer.style.display = 'flex';
    vazioBox.style.display = 'none';
    nenhumTitle.style.display = 'none';
    nenhumDesc.style.display = 'none';

    try {
      const resp = await fetch('../pokemons.json');
      const all = await resp.json();

      // Map favorites IDs to pokemon objects, preserving order of favorites
      const favoritosPokemons = favoritosIds
        .map(id => all.find(p => Number(p.id) === Number(id)))
        .filter(Boolean);

      // Render cards
      cardsContainer.innerHTML = '';
      favoritosPokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'card p-2';
        card.style.width = '220px';
        card.innerHTML = `
          <div class="card-header bg-warning text-dark"><strong>${pokemon.name}</strong></div>
          <div class="card-body text-center">
            <img src="${pokemon.photo_url}" alt="${pokemon.name}" style="width:120px;height:120px;object-fit:contain;">
            <p class="card-text">Tipo: ${pokemon.type.join(', ')}</p>
            <p class="card-text">HP: ${pokemon.base_stats.hp}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <a href="./detalhes.html?id=${pokemon.id}" class="btn btn-sm btn-primary">Detalhes</a>
              <button class="btn btn-sm btn-outline-danger" data-remove-id="${pokemon.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;

        cardsContainer.appendChild(card);
      });

      // Attach remove handlers (remove from favorites and from DOM)
      cardsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-remove-id]');
        if (!btn) return;
        const id = Number(btn.getAttribute('data-remove-id'));
        // update localStorage
        const updated = favoritosIds.filter(fid => Number(fid) !== id);
        localStorage.setItem('pokemon_favoritos', JSON.stringify(updated));
        // update UI count
        btnCount.innerHTML = `<i class="fa-solid fa-heart"></i> ${updated.length} Pokémons Favoritos`;
        // remove card element
        const cardEl = btn.closest('.card');
        if (cardEl) cardEl.remove();
        if (updated.length === 0) {
          cardsContainer.style.display = 'none';
          vazioBox.style.display = 'flex';
          nenhumTitle.style.display = 'block';
          nenhumDesc.style.display = 'block';
        }
      });

    } catch (err) {
      console.error('Erro ao carregar pokemons.json', err);
      cardsContainer.innerHTML = '<p style="color: #333">Erro ao carregar pokémons.</p>';
    }
  });
