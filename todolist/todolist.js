let currentEditElement = null;

// ==========================================
// 1. ADD NEW TASK DIRECTIVE
// ==========================================
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === "") return;

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-wrapper-inner" onclick="toggleComplete(this)">
            <div class="custom-checkbox"><i class="fa-solid fa-check"></i></div>
            <span class="task-content">${taskText}</span>
        </div>
        <div class="action-buttons">
            <button class="edit-btn" onclick="openEditModal(this)"><i class="fa-solid fa-sliders"></i></button>
            <button class="delete-btn" onclick="deleteTask(this)"><i class="fa-solid fa-circle-xmark"></i></button>
        </div>
    `;
    
    document.getElementById('taskList').appendChild(li);
    input.value = ""; 
}

// ==========================================
// 2. TOGGLE TASK COMPLETION (CHECK/UNCHECK)
// ==========================================
function toggleComplete(wrapperElement) {
    wrapperElement.parentElement.classList.toggle('completed');
}

// ==========================================
// 3. DELETE TASK WITH ANIMATION DELAY
// ==========================================
function deleteTask(element) {
    const listItem = element.closest('li');
    // Triggers the reverse cubic entry animation smoothly before removal
    listItem.style.animation = "cubicEntrance 0.3s ease reverse forwards";
    setTimeout(() => { 
        listItem.remove(); 
    }, 250);
}

// ==========================================
// 4. MODERN MODAL CONTROL (EDIT INPUT)
// ==========================================
function openEditModal(buttonElement) {
    const listItem = buttonElement.closest('li');
    currentEditElement = listItem.querySelector('.task-content');
    
    const modal = document.getElementById('editModal');
    const editInput = document.getElementById('editTaskInput');
    
    editInput.value = currentEditElement.innerText;
    modal.style.display = 'flex';
    editInput.focus();
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditElement = null;
}

function saveEditedTask() {
    const editInput = document.getElementById('editTaskInput');
    const newText = editInput.value.trim();
    
    if (newText !== "" && currentEditElement) {
        currentEditElement.innerText = newText;
        closeEditModal();
    }
}

// ==========================================
// 5. GLOBAL KEYBOARD EVENT LISTENERS
// ==========================================
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});

document.getElementById('editTaskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') saveEditedTask();
});