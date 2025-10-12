const tipe = document.querySelectorAll(".Home , .category , .cardPokemon , .mapPokemon , .favorite , .user");
tipe.forEach(button =>{
    button.addEventListener("click",()=>{
        tipe.forEach(b=>b.classList.remove("selected"));
        button.classList.add("selected")

        if(button.classList.contains("Home"))  ;
        if(button.classList.contains("category"))  category();
        if(button.classList.contains("cardPokemon")) ;
        if(button.classList.contains("mapPokemon")) ;
        if(button.classList.contains("favorite")) ;
        if(button.classList.contains("user")) ;
    })
})
function category(){
    let categoryDiv =document.getElementsByClassName('contains')[0];
    let buttonFire = document.createElement('button');

    buttonFire.style.backgroundColor = 'red';
    buttonFire.style.padding = '10px 20px';
    buttonFire.style.borderRadius= '20px';

    buttonFire.textContent = 'Fire';

    if (categoryDiv) {
        categoryDiv.appendChild(buttonFire);
    }
}

