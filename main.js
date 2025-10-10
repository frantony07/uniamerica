let selectedbutton = "" ;
const tipe = document.querySelectorAll(".Home, .category, .cardPokemon, .mapPokemon, .favorite, .user");
tipe.forEach(button =>{
    button.addEventListener("click",()=>{
        tipe.forEach(b=>b.classList.remove("selected"));
        button.classList.add("selected")

        if(button.classList.contains("Home"))  selectedbutton ="Home";
        if(button.classList.contains("category")) selectedbutton ="category";
        if(button.classList.contains("cardPokemon")) selectedbutton ="cardPokemon";
        if(button.classList.contains("mapPokemon")) selectedbutton ="mapPokemon";
        if(button.classList.contains("favorite")) selectedbutton ="favorite";
        if(button.classList.contains("user")) selectedbutton ="user";
    })
})

