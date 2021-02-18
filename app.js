const bodyNode = document.body;
const navigationNode = document.querySelector("#navigation");

const currentTasksNode = document.querySelector("#currentTasks");
const completedTasksNode = document.querySelector("#completedTasks");

const toDoNode = document.querySelector("#toDo");
const completedNode = document.querySelector("#completed");

const spanToDoNode = document.createElement("span");
const spanCompletedNode = spanToDoNode.cloneNode();
toDoNode.appendChild(spanToDoNode);
completedNode.appendChild(spanCompletedNode);

const exampleModalNode = document.querySelector("#exampleModal");
const exampleModalContentNode = document.querySelector("#exampleModalContent");

const formNode = document.querySelector("#modalForm");
const inputTitleNode = document.querySelector("#inputTitle");
const inputTextNode = document.querySelector("#inputText");
const lowPriorityNode = document.querySelector("#Low");
const mediumPriorityNode = document.querySelector("#Medium");
const highPriorityNode = document.querySelector("#High");
const divBtnModalNode = document.querySelector("#divBtnModal");

const btnSortDesc = document.querySelector("#btnSortDesc");
const btnSortInc = document.querySelector("#btnSortInc");
const btnChangeTheme = document.querySelector("#btnChangeTheme");

let array = JSON.parse(localStorage.getItem("tasks")) || [];
let isLight = JSON.parse(localStorage.getItem("theme")) || true;

if (localStorage.getItem("tasks")) {
  array.map((item) => createTask(item));
  lightTheme();
} else {
  darkTheme();
}

if (localStorage.getItem("theme") === "true" || localStorage.length === 0) {
  lightTheme();
} else {
  isLight = false;
  darkTheme();
}

function appendZero(n) {
  return n < 10 ? `0${n}` : n;
}

