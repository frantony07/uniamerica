function handleDynamicButtonClick() {
    const groupButton = document.querySelectorAll('.category-button');

    groupButton.forEach(button => {
        button.classList.remove('selected');
    });
    this.classList.add('selected');
}
export function buttonByCategory(color , text) {
    let newButton = document.createElement('button');
    newButton.style.backgroundColor = color;
    newButton.style.padding = '10px 20px';
    newButton.style.borderRadius = '20px';
    newButton.style.cursor = 'pointer';
    newButton.style.color = 'white';
    newButton.textContent = text;

    newButton.classList.add('category-button');
    newButton.addEventListener('click', handleDynamicButtonClick); 
    
    const container = document.querySelector('.contains');
    if (container) {
        container.appendChild(newButton);
    }
    return newButton;
   
}
export function createtah(){
    
}