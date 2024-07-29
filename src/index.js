import { createProj, addTaskToProj } from "./modules/projects.js";
import { hideModal, updateProjList, displayProj, addOverlay, remOverlay, displayTask, activateModal, makeTaskModal, makeProjModal, makeNotesModal } from "./modules/domManipulator.js";
import { makeTask } from "./modules/task.js";

// Store all projects in array
var projects = [];
var currentProject = projects[0]; // make current project index 0 by default

// assign button 
var newTask = document.querySelector("#mainTaskBtn");
if (projects.length <= 0) {
    newTask.disabled = true;
}

newTask.addEventListener("click", () => {
    addOverlay();
    makeTaskModal(); // add event listener to button here to make it prevent default
    activateModal();

    document.querySelector("#taskAddBtn").addEventListener("click", function(e) {
        e.preventDefault();

        // Take the current inputs on the form's field
        const currentTask= makeTask(currentProject);
        addTaskToProj(currentTask, currentProject);
        displayTask(currentProject, currentTask); // list length is used to determine data attribute num of each task

        // Hide after new task made
        remOverlay();
        hideModal();
    });
    
});


var newProj = document.querySelector("#newProjBtn");
newProj.addEventListener("click", () => {
    // Clear old modal and make one specific to newProj
    addOverlay();
    makeProjModal();
    activateModal();

    document.querySelector("#makeProjBtn").addEventListener("click", () =>{
        var name = document.querySelector("#projNameField").value;
        var emptyTasks = [];
        currentProject = createProj(name, "", emptyTasks); // Make current project the most recently created proj
        projects.push(currentProject);
        updateProjList(projects); 

        //
        var h3s = document.querySelectorAll("#projList .projSpan h3");

        for (const headerLink of h3s) { // make sure headerLink is const - var will chnage to most recent only
            headerLink.addEventListener("click", () => {
                // The current project will be based off of the data attribute on the header displayed on the DOM
                
                currentProject = projects[headerLink.getAttribute("data-project-number")];
                displayProj(currentProject);
            });
        }

        // Set the current project and display it
        displayProj(currentProject);
        newTask.disabled = false;
        remOverlay();
        hideModal();
    });
});

document.querySelector("#notes").addEventListener("click", () => {
    addOverlay();
    makeNotesModal(currentProject);
    activateModal();
});

// Cancel task creation in modal
var cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", () => {
    remOverlay();
    hideModal();
});

