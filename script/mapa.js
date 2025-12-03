const regionToGenerationId = {
    Kanto: 1,   
    Johto: 2,  
    Hoenn: 3,   
    Sinnoh: 4,  
    Unova: 5,   
    Kalos: 6,   
   
  };

  async function fetchJson(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
      const body = await resp.text();
      throw new Error(`HTTP ${resp.status}`);
    }
    return resp.json();
  }

  
  function extractIdFromUrl(url) {
    const parts = url.replace(/\/+$/, '').split('/');
    const idStr = parts[parts.length - 1];
    const id = Number(idStr);
    return id
  }

  function capitalize(s) {
    if (!s || typeof s !== 'string') return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }


   
  async function getPokemonSpeciesByGeneration(genId) {
    const data = await fetchJson(`https://pokeapi.co/api/v2/generation/${genId}/`);
    const species = (data.pokemon_species || [])
      .map(s => {
        const id = extractIdFromUrl(s.url);
        return { id, name: s.name, url: s.url };
      })
      .filter(sp => sp.id !== null)
      .sort((a, b) => a.id - b.id);
    return species;
  }

 
  function renderInfo(regionName, species) {
    const info = document.getElementById('info');
    if (!info) return;
    const count = Array.isArray(species) ? species.length : 0;

    
  info.innerHTML = `
    <h5>${regionName} — ${count} Pokémon</h5>
    ${
      count > 0
        ? `
          <div class="pokemon-list">
            ${species
              .map(
                sp => `
                  <button type="button" class="pokemon-btn" data-id="${sp.id}">
                    #${sp.id} ${capitalize(sp.name)}
                  </button>
                `
              )
              .join('')}
          </div>
        `
        : `<p>Nenhum Pokémon encontrado nesta região.</p>`
    }
  `;

  const listEl = info.querySelector('.pokemon-list');
    listEl.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.pokemon-btn');
      if (!btn) return; 
      const pokemonId = btn.dataset.id;
    
      window.location.href = `/html/detalhes.html?id=${pokemonId}`;
    });



  }

  
  document.addEventListener('DOMContentLoaded', () => {
    const pontos = document.querySelectorAll('.ponto');
    const info = document.getElementById('info');

    pontos.forEach(ponto => {
     
      ponto.setAttribute('tabindex', '0');
      ponto.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          ponto.click();
        }
      });

      ponto.addEventListener('click', async () => {
        const region = ponto.getAttribute('data-region');
        const genId = regionToGenerationId[region];

        if (!genId) {
          renderInfo(region || 'Região', []);
          return;
        }

        if (info) {
          info.innerHTML = `<p>Carregando ${region}...</p>`;
        }

        try {
          const species = await getPokemonSpeciesByGeneration(genId);
          renderInfo(region, species);
        } catch (e) {
          console.error(e);
          if (info) {
            info.innerHTML = `<p>Erro ao carregar ${region}.</p>`;
          }
        }
      });
    });
  });