import "../style.css";
import { removeProj } from "./projects";
import { removeTask } from "./task.js"
import { format, parseISO } from "date-fns";

const activateModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.add("active");
}

const hideModal = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("active");
}

const makeSignInModal = () => {
    const modal = document.querySelector("#modal");
    clearContent(modal);

    // cancel button
    modal.appendChild( createCancel());

    // 
    var form = document.createElement("form");
    form.setAttribute("id", "signInForm");

    var textField = document.createElement("fieldset");

    var emailLabel = document.createElement("label");
    emailLabel.innerText = "Email:";
    emailLabel.setAttribute("for", "user-email");
    var emailInput = document.createElement("input");
    emailInput.setAttribute("id", "user-email");
    emailInput.required = true;

    var passLabel = document.createElement("label");
    passLabel.innerText = "Password:";
    passLabel.setAttribute("for", "user-pass");
    var passInput = document.createElement("input");
    passInput.setAttribute("id", "user-pass");
    passInput.required = true;

    // Make button
    var button = document.createElement("button");
    button.innerText = "Sign Up";
    button.id = "makeNewAccount";

    // Make an "already have account?" href
    var signInPrompt = document.createElement("p");
    signInPrompt.innerText = "Already have an account? Sign in.";
    signInPrompt.id = "signInPrompt";

    // Append all children
    textField.appendChild(emailLabel);
    textField.appendChild(emailInput);
    textField.appendChild(passLabel);
    textField.appendChild(passInput);
    textField.appendChild(button);

    //
    var heading = document.createElement("h2");
    heading.innerText = "Sign Up";
    modal.appendChild(heading);
    modal.appendChild(textField);
    modal.appendChild(signInPrompt);
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

    // Get the current date
    const today = new Date();
    // Format the date as yyyy-mm-dd
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    var dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "task-due");
    dateInput.required = true;
    dateInput.value = formattedDate;
    dateField.appendChild(dateLabel);
    dateField.appendChild(dateInput);
    form.appendChild(dateField);

    var priorityField = document.createElement("fieldset");
    var priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority";
    priorityLabel.setAttribute("for", "task-priority");
    priorityField.appendChild(priorityLabel);

    // Priority radio buttons
    const radioBtns = document.createElement("div");
    radioBtns.classList.add("radioBtns");
    var radioLow = document.createElement("input");
    radioLow.type = "radio";
    radioLow.style.backgroundColor = "#a5d46a";
    radioLow.setAttribute("name", "priority-buttons");
    radioLow.setAttribute("data-type", "low");
    radioLow.checked = true; // default so form does not break
    var radioMedium = document.createElement("input");
    radioMedium.type = "radio";
    radioMedium.style.backgroundColor = "#ffdf80";
    radioMedium.setAttribute("name", "priority-buttons");
    radioMedium.setAttribute("data-type", "medium");
    var radioHigh = document.createElement("input");
    radioHigh.type = "radio";
    radioHigh.style.backgroundColor = "#ffa080";
    radioHigh.setAttribute("name", "priority-buttons");
    radioHigh.setAttribute("data-type", "high");
    radioBtns.appendChild(radioLow);
    radioBtns.appendChild(radioMedium);
    radioBtns.appendChild(radioHigh);
    priorityField.appendChild(radioBtns);

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

const makeNotesModal = (currentProject) => {
    const modal = document.querySelector("#modal");
    clearContent(modal);
    modal.appendChild(createCancel());

    const title = document.createElement("h3");
    title.innerText = "Notes";

    var textField = document.createElement("textarea");
    textField.id = "notesField";
    textField.value = currentProject.notes;

    // Not best practice, but did not learn about async yet so this is what works
    textField.addEventListener("input", () => {
        // On every input, update the current project internally
        currentProject.notes = textField.value;
    });

    modal.appendChild(title);
    modal.appendChild(textField);
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
    projects.forEach((project, index) => {
        const projSpan = document.createElement("div");
        projSpan.classList.add("projSpan");
        var name = document.createElement("h3");
        name.textContent = project.name;
        name.setAttribute("data-project-number", index); // give unique data attribute to header based on index
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        //deleteBtn.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
        deleteBtn.innerHTML = "&times;";
        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentElement.remove();
            removeProj(index, projects);
        });

        projSpan.appendChild(name);
        projSpan.appendChild(deleteBtn);

        list.appendChild(projSpan);
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
        displayTask(project, task);
    });
}

