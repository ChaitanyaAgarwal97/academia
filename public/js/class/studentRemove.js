const studentRemoveBtns = document.getElementsByClassName("remove-student");

Array.from(studentRemoveBtns).forEach((btn) => {
  btn.addEventListener("click", removeStudent);
});

async function removeStudent(e) {
  try {
    const [classId, studentId] = e.target.id.split("-");
    const data = { classId: classId, studentId: studentId };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let response = await fetch("/class/remove-student", options);
    response = await response.json();

    if (response.isDeleted) {
      return window.location.reload();
    }

    throw "";
  } catch (error) {
    const studentErrorAlert = document.getElementById("student-error-alert");
    const studentErrorAlertSpan = document.querySelector(
      "#student-error-alert span"
    );
    studentErrorAlertSpan.innerHTML = "Something went wrong";
    studentErrorAlert.style.display = "block";
  }
}
