const bodyNode = document.body;
const navigationNode = document.getElementById("navigation");

const currentTasksNode = document.getElementById("currentTasks");
const completedTasksNode = document.getElementById("completedTasks");

const toDoNode = document.getElementById("toDo");
const completedNode = document.getElementById("completed");

const spanToDoNode = document.createElement("span");
const spanCompletedNode = spanToDoNode.cloneNode();
toDoNode.appendChild(spanToDoNode);
completedNode.appendChild(spanCompletedNode);

const exampleModalNode = document.getElementById("exampleModal");
const exampleModalContentNode = document.getElementById("exampleModalContent");
const exampleModalLabelNode = document.getElementById("exampleModalLabel");

const formNode = document.getElementById("modalForm");
const inputTitleNode = document.getElementById("inputTitle");
const inputTextNode = document.getElementById("inputText");
const lowPriorityNode = document.getElementById("Low");
const mediumPriorityNode = document.getElementById("Medium");
const highPriorityNode = document.getElementById("High");
const divBtnModalNode = document.getElementById("divBtnModal");

const bntAddModalNode = document.getElementById("btnAddModal");
const btnSortDSCNode = document.getElementById("btnSortDSC");
const btnSortACSNode = document.getElementById("btnSortACS");
const btnsSwitchThemeNode = document.querySelectorAll(".btn-switch");

let array = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = JSON.parse(localStorage.getItem("theme"));
let isEdit = true;

if (localStorage.getItem("tasks")) {
  array.forEach((item) => createTask(item));
}

theme === null ? setTheme("light") : setTheme(theme);

function appendZero(n) {
  return n < 10 ? `0${n}` : n;
}

