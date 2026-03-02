const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns=[todo,progress,done];
let taskdata={}
let dragitem = null;

function addDragEvent(task) {
    task.addEventListener("dragstart", () => {
        dragitem = task;
    });
}
const task=document.querySelectorAll(".task").forEach(addDragEvent);


function addDragEventoncolumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragitem);
        column.classList.remove("hover-over");

        columns.forEach(col=>{
            const task=col.querySelectorAll(".task");
            const count=col.querySelector(".right");
            count.innerText=task.length 

        })
    });
}

addDragEventoncolumn(todo);
addDragEventoncolumn(progress);
addDragEventoncolumn(done);


const togglebtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addtaskbtn = document.querySelector("#add-task-btn");

togglebtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalbg.addEventListener("click", () => {
    modal.classList.remove("active");
});


addtaskbtn.addEventListener("click", () => {
    const tasktitle = document.querySelector("#task-title-input").value;
    const taskdesc = document.querySelector("#task-desc-input").value;

    if (!tasktitle || !taskdesc) return;

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${tasktitle}</h2>
        <p>${taskdesc}</p>
        <button>Delete</button>
    `;
const columns = document.querySelectorAll(".task-coulmn");

    addDragEvent(div);
    todo.appendChild(div);

    columns.forEach(col => {
        const count = col.querySelector(".heading .right");
        const tasks = col.querySelectorAll(".task");
                       
        taskdata[col.id] = Array.from(task).map(t => {
            return{
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
            }
        });
  localStorage.setItem("task", JSON.stringify(taskdata));
        count.innerText = tasks.length;
    });
 
  

    modal.classList.remove("active");
});