const displayTask = (currentProject, task) => {

    // Create a task card
    const card = document.createElement("div");
    card.classList.add("taskCard");
    switch(task.priority) {
        case "high":
            card.style.borderLeftColor = "#ffa080";
            break;
        case "medium":
            card.style.borderLeftColor = "#ffdf80";
            break;
        case "low":
            card.style.borderLeftColor = "#a5d46a";
            break;
    }

    // create text info
    const title = document.createElement("h2");
    title.innerText = task.name.value;
    title.classList.add("taskTitle");
    const desc = document.createElement("p");
    desc.innerText = task.desc.value;
    desc.classList.add("taskDesc");
    const textInfo = document.createElement("div");
    textInfo.appendChild(title);
    textInfo.appendChild(desc);
    card.appendChild(textInfo);
    card.setAttribute("data-task-number", task.taskNum);

    // actions buttons
    const read = document.createElement("input");
    read.setAttribute("type", "checkbox");
    read.checked = task.completed; 
    isStriked(task, desc);
    read.addEventListener("click", () => {
        task.completed = read.checked;
        isStriked(task, desc);
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    deleteBtn.classList.add("svgBtn");
    deleteBtn.addEventListener("click", () => {
        const taskIndex = deleteBtn.parentElement.parentElement.getAttribute("data-task-number");
        removeTask(currentProject, taskIndex); 
        deleteBtn.parentElement.parentElement.remove(); 
        // We need to update the data-task live somehow
        document.querySelectorAll(".taskCard").forEach((card) => {
            if (card.getAttribute("data-task-number") > taskIndex) {
                card.setAttribute("data-task-number", card.getAttribute("data-task-number")-1);
            }
        })
    });

    // Format date and display
    console.log("task is due: "+task.due.value);
    var parsedData = parseISO(task.due.value);
    const formattedData = format(parsedData, "MMM do, yyyy");

    var dueDate = document.createElement("p");
    dueDate.textContent = formattedData; 

    const btnGroup = document.createElement("div");
    btnGroup.appendChild(dueDate); 
    btnGroup.appendChild(read);
    btnGroup.appendChild(deleteBtn);
    btnGroup.classList.add("btnGroup");
    card.appendChild(btnGroup);

    // Add to DOM
    var taskList = document.querySelector("#tasks");
    taskList.appendChild(card); // We can just do this, we need to store the DOM elements somewhere per project basis unless we remake each task each time

}

const noProjects = () => {
    var tasks = document.querySelector("#tasks");

    const container = document.createElement("div");
    container.classList.add("noProjects");

    const folderIcon = '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    const iconHolder = document.createElement("div");
    iconHolder.innerHTML = folderIcon;
    container.appendChild(iconHolder);

    const displayText = document.createElement("h3");
    displayText.textContent = "You currently have no projects";
    container.appendChild(displayText);

    const explanation = document.createElement("p");
    explanation.textContent = "To get started, press the + in the My Projects column";
    container.appendChild(explanation);

    tasks.appendChild(container);
}

function isStriked(task, content) {
    if (task.completed == true){
        content.classList.add("strikeOut");
    } else {
        content.classList.remove("strikeOut");
    }
    
}

function clearContent(content) {
    content.replaceChildren();
}

export { activateModal, hideModal, updateProjList, displayProj, 
    addOverlay, remOverlay, displayTask, makeTaskModal, 
    makeProjModal, makeNotesModal, noProjects, makeSignInModal };