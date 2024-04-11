// Function to handle form submission and create new task
document.getElementById("addTaskForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(this);
    const newTask = {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        priority: formData.get("priority")
    };
    try {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        if (response.ok) {
            // Redirect to index.html after adding task
            window.location.href = "index.html";
        } else {
            console.error('Error creating task:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating task:', error);
    }
});

