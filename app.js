const currentTasksNode = document.querySelector("#currentTasks");
const completedTasksNode = document.querySelector("#completedTasks");

const formNode = document.querySelector("#modalForm");
const inputTitleNode = document.querySelector("#inputTitle");
const inputTextNode = document.querySelector("#inputText");
const lowPriorityNode = document.querySelector("#Low");
const mediumPriorityNode = document.querySelector("#Medium");
const highPriorityNode = document.querySelector("#High");

const btnSortDesc = document.querySelector("#btnSortDesc");
const btnSortInc = document.querySelector("#btnSortInc");

let array = [];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => createTask(task));
}

function appendZero(n) {
  return n < 10 ? `0${n}` : n;
}

function checkPriority() {
  if (lowPriorityNode.checked) {
    return lowPriorityNode.value;
  } else if (mediumPriorityNode.checked) {
    return mediumPriorityNode.value;
  } else {
    return highPriorityNode.value;
  }
}

function createDate() {
  let date = new Date();

  let hour = date.getHours();
  let min = date.getMinutes();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${appendZero(hour)}:${appendZero(min)} ${appendZero(
    day
  )}.${appendZero(month)}.${year}`;
}

function createId() {
  return new Date().getTime();
}

function createRandomColor() {
  return `hsla(${Math.random() * 360}, 100%, 50%, 0.6)`;
}

function createTask(task) {
  let taskNode = document.createElement("li");
  taskNode.setAttribute("data-task", task.id);
  taskNode.className = "list-group-item d-flex w-100 mb-2";
  taskNode.style.backgroundColor = task.color;

  taskNode.innerHTML = `<div class="w-100 mr-2">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 id="currentTasks__title" class="mb-1">${task.title}</h5>
                                <div>
                                    <small class="mr-2">${task.priority} priority</small>
                                    <small id="currentTasks__Date">${task.date}</small>
                                </div>

                            </div>
                            <p id="currentTasks__text" class="mb-1 w-100">${task.text}</p>
                        </div>
                            <div class="dropdown m-2 dropleft">
                                <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                                    <button data-task=${task.id} type="button" class="btn btn-success w-100">Complete</button>
                                    <button data-task=${task.id} type="button" class="btn btn-info w-100 my-2">Edit</button>
                                    <button data-task=${task.id} type="button" class="btn btn-danger w-100">Delete</button>
                                </div>
                            </div>`;

  currentTasksNode.append(taskNode);

  return taskNode;
}

function submitForm(e) {
  e.preventDefault();

  let task = {
    id: createId(),
    title: inputTitleNode.value,
    priority: checkPriority(),
    date: createDate(),
    text: inputTextNode.value,
    color: createRandomColor(),
  };

  array.push(task);

  localStorage.setItem("tasks", JSON.stringify(array));

  createTask(task);

  resetForm(formNode);
}

function completeTask(e) {
  if (e.target.classList.contains("btn-success")) {
    for (let prop of e.currentTarget.children) {
      let titleNode = prop.querySelector("#currentTasks__title");
      let textNode = prop.querySelector("#currentTasks__text");
      if (prop.dataset.task === e.target.dataset.task) {
        titleNode.contentEditable = false;
        textNode.contentEditable = false;
        completedTasksNode.append(prop);
      }
    }
  }
}

function editTask(e) {
  if (e.target.classList.contains("btn-info")) {
    for (let prop of e.currentTarget.children) {
      let titleNode = prop.querySelector("#currentTasks__title");
      let textNode = prop.querySelector("#currentTasks__text");
      if (prop.dataset.task === e.target.dataset.task) {
        titleNode.contentEditable = true;
        textNode.contentEditable = true;
      }
    }
  }
}

function removeTask(e) {
  if (e.target.classList.contains("btn-danger")) {
    if (confirm("Are you sure?")) {
      for (let prop of e.currentTarget.children) {
        if (prop.dataset.task === e.target.dataset.task) {
          let idIndex = array
            .map((item) => item.id)
            .indexOf(Number(prop.dataset.task));
          array.splice(idIndex, 1);

          localStorage.setItem("tasks", JSON.stringify(array));

          e.currentTarget.removeChild(prop);
        }
      }
    }
  }
}

function resetForm(form) {
  form.reset();
  [...document.querySelectorAll('[type="text"]')].forEach((input) => {
    input.value = "";
  });
}

function sortArray() {
  array.sort((a, b) => {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);
    console.log(a.date);
    console.log(b.date);
    // return aDate - bDate;
  });
}

formNode.addEventListener("submit", submitForm);
currentTasksNode.addEventListener("click", removeTask);
completedTasksNode.addEventListener("click", removeTask);
currentTasksNode.addEventListener("click", editTask);
currentTasksNode.addEventListener("click", completeTask);

btnSortInc.addEventListener("click", sortArray);

console.log(array);
