function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    
    document.getElementById('taskList').appendChild(li);
    input.value = ""; // Clear input
}

function toggleComplete(element) {
    element.classList.toggle('completed');
}

function deleteTask(element) {
    element.parentElement.remove();
}

// Allow "Enter" key to add task
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});