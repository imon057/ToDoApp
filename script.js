// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from local storage (if any)
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
  
    // Function to add task to DOM and local storage
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;
  
      addTaskToDOM(taskText, false);
      saveTasks();
  
      taskInput.value = ""; // Clear input field
    }
  
    // Function to add task to DOM
    function addTaskToDOM(text, completed) {
      const listItem = document.createElement("li");
  
      // Checkbox to mark task as completed
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed;
      checkbox.addEventListener("change", () => {
        listItem.classList.toggle("completed");
        saveTasks();
      });
  
      // Task text
      const taskSpan = document.createElement("span");
      taskSpan.textContent = text;
      if (completed) listItem.classList.add("completed");
  
      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        taskList.removeChild(listItem);
        saveTasks();
      });
  
      // Append elements to list item
      listItem.appendChild(checkbox);
      listItem.appendChild(taskSpan);
      listItem.appendChild(deleteBtn);
  
      // Add to task list
      taskList.appendChild(listItem);
    }
  
    // Save tasks to local storage
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach(listItem => {
        const text = listItem.querySelector("span").textContent;
        const completed = listItem.classList.contains("completed");
        tasks.push({ text, completed });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Event listeners for adding task
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });
  });
  