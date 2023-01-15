let updateProfileModal = document.getElementById('updateProfileModal');

let updateProfileBtn = document.getElementById('updateProfileBtn');


updateProfileBtn.onclick = event => {
    updateProfileModal.style.display = 'block';
}

window.onclick = event => {
    if (event.target == updateProfileModal) event.target.style.display = "none";
}