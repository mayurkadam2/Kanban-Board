const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedElement = null;


const tasks = document.querySelectorAll('.task');

tasks.forEach(task =>
    task.addEventListener('drag', (e) => {
        draggedElement = task;
    })
);



function addDragEventsOnColumn(column) {
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener('dragleave', (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
        console.log("Which element was dragged:", draggedElement);
        console.log("Dropped into column:", column);
        column.appendChild(draggedElement);
        
    });


}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
