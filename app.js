const currentTasksNode = document.querySelector("#currentTasks");
const completedTasksNode = document.querySelector("#completedTasks");

const formNode = document.querySelector("#modalForm");
const inputTitleNode = document.querySelector("#inputTitle");
const inputTextNode = document.querySelector("#inputText");
const lowPriorityNode = document.querySelector("#Low");
const mediumPriorityNode = document.querySelector("#Medium");
const highPriorityNode = document.querySelector("#High");

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

function createTask(e) {
  e.preventDefault();

  let taskNode = document.createElement("li");
  taskNode.setAttribute("data-task", createId());
  taskNode.className = "list-group-item d-flex w-100 mb-2";
  taskNode.style.backgroundColor = createRandomColor();

  taskNode.innerHTML = `<div class="w-100 mr-2">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${inputTitleNode.value}</h5>
                                <div>
                                    <small class="mr-2">${checkPriority()} priority</small>
                                    <small>${createDate()}</small>
                                </div>

                            </div>
                            <p class="mb-1 w-100">${inputTextNode.value}</p>
                        </div>
                            <div class="dropdown m-2 dropleft">
                                <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                                    <button data-task=${createId()} type="button" class="btn btn-success w-100">Complete</button>
                                    <button data-task=${createId()} type="button" class="btn btn-info w-100 my-2">Edit</button>
                                    <button data-task=${createId()} type="button" class="btn btn-danger w-100">Delete</button>
                                </div>
                            </div>`;

  currentTasksNode.append(taskNode);
  resetForm(formNode);

  return taskNode;
}

function removeTask(e) {
  if (e.target.classList.contains("btn-danger")) {
    if (confirm("Are you sure?")) {
      for (let prop of e.currentTarget.children) {
        if (prop.dataset.task === e.target.dataset.task) {
          currentTasksNode.removeChild(prop);
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

formNode.addEventListener("submit", createTask);
currentTasksNode.addEventListener("click", removeTask);
