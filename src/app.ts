import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');



window.onload = getTasks;


document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  insertTask();
});

function getTasks() {
  if (localStorage.getItem("tasks") == null) return;

 
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

 
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="finshedTask(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="changeTask(this)">
          <i class="fa fa-trash" onclick="deleteTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function insertTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");

  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }

  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }

 
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="finshedTask(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="changeTask(this)">
      <i class="fa fa-trash" onclick="deleteTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  
  task.value = "";
}

function finshedTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function deleteTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}


let currentTask = null;


function getCurrentTask(event) {
  currentTask = event.value;
}


function changeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
 
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
 
  localStorage.setItem("tasks", JSON.stringify(tasks));
}