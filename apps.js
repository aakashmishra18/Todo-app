const input = document.getElementById("taskinput");
const button = document.getElementById("addtask");

const tasklist = document.getElementById("tasklist");
const remainTask = document.getElementById("remain");

const all = document.getElementById("all");
const comp = document.getElementById("comp");
const pending = document.getElementById("pending");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    remainTask.textContent = `Remaining Tasks: ${remaining}`;
}

function createTaskElement(taskObj, index) {

    const li = document.createElement("li");

    if (taskObj.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = taskObj.text;
    li.appendChild(span);

    const dlt = document.createElement("button");
    dlt.textContent = "Delete";
    li.appendChild(dlt);

    const compcheck = document.createElement("input");
    compcheck.type = "checkbox";
    compcheck.checked = taskObj.completed;
    li.appendChild(compcheck);

    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";
    li.appendChild(editbtn);

    let currentElement = span;

    editbtn.addEventListener("click", () => {

        if (editbtn.textContent === "Edit") {

            const editinput = document.createElement("input");
            editinput.value = currentElement.textContent;

            currentElement.replaceWith(editinput);

            currentElement = editinput;

            editbtn.textContent = "Save";

        } else {

            const newspan = document.createElement("span");
            newspan.textContent = currentElement.value;

            tasks[index].text = currentElement.value;

            saveTasks();

            currentElement.replaceWith(newspan);

            currentElement = newspan;

            editbtn.textContent = "Edit";
        }

    });

    compcheck.addEventListener("change", () => {

        li.classList.toggle("completed");

        tasks[index].completed = compcheck.checked;

        saveTasks();
        updateCount();

    });

    dlt.addEventListener("click", () => {

        li.remove();

        tasks.splice(index, 1);

        saveTasks();
        updateCount();

        location.reload();
    });

    tasklist.appendChild(li);
}

button.addEventListener("click", () => {

    const text = input.value.trim();

    if (text === "") return;

    const taskObj = {
        text: text,
        completed: false
    };

    tasks.push(taskObj);

    saveTasks();

    input.value = "";

    location.reload();
});

tasks.forEach((task, index) => {
    createTaskElement(task, index);
});

updateCount();

all.addEventListener("click", () => {

    document.querySelectorAll("#tasklist li").forEach(task => {
        task.style.display = "list-item";
    });

});

comp.addEventListener("click", () => {

    document.querySelectorAll("#tasklist li").forEach(task => {

        if (task.classList.contains("completed")) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }

    });

});

pending.addEventListener("click", () => {

    document.querySelectorAll("#tasklist li").forEach(task => {

        if (!task.classList.contains("completed")) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }

    });

});