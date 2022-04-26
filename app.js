// DEFINE UI vars
let taskForm = document.querySelector("#task-form");
let taskInput = document.querySelector("#task");
let taskList = document.querySelector(".collection");
let filterInput = document.querySelector("#filter");
let clearTasksBtn = document.querySelector("a.clear-tasks");

// DISPLAY items from local storage
// displayListItems();


// LOAD event listeners
loadEventListeners();

function loadEventListeners() {
  // this event is fired when the page is loaded for the first time
  document.addEventListener("DOMContentLoaded", displayListItems);
  taskForm.addEventListener("submit", addTask);
  taskList.addEventListener("click", delItem);
  filterInput.addEventListener("keyup", filterItems);
  clearTasksBtn.addEventListener("click", clearTasks);
}

// addTask ...Adds the task to the list
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Please enter a task before adding.");
    return;
  }

  let task = taskInput.value;
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null) {
    tasks = [];
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayListItems();
}

// Refrehes the task list display every time there's beeen a change to the list in the local storage
function displayListItems() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null || tasks === []) {
    return;
  }

  
  taskList.innerHTML = "";
  tasks.forEach(function (task) {
    let listItem = document.createElement("li");
    listItem.classList.add("collection-item");
    listItem.appendChild(document.createTextNode(task));

    let deleteItem = document.createElement("a");
    deleteItem.classList.add("delete-item");
    deleteItem.classList.add("secondary-content");
    deleteItem.setAttribute("href", "#");
    deleteItem.innerHTML = `<i class="fa fa-remove"></i>`;

    listItem.appendChild(deleteItem);

    taskList.appendChild(listItem);
  });
}

// delItem ... deletes the listItem
function delItem (e) {
  e.preventDefault();
  clickedItem = e.target.parentElement;
  if (clickedItem.classList.contains("delete-item")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let listItem = clickedItem.parentElement;

    // removing the specific listItem from storage
    tasks.splice(tasks.indexOf(listItem.textContent),1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // removing the specific listItem from display
    listItem.remove();
  }
}

// filterItems ...filter items in the list in live
function filterItems (e) {
  text = e.target.value.toLowerCase();
  if (text === "") {
    displayListItems();
  }
  document.querySelectorAll(".collection-item").forEach(function(task){
    if (!task.firstChild.textContent.toLowerCase().includes(text)) {
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  })
}

// clearTasks ...clears all the tasks from the storage and the display
function clearTasks(e) {
  localStorage.clear();
  taskList.innerHTML = "";
}