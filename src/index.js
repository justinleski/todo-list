import { loadProj, createProj } from "./modules/projects.js";
import { makeModal, remModal, updateProjList, displayProj, addOverlay, remOverlay } from "./modules/domManipulator.js";
import { makeTask } from "./modules/task.js";

// Store all projects in array
var projects = [];
var currentProject = projects[0]; // make current project index 0 by default



// Create default project for user
projects = createProj("My First Project", "", "", projects);
projects = createProj("My Second Project", "", "", projects);


// 
updateProjList(projects);


// assign button 
var button = document.querySelector("#mainTaskBtn");
button.addEventListener("click", () => {
    addOverlay();
    makeModal();
});

// For project dropdown on the side make button load corresponding project
// projectButtons.forEach(button => {
//     button.addEventListener("click", () => {
        
//     });
// })

// Cancel task creation in modal
var cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", () => {
    remOverlay();
    remModal();
});

// Check for form submission
let taskForm = document.querySelector("#taskForm");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Call functions to update tasks for the current project
    makeTask();


})
