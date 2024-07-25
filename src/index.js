import { loadProj, createProj, addTaskToProj } from "./modules/projects.js";
import { hideModal, updateProjList, displayProj, addOverlay, remOverlay, displayTask, activateModal, makeTaskModal, makeProjModal } from "./modules/domManipulator.js";
import { makeTask } from "./modules/task.js";

// Store all projects in array
var projects = [];
var currentProject = projects[0]; // make current project index 0 by default



// Create default project for user
// projects.push(createProj("My First Project", "", ""));
// projects.push(createProj("My Second Project", "", "")); 


// 
//updateProjList(projects);


// assign button 
var newTask = document.querySelector("#mainTaskBtn");
newTask.addEventListener("click", () => {
    addOverlay();
    makeTaskModal(); // add event listener to button here to make it prevent default
    activateModal();

    document.querySelector("#taskAddBtn").addEventListener("click", function(e) {
        e.preventDefault();
        // Current project is based on the data attribute of the header displayed on screen
        console.log("The current proejct is: "+currentProject);

        // Take the current inputs on the form's field
        const currentTask= makeTask();
        addTaskToProj(currentTask, currentProject);
        // Display it?
        displayTask(currentTask);

        // Hide after new task made
        remOverlay();
        hideModal();
    });
    
});

// For project dropdown on the side make button load corresponding project
// projectButtons.forEach(button => {
//     button.addEventListener("click", () => {
        
//     });
// })
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
        var h3s = document.querySelector("#projList").children;

        for (const headerLink of h3s) { // make sure headerLink is const - var will chnage to most recent only
            headerLink.addEventListener("click", () => {
                // The current project will be based off of the data attribute on the header displayed on the DOM
                currentProject = projects[headerLink.getAttribute("data-project-number")];
                displayProj(currentProject);
            });
        }


        // Set the current project and display it
        displayProj(currentProject);
        remOverlay();
        hideModal();
    });

    

});

// Cancel task creation in modal
var cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", () => {
    remOverlay();
    hideModal();
});

// Check for form submission
// let taskForm = document.querySelector("#taskForm");
// taskForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Call functions to update tasks for the current project
//     var task = makeTask();
//     displayTask(task);

// });
