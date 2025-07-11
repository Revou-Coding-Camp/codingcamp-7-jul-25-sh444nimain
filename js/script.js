let tasks = [];
let currentFilter = "all";

function addTask() {
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");

  if (taskInput.value === "" || dueDateInput.value === "") {
    alert("Please fill in both task and due date");
  } else {
    const newTask = {
      id: Date.now(),
      task: taskInput.value,
      dueDate: dueDateInput.value,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    dueDateInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-gray-500 py-4">No task found</td>
      </tr>`;
    return;
  }

  filteredTasks.forEach((element) => {
    const taskRow = `
      <tr class="border-b border-gray-700">
        <td class="p-2">${element.task}</td>
        <td class="p-2">${element.dueDate}</td>
        <td class="p-2">${element.completed ? "Done" : "Pending"}</td>
        <td class="p-2">
          <button class="bg-green-500 text-white px-2 py-1 rounded text-sm mr-1"
            onclick="toggleTaskCompletion(${element.id})">
            ${element.completed ? "Undo" : "Complete"}
          </button>
          <button class="bg-red-500 text-white px-2 py-1 rounded text-sm"
            onclick="deleteTask(${element.id})">
            Delete
          </button>
        </td>
      </tr>
    `;
    taskList.innerHTML += taskRow;
  });
}

function setFilter(filterType) {
  currentFilter = filterType;
  displayTasks();
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  console.log("Deleting task with ID:", id);
  console.log("Task index found:", taskIndex);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    displayTasks();
  }
}

function deleteAllTasks() {
  tasks = [];
  displayTasks();
}

function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    displayTasks();
  }
}

document.addEventListener("DOMContentLoaded", displayTasks);