function changeTheme() {
  let theme = this.dataset.theme;
  setTheme(theme);
  localStorage.setItem("theme", JSON.stringify(theme));
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
    let liNode = e.target.parentNode.parentNode.parentNode;
    let btnInfoNode = liNode.querySelector(".btn-info");
    if (liNode.dataset.task === e.target.dataset.task) {
      array.find(
        (task) => task.id === Number(liNode.dataset.task)
      ).isComplete = true;

      e.target.remove(liNode);
      btnInfoNode.remove(liNode);

      completedTasksNode.append(liNode);

      localStorage.setItem("tasks", JSON.stringify(array));

      countTasks();
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

function createBtnForIsCompleteTask(isComplete, id) {
  if (isComplete === false) {
    const threeBtnNode = `<div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button data-task=${id} type="button" class="btn btn-success w-100">Complete</button>
                            <button data-task=${id} data-toggle="modal" data-target="#exampleModal" type="button" class="btn btn-info w-100 my-2">Edit</button>
                            <button data-task=${id} type="button" class="btn btn-danger w-100">Delete</button>
                        </div>`;

    return threeBtnNode;
  } else {
    const oneBtnNode = `<div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button data-task=${id} type="button" class="btn btn-danger w-100">Delete</button>
                        </div>`;

    return oneBtnNode;
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
  const taskNode = `<li data-task=${
    task.id
  }  class="list-group-item d-flex w-100 mb-2" style="background-color:${
    task.color
  }">
  <div class="w-100 mr-2"><div class="d-flex w-100 justify-content-between">
                                <h5 data-task=${
                                  task.id
                                } class="mb-1 task__title">${task.title}</h5>
                                <div> <small data-task=${
                                  task.id
                                } class="mr-2 task__priority">${
    task.priority
  } priority</small>
                                    <small>${task.date}</small>
                                </div>
                            </div>
                            <p data-task=${
                              task.id
                            } class="mb-1 w-100 task__text">${task.text}</p>
                        </div>
                            <div class="dropdown m-2 dropleft">
                                <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                               ${createBtnForIsCompleteTask(
                                 task.isComplete,
                                 task.id
                               )}
                            </div>
                            </li>`;

  task.isComplete === false
    ? (currentTasksNode.innerHTML = currentTasksNode.innerHTML + taskNode)
    : (completedTasksNode.innerHTML = completedTasksNode.innerHTML + taskNode);

  countTasks();

  return taskNode;
}

function openAddModalWindow() {
  isEdit = false;
  let btnSaveNode = exampleModalNode.querySelector(".btn-primary");
  btnSaveNode.textContent = "Add task";
  exampleModalLabelNode.textContent = "Add task";
  resetForm(formNode);
}

function openEditModalWindow(id) {
  isEdit = true;
  let btnSaveNode = exampleModalNode.querySelector(".btn-primary");
  btnSaveNode.textContent = "Save task";
  exampleModalLabelNode.textContent = "Edit task";
  formNode.setAttribute("data-task", Number(id));
  array.map((task) => {
    if (task.id === Number(id)) {
      inputTitleNode.value = task.title;
      inputTextNode.value = task.text;

      let namePriorityNode = document.querySelectorAll(
        "input[name=gridRadios]"
      );

      for (let name of namePriorityNode) {
        name.setAttribute("data-task", Number(id));
        if (name.value === task.priority) {
          name.checked = true;
        }
      }
    }
  });
}

function openEditTask(e) {
  if (e.target.classList.contains("btn-info")) {
    let liNode = e.target.parentNode.parentNode.parentNode;
    if (liNode.dataset.task === e.target.dataset.task) {
      openEditModalWindow(liNode.dataset.task);
    }
  }
}

function updateTask() {
  for (let prop of currentTasksNode.children) {
    if (Number(formNode.dataset.task) === Number(prop.dataset.task)) {
      let titleTaskNode = prop.querySelector(".task__title");
      let textTaskNode = prop.querySelector(".task__text");
      let priorityTaskNode = prop.querySelector(".task__priority");

      titleTaskNode.innerHTML = inputTitleNode.value;
      textTaskNode.innerHTML = inputTextNode.value;
      priorityTaskNode.innerHTML = `${checkPriority()} priority`;
    }
  }

  array.filter((task) => {
    if (task.id === Number(formNode.dataset.task)) {
      task.title = inputTitleNode.value;
      task.text = inputTextNode.value;
      task.priority = checkPriority();
    }
  });

  resetForm(formNode);
}

function handleSort(e) {
  sortTasks(e.currentTarget);

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

function removeTask(e) {
  if (e.target.classList.contains("btn-danger")) {
    let liNode = e.target.parentNode.parentNode.parentNode;
    if (confirm("Are you sure?")) {
      if (liNode.dataset.task === e.target.dataset.task) {
        array = array.filter((task) => task.id !== Number(liNode.dataset.task));

        e.currentTarget.removeChild(liNode);

        localStorage.setItem("tasks", JSON.stringify(array));

        countTasks();
      }
    }
  }
}

function resetForm(form) {
  form.reset();
}

function setTheme(theme) {
  if (theme === "dark") {
    bodyNode.style.cssText = `background-color: #0F1A20; color: #c5cddb`;
    exampleModalContentNode.style.cssText = `background-color: #0F1A20; color: #c5cddb`;
    navigationNode.classList.remove("bg-light");
    navigationNode.classList.add("bg-dark");
  } else if (theme === "light") {
    bodyNode.style.cssText = `background-color: #fff; color: #3D3D3D`;
    exampleModalContentNode.style.cssText = `background-color: #fff; color: #3D3D3D`;
    navigationNode.classList.remove("bg-dark");
    navigationNode.classList.add("bg-light");
  }

  localStorage.setItem("theme", JSON.stringify(theme));
}

function sortTasks(e) {
  e === btnSortACSNode
    ? array.sort((a, b) => a.id - b.id)
    : array.sort((a, b) => b.id - a.id);
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

  if (isEdit === true) {
    updateTask();
  } else {
    array.push(task);
    createTask(task);
    resetForm(formNode);
  }

  localStorage.setItem("tasks", JSON.stringify(array));
}

formNode.addEventListener("submit", submitForm);

currentTasksNode.addEventListener("click", removeTask);
currentTasksNode.addEventListener("click", openEditTask);
currentTasksNode.addEventListener("click", completeTask);

completedTasksNode.addEventListener("click", removeTask);

bntAddModalNode.addEventListener("click", openAddModalWindow);
btnSortACSNode.addEventListener("click", handleSort);
btnSortDSCNode.addEventListener("click", handleSort);

for (let btn of btnsSwitchThemeNode) {
  btn.addEventListener("click", changeTheme);
}

console.log(array);
