let signUpTab = document.getElementById('signUpTab');
let logInTab = document.getElementById('logInTab');
let logInForm = document.getElementById('logInForm');
let signUpForm = document.getElementById('signUpForm');

logInForm.style.display = 'none';

signUpTab.addEventListener('click', ()=>{
    logInForm.style.display = 'none';
    signUpForm.style.display = '';
    logInTab.classList.add('logIn-unselected');
    signUpTab.classList.remove('signUp-unselected');
});

logInTab.addEventListener('click', ()=>{
    signUpForm.style.display = 'none';
    logInForm.style.display = '';
    signUpTab.classList.add('signUp-unselected');
    logInTab.classList.remove('logIn-unselected');
});