// Function to fetch tasks from the backend and render them on the UI
async function fetchAndRenderTasks() {
    try {
        const response = await fetch('http://localhost:5000/tasks');
        const tasks = await response.json();
        renderTasks(tasks); // Render tasks on the UI
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Function to render tasks on the UI
function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous content
    const table = document.createElement("table");
    table.classList.add("task-table");

    // Create table headers
    const headers = ["ID", "Title", "Description", "Status", "Priority", "Actions"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Populate table with tasks
    tasks.forEach(task => {
        const row = document.createElement("tr");
        for (const key in task) {
            if (task.hasOwnProperty(key)) {
                const cell = document.createElement("td");
                cell.textContent = task[key];
                row.appendChild(cell);
            }
        }

        // Add delete and edit buttons
        const actionsCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTask(task.id);
        actionsCell.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editTask(task.id);
        actionsCell.appendChild(editBtn);

        row.appendChild(actionsCell);
        table.appendChild(row);
    });

    taskList.appendChild(table);
}

// Function to delete a task by ID
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchAndRenderTasks(); // Re-fetch and render tasks after deletion
        } else {
            console.error('Error deleting task:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Function to edit a task by ID
async function editTask(taskId) {
    // You can implement the edit functionality as per your requirements
    console.log(`Editing task with ID: ${taskId}`);
}

// Initial fetching and rendering of tasks
fetchAndRenderTasks();

