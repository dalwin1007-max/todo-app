const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all"){

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(filter === "active"){
            return !task.completed;
        }

        if(filter === "completed"){
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button class="complete">
                    ✔
                </button>

                <button class="edit">
                    Edit
                </button>

                <button class="delete">
                    Delete
                </button>
            </div>
        `;

        li.querySelector(".complete").addEventListener("click", () => {

            task.completed = !task.completed;

            saveTasks();

            renderTasks(filter);

        });

        li.querySelector(".delete").addEventListener("click", () => {

            tasks = tasks.filter(t => t.id !== task.id);

            saveTasks();

            renderTasks(filter);

        });

        li.querySelector(".edit").addEventListener("click", () => {

            let newText = prompt(
                "Edit Task",
                task.text
            );

            if(newText){

                task.text = newText;

                saveTasks();

                renderTasks(filter);
            }
        });

        taskList.appendChild(li);

    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === ""){
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

    renderTasks();
});

document.querySelectorAll(".filter-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        renderTasks(btn.dataset.filter);

    });

});

renderTasks();