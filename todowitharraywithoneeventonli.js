const input = document.querySelector(".input-task");
const list = document.querySelector(".list");
const addButton = document.querySelector(".btn-add");

let tasks = [];

// Function to create a new task element
const createTaskElement = (task) => {
  const li = document.createElement("LI");
  li.classList.add("row", "space-between");
  li.setAttribute("data-id", task.id); // Add data-id to identify tasks

  // Task container--div
  const taskContainer = document.createElement("DIV");
  taskContainer.classList.add("row");

  // Create a checkbox for task completion
  const checkbox = document.createElement("INPUT");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.isDone; // Set checkbox state based on task.isDone

  // Create span to hold the actual task text
  const spanText = document.createElement("SPAN");
  spanText.textContent = task.text;
  if (task.isDone) {
    spanText.classList.add("line-through");
  }

  // Create delete icon
  const deleteIcon = document.createElement("IMG");
  deleteIcon.src = "./assets/rubbish.svg";
  deleteIcon.alt = "Delete Task";
  deleteIcon.classList.add("delete-icon");

  // Append elements to task container
  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(spanText);

  // Append task container and delete icon to the list item
  li.appendChild(taskContainer);
  li.appendChild(deleteIcon);

  // Add a single event listener to the <li>
  li.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("task-checkbox")) {
      toggleTaskCompletion(task.id);
    } else if (target.classList.contains("delete-icon")) {
      deleteTask(task.id);
    }
  });

  return li;
};

// Function to render the task list
const renderTasks = () => {
  list.innerHTML = ""; // Clear the list
  //We loop over the main array and then call the createTaskElement function for each task to create the li element and then add it to the cell.
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    list.appendChild(taskElement);
  });
};

// Function to add a new task
const addTask = () => {
  const inputValue = input.value.trim();

  if (inputValue.length === 0) {
    alert("Please enter a task");
    input.value = "";
    input.focus();
    return;
  }

  if (inputValue.length < 3) {
    alert("Please enter at least 3 characters");
    input.value = "";
    input.focus();
    return;
  }

  // Create a new task object
  const newTask = {
    id: new Date().getTime(),
    text: inputValue,
    isDone: false,
  };

  tasks.push(newTask);
  renderTasks();
  input.value = "";
  input.focus();
};

// Function to delete a task
// const deleteTask = (id) => {
//   tasks = tasks.filter((task) => task.id !== id);
//   renderTasks();
// };
//FUNCTION DELETE TASK WITH FINDINDEX AND SPLICE
const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    //index not found
    tasks.splice(index, 1); // Remove the task at the found index
    renderTasks();
  }
};
// Function to toggle task completion
// const toggleTaskCompletion = (id) => {
//   tasks.forEach((task) => {
//     if (task.id === id) {
//       task.isDone = !task.isDone;
//     }
//   });
//   renderTasks();
// };
const toggleTaskCompletion = (id) => {
  const task = tasks.find((task) => task.id === id); // Find the matching task
  if (task) {
    task.isDone = !task.isDone;
    renderTasks();
  }
};
// Add task on Enter key
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Add task on button click
addButton.addEventListener("click", addTask);
