import { createProj, addTaskToProj } from "./modules/projects.js";
import { hideModal, updateProjList, displayProj, addOverlay, remOverlay, displayTask, activateModal, makeTaskModal, makeProjModal, makeNotesModal, noProjects, makeSignInModal } from "./modules/domManipulator.js";
import { makeTask } from "./modules/task.js";
import { signUpWithEmail } from "../utilities/authentication/signIn.js";
import { storeNewUser } from "../utilities/database/storeUser.js";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js"

// Store all projects in array
var projects = [];
var currentProject = projects[0]; // make current project index 0 by default

// assign button 
var newTask = document.querySelector("#mainTaskBtn");
var notesBtn = document.querySelector("#notes");

// Check if user has projects
if (projects.length <= 0) {
    noProjects();
    newTask.disabled = true;
    notesBtn.disabled = true;
}
else {
    currentProject = projects[0];
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

    // Update tasks in proejcts TODO
    
});

document.querySelector("#signInBtn").addEventListener("click", (e) => {
    e.preventDefault();

    // Create modal
    addOverlay();
    makeSignInModal();
    activateModal();
    //document.querySelector("#signUpForm").checkValidity();

    // Sign in prompt under sign up form will allow user to sign in
    document.querySelector("#signInPrompt").addEventListener("click", () => {
        //
        console.log("Test?");
    });

    // Add event listener to top right "sign in" button which will then pass in our user inputted fields from the modal to signIn.js
    document.querySelector("#makeNewAccount").addEventListener("click", (e) => {
        e.preventDefault();
        const userEmail = document.querySelector("#user-email").value;
        const userPass = document.querySelector("#user-pass").value;
        const userName = document.querySelector("#user-name").value;
        console.log(userEmail);
        signUpWithEmail(userEmail, userPass, userName); 
        // storeNewUser(auth.getUser(uid), userEmail, userName); // tried moving to onauthstatechanged
    });
});


var newProj = document.querySelector("#newProjBtn");
newProj.addEventListener("click", () => {
    // Clear old modal and make one specific to newProj
    addOverlay();
    makeProjModal();
    activateModal();

    // 
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

        // Store project to firebase - auth.currentUser is imported from fireBaseConfig.js
        storeUserProject(auth.currentUser, currentProject);

        // Set the current project and display it
        displayProj(currentProject);
        newTask.disabled = false;
        notesBtn.disabled = false;
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

function storeProjectToDB(project) {

}