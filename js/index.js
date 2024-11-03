// DOM elementlarini olish
const input = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const taskList = document.querySelector(".task__list");
const doneList = document.querySelector(".done__list");
const taskTitle = document.querySelector(".task__title");
const doneTitle = document.querySelector(".done__title");

// Local Storage'dan tasklarni olish
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

// Har bir taskni yuklash
tasks.forEach(task => addTaskToDOM(task));
doneTasks.forEach(task => addDoneTaskToDOM(task));
updateCounters();

// Yangi task qo'shish tugmasi
submitBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "" || tasks.includes(value)) {
    alert("Task bo'sh yoki mavjud!");
    return;
  }
  
  tasks.push(value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskToDOM(value);
  updateCounters();
  input.value = "";
});

// Taskni DOMga qo'shish
function addTaskToDOM(task) {
  const taskItem = document.createElement("li");
  taskItem.className = "task__item";
  taskItem.innerHTML = `
    <p>${task}</p>
    <div class="task__controller">
      <button class="move-btn">✔️</button>
      <button class="delete-btn">❌</button>
    </div>
  `;

  taskItem.querySelector(".move-btn").addEventListener("click", () => moveTask(task, taskItem));
  taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task, taskItem));
  
  taskList.appendChild(taskItem);
}

// Bajilgan taskni DOMga qo'shish
function addDoneTaskToDOM(task) {
  const doneItem = document.createElement("li");
  doneItem.className = "strike";
  doneItem.textContent = task;
  doneList.appendChild(doneItem);
}

// Taskni o'chirish
function deleteTask(task, element) {
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  element.remove();
  updateCounters();
}

// Taskni bajarilganlar ro'yxatiga ko'chirish
function moveTask(task, element) {
  tasks = tasks.filter(t => t !== task);
  doneTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  
  element.remove();
  addDoneTaskToDOM(task);
  updateCounters();
}

// Hisoblagichlarni yangilash
function updateCounters() {
  taskTitle.innerText = `Tasks to do - ${tasks.length}`;
  doneTitle.innerText = `Done - ${doneTasks.length}`;
}
