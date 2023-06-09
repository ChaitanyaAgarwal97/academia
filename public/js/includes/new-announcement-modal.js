let createAnnouncementModal = document.getElementById("createAnnouncementModal");

let createAnnouncementBtn = document.getElementById("createAnnouncementBtn");

let closeBtn = document.getElementsByClassName("close");

let modals = document.getElementsByClassName("modal");

let rangeValue = document.getElementById("rangeValue");

let points = document.getElementById("points");


const pointsChangeHandler = event => {
  let value = event.target.value;
  
  rangeValue.textContent = value;
}

points.addEventListener("input", pointsChangeHandler);

createAnnouncementBtn.onclick = (event) => {
  createAnnouncementModal.style.display = "block";
};

window.onclick = (event) => {
  if (event.target == createAnnouncementModal)
    event.target.style.display = "none";
};

Array.from(closeBtn).forEach((ele) => {
  ele.onclick = function (event) {
    Array.from(modals).forEach((modal) => {
      modal.style.display = "none";
    });
  };
});
