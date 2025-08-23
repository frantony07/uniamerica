let selectedCategory="";
const tipe=document.querySelectorAll(".fire,.water,.rain,.plant");
tipe.forEach(button=>{ 
    button.addEventListener("click",()=>{
        tipe.forEach(b=>b.classList.remove("selected"));
        button.classList.add("selected")

        if(button.classList.contains("fire")) selectedCategory="fire";
        if(button.classList.contains("water")) selectedCategory="water";
        if(button.classList.contains("rain")) selectedCategory="electric";
        if(button.classList.contains("plant")) selectedCategory="grass";
        
    });
});

async function searchCategory(){
    if(!selectedCategory){
        alert("nenhuma categoria selecionada ");
        return;
    }
    const url = `https://pokeapi.co/api/v2/type/${selectedCategory}`;
    try{
        const answer=await fetch(url);
        const date=await answer.json();
        const listPokemon=date.pokemon.map(p=>p.pokemon);
        const primary10=listPokemon.slice(0,10);

        const div =document.getElementById("result");
        div.innerHTML= `<h3>Pokémon tipo ${selectedCategory.toUpperCase()}</h3>`;
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.gap = "10px";

        for(let p of primary10){
             const res = await fetch(p.url);
            const info = await res.json();

            const card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.borderRadius = "8px";
            card.style.padding = "10px";
            card.style.textAlign = "center";
            card.style.width = "120px";
            card.style.backgroundColor = "#f0f0f0";

            card.innerHTML = `
                <img src="${info.sprites.front_default}" alt="${info.name}">
                <p>${info.name.toUpperCase()}</p>
            `;

            container.appendChild(card);
        }
        div.appendChild(container)

    }catch(error){
        console.error("erro na obtençao doa dados pokemon")
        alert("erro na obtençao doa dados pokemon")

    }

}