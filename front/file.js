let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <input type="checkbox" onchange="toggleTaskCompletion(this)">
            <span class="priority-star" onclick="toggleStarColor(this)">★</span>
            <span class="task-text">${taskText}</span>
            <button onclick="deleteTask(this)">Supprimer</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";
    }
}

function deleteTask(button) {
    let taskItem = button.parentElement;
    taskList.removeChild(taskItem);
}

function toggleTaskCompletion(checkbox) {
    let taskItem = checkbox.parentElement;
    if (checkbox.checked) {
        taskItem.classList.add("completed");
    } else {
        taskItem.classList.remove("completed");
    }
}

function markAllTasksCompleted() {
    let checkboxes = document.querySelectorAll("#taskList input[type='checkbox']");
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
        checkbox.parentElement.classList.add("completed");
    });
}

function deleteAllCompletedTasks() {
    let completedTasks = document.querySelectorAll("#taskList .completed");
    completedTasks.forEach(function(task) {
        task.remove();
    });
}

function deleteAllTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
}

document.getElementById("loginBtn").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "none";
});

document.getElementsByClassName("close")[1].addEventListener("click", function() {
    document.getElementById("loginModal2").style.display = "none";
});

function toggleStarColor(star) {
    let taskItem = star.parentElement;
    if (star.style.color === 'yellow') {
        star.style.color = 'white';
        star.nextElementSibling.style.color = 'white';
        taskItem.classList.remove('priority');
    } else {
        star.style.color = 'yellow';
        star.nextElementSibling.style.color = 'red';
        taskItem.classList.add('priority');
    }
}


function showOnlyPriorityTasks() {
    let tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(function(task) {
        if (!task.classList.contains('priority')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
}

function showAlltasks() {
    let tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(function(task) {
        if (!task.classList.contains('priority')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'block';
        }
    });
}

function showOnlyFinishTasks() {
    let tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(function(task) {
        if (!task.classList.contains('completed')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
}

document.getElementById("loginLink").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("loginModal2").style.display = "block";
});
