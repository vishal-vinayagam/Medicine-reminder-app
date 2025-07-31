function addReminder() {
  const name = document.getElementById("medicineName").value;
  const time = document.getElementById("medicineTime").value;

  if (!name || !time) {
    alert("Please fill in both fields.");
    return;
  }

  const reminderList = document.getElementById("reminderList");
  const listItem = document.createElement("li");

  const now = new Date();
  const medTime = new Date(now.toDateString() + ' ' + time);

  listItem.innerHTML = `
    <span>${name} at ${time}</span>
    <button onclick="markAsTaken(this)">Taken</button>
  `;

  reminderList.appendChild(listItem);

  // Save to localStorage
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.push({ name, time });
  localStorage.setItem("reminders", JSON.stringify(reminders));

  document.getElementById("medicineName").value = "";
  document.getElementById("medicineTime").value = "";
}

function markAsTaken(button) {
  button.parentElement.style.textDecoration = "line-through";
  button.disabled = true;
  button.innerText = "Taken ✔";
}

// Load saved reminders
window.onload = function () {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  for (let reminder of reminders) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${reminder.name} at ${reminder.time}</span>
      <button onclick="markAsTaken(this)">Taken</button>
    `;
    document.getElementById("reminderList").appendChild(listItem);
  }
};
