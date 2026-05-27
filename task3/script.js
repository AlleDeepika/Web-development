const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        li.querySelector("span").addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector(".edit").addEventListener("click", () => {
            const updatedText = prompt("Edit task:", task.text);
            if (updatedText) {
                task.text = updatedText;
                saveTasks();
                renderTasks();
            }
        });

        li.querySelector(".delete").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        renderTasks();
    });
});

renderTasks();