function changeTheme() {
  isLight = !isLight;
  isLight ? lightTheme() : darkTheme();
  localStorage.setItem("theme", JSON.stringify(isLight));
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

function completeTask(e) {
  if (e.target.classList.contains("btn-success")) {
    for (let prop of e.currentTarget.children) {
      let btnInfoNode = prop.querySelector(".btn-info");
      if (prop.dataset.task === e.target.dataset.task) {
        let idIndex = array
          .map((item) => item.id)
          .indexOf(Number(prop.dataset.task));

        array[idIndex].isComplete = true;

        e.target.remove(prop);
        btnInfoNode.remove(prop);

        localStorage.setItem("tasks", JSON.stringify(array));

        completedTasksNode.append(prop);

        countTasks();
      }
    }
  }
}

function countTasks() {
  const arraySpanToDoNode = array.filter((item) => item.isComplete === false);
  const arraySpanCompletedNode = array.filter(
    (item) => item.isComplete === true
  );
  spanToDoNode.textContent = arraySpanToDoNode.length;
  spanCompletedNode.textContent = arraySpanCompletedNode.length;
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

  if (task.isComplete === false) {
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
  } else {
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
                                    <button data-task=${task.id} type="button" class="btn btn-danger w-100">Delete</button>
                                </div>
                            </div>`;

    completedTasksNode.append(taskNode);
  }

  countTasks();

  return taskNode;
}

function darkTheme() {
  bodyNode.style.cssText = `background-color: #0F1A20; color: #c5cddb`;
  exampleModalContentNode.style.cssText = `background-color: #0F1A20; color: #c5cddb`;
  btnChangeTheme.textContent = "LIGHT THEME";
  btnChangeTheme.classList.add("btn-light");
  btnChangeTheme.classList.remove("btn-dark");
  navigationNode.classList.remove("bg-light");
  navigationNode.classList.add("bg-dark");
}

function openEditTask(task, id) {
  bodyNode.classList.add("modal-open");
  exampleModalNode.classList.add("show");
  exampleModalNode.style.cssText = `aria-modal="true"; padding-right: 16px; display: block`;
  exampleModalContentNode.setAttribute("data-task", id);
  inputTitleNode.value = task.title;
  inputTitleNode.setAttribute("data-task", id);
  inputTextNode.value = task.text;
  inputTextNode.setAttribute("data-task", id);

  let namePriorityNode = document.querySelectorAll("input[name=gridRadios]");

  for (let name of namePriorityNode) {
    name.setAttribute("data-task", id);
    if (name.value === task.priority) {
      name.checked = true;
    }
  }
}

function closeEditTask(modalBackDrop) {
  bodyNode.classList.remove("modal-open");
  exampleModalNode.classList.remove("show");
  exampleModalNode.style.cssText = `aria-hidden="true"; display: none`;

  modalBackDrop.classList.remove("modal-backdrop");
  modalBackDrop.classList.remove("fade");
  modalBackDrop.classList.remove("show");
}

function editTask(e) {
  if (e.target.classList.contains("btn-info")) {
    for (let prop of e.currentTarget.children) {
      if (prop.dataset.task === e.target.dataset.task) {
        let idIndex = array
          .map((item) => item.id)
          .indexOf(Number(prop.dataset.task));

        openEditTask(array[idIndex], Number(prop.dataset.task));

        let modalBackDropNode = document.createElement("div");
        modalBackDropNode.classList.add("modal-backdrop");
        modalBackDropNode.classList.add("fade");
        modalBackDropNode.classList.add("show");
        bodyNode.append(modalBackDropNode);

        let btnSaveNode = exampleModalNode.querySelector(".btn-primary");
        btnSaveNode.textContent = "Save task";
        btnSaveNode.setAttribute("data-task", prop.dataset.task);

        btnSaveNode.addEventListener("click", (e) => {
          if (e.target.dataset.task === prop.dataset.task) {
          }

          btnSaveNode.textContent = "Add task";
          closeEditTask(modalBackDropNode);
        });

        localStorage.setItem("tasks", JSON.stringify(array));
      }
    }
  }
}

function handleSort(e) {
  if (e.currentTarget === btnSortInc) {
    sortInc();
  }

  if (e.currentTarget === btnSortDesc) {
    sortDesc();
  }

  let liArrayNode = document.querySelectorAll("li");
  let ulArrayNode = document.querySelectorAll("ul");

  for (let i = 0; i < ulArrayNode.length; i++) {
    for (let j = 0; j < liArrayNode.length; j++) {
      liArrayNode[j].remove(ulArrayNode[i]);
    }
  }

  array.map((item) => createTask(item));

  localStorage.setItem("tasks", JSON.stringify(array));
}

function lightTheme() {
  bodyNode.style.cssText = `background-color: #fff; color: #3D3D3D`;
  exampleModalContentNode.style.cssText = `background-color: #fff; color: #3D3D3D`;
  btnChangeTheme.textContent = "DARK THEME";
  btnChangeTheme.classList.remove("btn-light");
  btnChangeTheme.classList.add("btn-dark");
  navigationNode.classList.remove("bg-dark");
  navigationNode.classList.add("bg-light");
}

function parseDate(date) {
  let arrDate = Array.from(date.replace(/\D/g, ""));

  let year = arrDate.slice(-4).join("");
  let month = arrDate.slice(-6, -4).join("");
  let day = arrDate.slice(-8, -6).join("");
  let hour = arrDate.slice(0, 2).join("");
  let min = arrDate.slice(2, 4).join("");

  return Date.parse(`${year}-${month}-${day}T${hour}:${min}:00`);
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

          countTasks();
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

function sortDesc() {
  array.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

function sortInc() {
  array.sort((a, b) => parseDate(a.date) - parseDate(b.date));
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
    isComplete: false,
  };

  array.push(task);

  localStorage.setItem("tasks", JSON.stringify(array));

  createTask(task);

  resetForm(formNode);
}

formNode.addEventListener("submit", submitForm);

currentTasksNode.addEventListener("click", removeTask);
completedTasksNode.addEventListener("click", removeTask);

// currentTasksNode.addEventListener("click", editTask);

currentTasksNode.addEventListener("click", completeTask);

btnSortInc.addEventListener("click", handleSort);
btnSortDesc.addEventListener("click", handleSort);
btnChangeTheme.addEventListener("click", changeTheme);

console.log(array);
