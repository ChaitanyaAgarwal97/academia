let createClassModal = document.getElementById("createClassModal");

let joinClassModal = document.getElementById("joinClassModal");

let joinClassBtns = document.getElementsByClassName("joinClass");

// Get the button that opens the modal
let createClassBtns = document.getElementsByClassName("createClass");

// Get the <span> element that closes the modal
let closeBtn = document.getElementsByClassName("close");

let modals = document.getElementsByClassName("modal");

// When the user clicks the button, open the modal 
Array.from(createClassBtns).forEach(ele => {
     ele.onclick = function() {
      joinClassModal.style.display = "none";
      createClassModal.style.display = "block";
    }
});

Array.from(joinClassBtns).forEach(ele => {
  ele.onclick = function() {
    createClassModal.style.display = "none";
    joinClassModal.style.display = "block";
 }
});

// When the user clicks on <span> (x), close the modal
Array.from(closeBtn).forEach(ele => {
  ele.onclick = function(event) {
    Array.from(modals).forEach(modal => {
      modal.style.display = "none";
    });
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == createClassModal || event.target == joinClassModal) {
    event.target.style.display = "none";
  }
}