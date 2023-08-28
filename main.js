let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let tasks = [];

if (window.localStorage.getItem("Tasks")) {
  tasks = JSON.parse(window.localStorage.getItem("Tasks"));
}

getTasksFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addToArray(input.value);
    input.value = "";
  }
}

function addToArray(value) {
  let task = {
    id: Date.now(),
    text: value,
    completed: false
  }

  tasks.push(task);
  addTasksToPage(tasks);
  addTasksToLocalStorage(tasks);
}

function addTasksToPage(tasks) {
  tasksDiv.innerHTML = "";
  tasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("id", task.id);
    div.textContent = task.text;

    let span = document.createElement("span");
    span.textContent = "Delete";

    div.appendChild(span);
    tasksDiv.appendChild(div);

    span.onclick = function () {
      deleteTasks(div.getAttribute("id"));
      div.remove();
    }

    div.onclick = function () {
      toggoleStatus(div.getAttribute("id"), div);
    }
  })
}

function addTasksToLocalStorage(tasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let data = window.localStorage.getItem("Tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

function deleteTasks(taskId) {
  tasks = tasks.filter((task) => taskId != task.id);
  addTasksToLocalStorage(tasks);
}

function toggoleStatus(taskId, div) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      if (tasks[i].completed === false) {
        tasks[i].completed = true;
        if (tasks[i].completed) {
          document.getElementById(`${div.getAttribute("id")}`).classList.add("done");
        }
      } else {
        tasks[i].completed = false;
        if (tasks[i].completed === false) {
          document.getElementById(`${div.getAttribute("id")}`).classList.remove("done");
        }
      }
    }
  }
  addTasksToLocalStorage(tasks);
}