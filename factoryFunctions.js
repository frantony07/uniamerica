function buttonByCategory(color , text) {
    let newButton = document.createElement('button');

    newButton.style.backgroundColor = ` ${color} `;
    newButton.style.padding = '10px 20px';
    newButton.style.borderRadius = '20px';
    newButton.style.cursor = 'pointer';
    newButton.style.color = 'while';

    newButton.style.select.border = '3px solid #00FFFF';
    newButton.style.select.boxShadow = '0 0 6px #17ef9cdd' ;
    newButton.style.select.color = 'while';

    newButton.textContent = `${text}`;
   
}