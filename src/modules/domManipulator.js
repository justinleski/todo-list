import "../style.css";

const activateModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.add("active");
}

const hideModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("active");
}

const makeTaskModal = () => {
    const modal = document.querySelector("#modal");
    clearContent(modal);

    // cancel button
    modal.appendChild( createCancel());

    // make form
    var form = document.createElement("form");
    form.setAttribute("id", "taskForm");

    var textField = document.createElement("fieldset");
    var nameLabel = document.createElement("label");
    nameLabel.innerText = "Name:";
    nameLabel.setAttribute("for", "task-name");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("id", "task-name");
    nameInput.required = true;
    var descLabel = document.createElement("label");
    descLabel.innerText = "Description";
    descLabel.setAttribute("for", "task-desc");
    var descInput = document.createElement("input");
    descInput.setAttribute("id", "task-desc");
    descInput.required = true;
    textField.appendChild(nameLabel);
    textField.appendChild(nameInput);
    textField.appendChild(descLabel);
    textField.appendChild(descInput);
    form.appendChild(textField);

    var dateField = document.createElement("fieldset");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = "Due Date:";
    dateLabel.setAttribute("for", "task-due");
    var dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "task-due");
    dateField.appendChild(dateLabel);
    dateField.appendChild(dateInput);
    form.appendChild(dateField);

    var priorityField = document.createElement("fieldset");
    var priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority";
    priorityLabel.setAttribute("for", "task-priority");
    priorityField.appendChild(priorityLabel);

    // Priority radio buttons
    var radioLow = document.createElement("input");
    radioLow.type = "radio";
    radioLow.setAttribute("name", "priority-buttons");
    var radioMedium = document.createElement("input");
    radioMedium.type = "radio";
    radioMedium.setAttribute("name", "priority-buttons");
    var radioHigh = document.createElement("input");
    radioHigh.type = "radio";
    radioHigh.setAttribute("name", "priority-buttons");
    priorityField.appendChild(radioLow);
    priorityField.appendChild(radioMedium);
    priorityField.appendChild(radioHigh);

    var taskComp = document.createElement("input");
    taskComp.setAttribute("type", "checkbox");
    taskComp.setAttribute("id", "task-comp");
    priorityField.appendChild(taskComp);
    form.appendChild(priorityField);

    // form submit button
    var formSubmit = document.createElement("button");
    formSubmit.setAttribute("type", "submit");
    formSubmit.id = "taskAddBtn";
    formSubmit.innerText = "Add Task";
    form.appendChild(formSubmit);

    // Finally add form to modal
    modal.appendChild(form);

}

const makeProjModal = () => {
    const modal = document.querySelector("#modal");
    clearContent(modal);
    modal.appendChild(createCancel());

    var nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.id = "projNameField";
    modal.appendChild(nameField);
    
    var button = document.createElement("button");
    button.innerText = "New Project";
    button.id = "makeProjBtn";
    modal.appendChild(button);
}

const createCancel = () => {
    // Cancel task creation in modal
    var cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "&times;";
    cancelBtn.addEventListener("click", () => {
        remOverlay();
        hideModal();
    });
    return cancelBtn;
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
        var name = document.createElement("h3");
        name.textContent = project.name;
        name.addEventListener("click", () => {
            displayProj(project); // TODO TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
        });
        list.appendChild(name);
    });

}


const displayProj = (project) => {
    // Select the project name and tasks to display for each individual proj
    var projName = document.querySelector("#projName");
    const currTasks = document.querySelector("#tasks");
    //console.log(project.name.value);
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

    // create text info
    const title = document.createElement("h2");
    title.innerText = task.name.value;
    const desc = document.createElement("p");
    desc.innerText = task.desc.value;
    const textInfo = document.createElement("div");
    //textInfo.classList.add(""); // ADD CLASS LIST TO MAKE COLUMN
    textInfo.appendChild(title);
    textInfo.appendChild(desc);
    card.appendChild(textInfo);

    // actions buttons
    const read = document.createElement("input");
    read.setAttribute("type", "checkbox");
    read.checked = task.completed; // MAYBE ADD EVENT LISTENER TO BUTTON??

    const deleteBtn = document.createElement("button");

    const btnGroup = document.createElement("div");
    btnGroup.appendChild(read);
    btnGroup.appendChild(deleteBtn);
    card.appendChild(btnGroup);

    // Add to DOM
    var taskList = document.querySelector("#tasks");
    taskList.appendChild(card); // We can just do this, we need to store the DOM elements somewhere per project basis unless we remake each task each time

}

function addStrike(content) {
    content.classList.add("strikeOut");
}

function remStrike(content) {
    content.classList.add("strikeOut");
}

function clearContent(content) {
    content.replaceChildren();
}

export { activateModal, hideModal, updateProjList, displayProj, addOverlay, remOverlay, displayTask, makeTaskModal, makeProjModal };