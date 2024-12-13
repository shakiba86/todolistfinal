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

  return li;
};

// Function to render the task list
const renderTasks = () => {
  list.innerHTML = ""; // Clear the list
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

// Function to delete a task-using filter
// const deleteTask = (id) => {
//   tasks = tasks.filter((task) => task.id !== id);
//   renderTasks();
// };
//FUNCTION DELETE TASK WITH FOR AND SPLICE
//splice method is byref so doesnt create new array and
//Modifies the original array directly.If we have to handle large task lists
//better use splice method
// const deleteTask = (id) => {
//   for (let i = 0; i < tasks.length; i++) {
//     if (tasks[i].id === id) {
//       tasks.splice(i, 1); // Remove the task
//       break;
//     }
//   }
//   renderTasks(); // Re-render the updated task list
// };
//
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

// Event delegation for handling clicks just on ul
list.addEventListener("click", (event) => {
  const target = event.target; //get span or inputtag

  // Check if the target is a checkbox
  if (target.classList.contains("task-checkbox")) {
    // go up to the <li> element
    // const li = target.closest("li");
    const li = target.parentElement.parentElement;
    const taskId = parseInt(li.getAttribute("data-id"), 10); //convert the data-id attribute of the <li> element into a number.
    toggleTaskCompletion(taskId);
  }

  // Check if the target is a delete icon
  else if (target.classList.contains("delete-icon")) {
    // Scroll up to find<li> element
    const li = target.closest("li");
    const taskId = parseInt(li.getAttribute("data-id"), 10);
    deleteTask(taskId);
  }
});

// Add task on Enter key
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Add task on button click
addButton.addEventListener("click", addTask);
