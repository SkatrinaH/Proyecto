// Dummy credentials
const validUsername = "admin";
const validPassword = "1234";

let tasks = [];
let selectedTaskIndex = null;

// Validate login credentials
function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    if (username === validUsername && password === validPassword) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        document.getElementById("loggedUser").innerText = username;
    } else {
        loginError.innerText = "Usuario o contraseña incorrectos.";
    }
}

// Add task to table
function addTask() {
    const taskId = document.getElementById("taskId").value;
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const startDate = document.getElementById("startDate").value;
    const clientName = document.getElementById("clientName").value;
    const projectId = document.getElementById("projectId").value;
    const comments = document.getElementById("comments").value;
    const status = "Por hacer";

    // Validate fields
    if (!taskId || !taskTitle || !taskDescription || !startDate || !clientName || !projectId) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Add task to array
    const task = { taskId, taskTitle, taskDescription, startDate, clientName, projectId, comments, status };
    tasks.push(task);

    // Insert task into table
    updateTaskTable();
    
    // Clear form
    clearForm();
}

// Update task table
function updateTaskTable() {
    const taskTable = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
    taskTable.innerHTML = "";  // Clear table

    tasks.forEach((task, index) => {
        const newRow = taskTable.insertRow();
        newRow.innerHTML = `
            <td>${task.taskId}</td>
            <td>${task.taskTitle}</td>
            <td>${task.taskDescription}</td>
            <td>${task.startDate}</td>
            <td>${task.clientName}</td>
            <td>${task.projectId}</td>
            <td>${task.comments}</td>
            <td>${task.status}</td>
        `;

        // Set double-click event for selecting the task
        newRow.ondblclick = function() {
            selectTask(index);
        };
    });
}

// Select task for editing
function selectTask(index) {
    selectedTaskIndex = index;
    const task = tasks[index];

    // Show selected task section
    document.getElementById("selectedTaskSection").style.display = "block";

    // Populate the fields with the selected task's data
    document.getElementById("statusSelect").value = task.status;
    document.getElementById("newComment").value = "";
}

// Update task details and add a new row
function updateTask() {
    if (selectedTaskIndex === null) return;

    const status = document.getElementById("statusSelect").value;
    const newComment = document.getElementById("newComment").value;

    // Copy the selected task
    const updatedTask = { ...tasks[selectedTaskIndex] };
    updatedTask.status = status;

    // Add new comment with timestamp if provided
    if (newComment) {
        const date = new Date().toLocaleString();
        updatedTask.comments += `\n[${date}] ${newComment}`;
    }

    // Add the updated task as a new row in the task table
    tasks.push(updatedTask);
    updateTaskTable();

    // Clear the selected task section
    document.getElementById("selectedTaskSection").style.display = "none";
}

// Clear form fields
function clearForm() {
    document.getElementById("taskForm").reset();
}

// Filter tasks by status
function filterTasks() {
    const filter = document.getElementById("statusFilter").value;
    const taskTable = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
    taskTable.innerHTML = "";  // Clear table

    tasks.filter(task => filter === "Todos" || task.status === filter)
         .forEach((task, index) => {
             const newRow = taskTable.insertRow();
             newRow.innerHTML = `
                 <td>${task.taskId}</td>
                 <td>${task.taskTitle}</td>
                 <td>${task.taskDescription}</td>
                 <td>${task.startDate}</td>
                 <td>${task.clientName}</td>
                 <td>${task.projectId}</td>
                 <td>${task.comments}</td>
                 <td>${task.status}</td>
             `;

             // Set double-click event for selecting the task
             newRow.ondblclick = function() {
                 selectTask(index);
             };
         });
}