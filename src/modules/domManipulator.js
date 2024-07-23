import "../style.css";

const makeModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.add("active");
}

const remModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("active");
}

const addOverlay = () => {
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("active");
}

const remOverlay = () => {
    const overlay = document.querySelector("#overlay");
    overlay.classList.remove("active");
}

const updateProjList = (projects) => {
    var list = document.querySelector("#projList");
    clearContent(list);

    // `projects` is an array containing the list of project objects
    projects.forEach((project) => {
        var name = document.createElement("h3")
        name.textContent = project.name;;
        list.appendChild(name);
    });

}

const displayProj = (project) => {
    // Select the project name and tasks to display for each individual proj
    var projName = document.querySelector("#projName");
    const currTasks = document.querySelector("#tasks");
    var tasks = project.tasks; // array of task objects

    // Update values based on the current selection 
    projName.innerText = project.name;
    
    // Clear old tasks and display new ones
    clearContent(currTasks);
    tasks.forEach((task) => {
        // Create display information for task
        const name =document.createElement("h5");
        name.textContent = task.name;

        const desc = document.createElement("p");
        p.textContent = task.desc;

        const due = document.createElement("h6");
        due.textContent = task.due;

        const completed = document.createElement("input");
        completed.setAttribute("type", "checkbox");

        const remBtn = document.createElement("button");


        // Create card and add all items to it
        const card = document.createElement("div");
        const info = document.createElement("div");
        const buttons = document.createElement("div");
        info.classList.add("info");
        buttons.classList.add("");

        info.appendChild(name);
        info.appendChild(desc);

        buttons.appendChild(completed);
        buttons.appendChild(remBtn);

        card.appendChild(info);


    });
}

const displayTask = (task) => {

    // Create a task card
    const card = document.createElement("div");
    card.classList.add("taskCard");

    

}

function clearContent(content) {
    content.replaceChildren();
}

export { makeModal, remModal, updateProjList, displayProj, addOverlay, remOverlay };