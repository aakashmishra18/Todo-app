const input = document.getElementById("taskinput");
const button = document.getElementById("addtask")

const tasklist = document.getElementById("tasklist")
const remainTask = document.getElementById("remain")


const all = document.getElementById("all")
const comp = document.getElementById("comp")
const pending = document.getElementById("pending")


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



all.addEventListener("click", () => {
    const tasks = document.querySelectorAll("#tasklist li")

    tasks.forEach((task) => {
        task.style.display = "list-item"
    })
})

pending.addEventListener("click", () => {
    const tasks = document.querySelectorAll("#tasklist li")

    tasks.forEach((task) => {
        if (task.classList.contains("completed")) {
            task.style.display = "none"
        } else {
            task.style.display = "list-item"
        }
    })
})

comp.addEventListener("click", () => {
    const tasks = document.querySelectorAll("#tasklist li")
    tasks.forEach((task) => {
        if (task.classList.contains("completed")) {
            task.style.display = "list-item"
        } else {
            task.style.display = "none"
        }
    })
})



let count = 0;

button.addEventListener("click", () => {
    const li = document.createElement("li");
    tasklist.appendChild(li);

    const task = document.createElement("span")
    task.textContent = input.value
    li.appendChild(task);

    input.value = ""

    const dlt = document.createElement("button")
    dlt.textContent = "delete"
    li.appendChild(dlt);

    const compcheck = document.createElement("input")
    compcheck.type = "checkbox";
    li.appendChild(compcheck);

    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit"
    li.appendChild(editbtn);

    count++;
    updatecount();
    let currentele = task;

    editbtn.addEventListener("click", () => {
        if (editbtn.textContent === "Edit") {
            const editinput = document.createElement("input")
            editinput.value = currentele.textContent;
            currentele.replaceWith(editinput)

            currentele = editinput;
            editbtn.textContent = 'save';

        }
        else {
            const newspan = document.createElement("span")
            newspan.textContent = currentele.value
            currentele.replaceWith(newspan)

            currentele = newspan;

            editbtn.textContent = 'Edit';

        }
    })
    compcheck.addEventListener("change", () => {
        li.classList.toggle("completed")
        if (compcheck.checked) {
            count--;
        } else {
            count++;
        }
        updatecount()
    })

    dlt.addEventListener("click", () => {
        li.remove();
        if (!compcheck.checked) {
            count--;
        }
        updatecount()
    })


})

function updatecount() {
    remainTask.textContent = `Remianing task:${count}`;
}