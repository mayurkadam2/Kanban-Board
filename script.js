let taskData = {};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const modal = document.querySelector('.modal');
const modalToggleBtn = document.querySelectorAll('.toggle-modal');
let draggedElement = null;


const columns = [todo, progress, done];

//getting data from local storage
if (localStorage.getItem('taskData')) {
    const savedData = JSON.parse(localStorage.getItem('taskData'));

    for (const col in savedData) {
        const column = document.querySelector(`#${col}`);
        savedData[col].forEach(task => {
            addTask(task.title, task.desc, column);
        });
    }
}



//modal toggle with physical and logical buttons

//modal toggle with button
modalToggleBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.toggle('active');

    });
});

//modal toggle with esc key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        modal.classList.remove('active');

    }
}
);



//add task div
function addTask(taskTitle, taskDesc, column) {

    //checking if value is empty or not
    if (taskTitle.trim() === "") {
        alert("Please fill text Title Field");
        return;
    };

    //task div creation
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('draggable', 'true');
    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button><i class="fa-solid fa-trash"></i> Delete</button>
    `;

    
    column.appendChild(div);

    div.addEventListener('drag', (e) => {
        draggedElement = div;
    });

    //clearing the input fields after adding the task
    document.querySelector(('#task-title-input')).value = "";
    document.querySelector(('#task-desc-input')).value = "";

    //delete task button functionality
    const deleteBtn = div.querySelector('button');
    deleteBtn.addEventListener("click", (e) => {
        div.remove();
        console.log("Task deleted");
        updateLocalStorage();
        updateCount();
    });

    updateLocalStorage();
    updateCount();
}


//update cound and Local Storage
function updateCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right');
        count.innerHTML = tasks.length;

       
    });

}

// adding drag event listeners to tasks at website reload
const tasks = document.querySelectorAll('.task');
tasks.forEach(task =>
    task.addEventListener('drag', (e) => {
        draggedElement = task;
    })
);

function updateLocalStorage(){
    
    columns.forEach(col =>{
        //col is the column elmt
        const tasks = col.querySelectorAll('.task');
         //local storage update after new task is added
        taskData[col.id] = Array.from(tasks).map((t) => {
            //col.id wil give us the id of the column
            
            return {
                title: t.querySelector('h2').innerText,
                desc: t.querySelector('p').innerText
            }
        });

        localStorage.setItem('taskData', JSON.stringify(taskData));
    })
}

//if there is a drop evnet on column, we will append the dragged element to that column
function addDragEventsOnColumn(column) {
    //border effect
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });
    //remove border effect
    column.addEventListener('dragleave', (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });
    //allow drop by default browser does not allow dropping
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    //handle drop event on column
    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
        // console.log("Which element was dragged:", draggedElement);
        // console.log("Dropped into column:", column);
        column.appendChild(draggedElement);

        columns.forEach(col => {
            const tasks = col.querySelectorAll('.task');
            const count = col.querySelector('.right');
            count.innerHTML = tasks.length;

            taskData[col.id] = Array.from(tasks).map((t) => {
                return {
                    title: t.querySelector('h2').innerText,
                    desc: t.querySelector('p').innerText
                }
            });

            localStorage.setItem('taskData', JSON.stringify(taskData));

        });

    });


}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

//adding new task
const addNewTaskButton = document.querySelector("#add-new-task");
addNewTaskButton.addEventListener('click', (e) => {

    modal.classList.remove('active');
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    addTask(taskTitle, taskDesc, todo);

    //counting length after new task is added of all columns
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right');
        count.innerHTML = tasks.length;


    });


});