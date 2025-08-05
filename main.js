 var allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
 function login() { 
    const usuaryHtml = document.getElementById('usuaryHtml');
    const usuary = usuaryHtml.value;
    const passwordHtml = document.getElementById('passwordHtml');
    const password = passwordHtml.value;
    console.log(typeof nameSchool);
    const user = allUsers.find(user => user.name === usuary && user.password === password);
        if (user){
            window.location.href = 'https://uniamerica.br/alunos/';
        }else {
            unfilled();
        }
}
function unfilled(){
    alert('invalid option');
}
function register() {
    const newUserName = document.getElementById('newUsuary.name');
    const nameUser = newUserName.value;
    const newUserPassword = document.getElementById('newUsuary.password');
    const passwordUser = newUserPassword.value;
    const newUserEmail = document.getElementById('newUsuary.email');
    const emailUser = newUserEmail.value;
    const newUserPhone = document.getElementById('newUsuary.phone');
    const phoneUser = newUserPhone.value;
    if (!nameUser || !passwordUser || !emailUser || !phoneUser) {
        unfilled();
        return;
    }
    const newUser ={
        name: nameUser,
        password: passwordUser,
        email: emailUser,
        phone: phoneUser
    }
    allUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    window.location.href = 'main.html';
    console.log(allUsers);
}






