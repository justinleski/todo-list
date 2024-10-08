import { createProj, addTaskToProj } from "./modules/projects.js";
import { hideModal, updateProjList, displayProj, addOverlay, remOverlay, 
    displayTask, activateModal, makeTaskModal, makeProjModal, makeNotesModal, 
    noProjects, makeSignInModal, makeSignUpModal, welcomeUser } from "./modules/domManipulator.js";
import { makeTask } from "./modules/task.js";
import { signInWithEmail, signUpWithEmail } from "../utilities/authentication/signIn.js";
import { storeUserProject } from "../utilities/database/storeProject.js";
import { auth } from "../firebaseConfig.js"
import { loadProjectFromFirestore } from "../utilities/database/loadProject.js"

// Store all projects in array
var projects = [];
var currentProject = projects[0]; // make current project index 0 by default

// assign button 
var newTask = document.querySelector("#mainTaskBtn");
var notesBtn = document.querySelector("#notes");

// Firestore has no way of checking the current sign in state so just give time for it to load - i know this is rag tag
setTimeout(() => {
  
    if (auth.currentUser !== null){

        // // Change button to indicate user is logged in
        // welcomeUser(auth.currentUser.name);

        // Attempt to load and display projects from Firestore using currentUser credentials
        loadProjectFromFirestore(auth.currentUser)
        .then((loadedProjectsArray) => {
            projects = loadedProjectsArray;

            if (projects.length <= 0) { //
                noProjects();
                newTask.disabled = true;
                notesBtn.disabled = true;
            }
            else {
                currentProject = projects[0];
                updateProjList(projects);
                // Make projList clickable
                var h3s = document.querySelectorAll("#projList .projSpan h3");
                addClickToProjList(h3s);
                displayProj(currentProject);
            }
        })
        .catch(console.error("Could not load projects on initial set-up"));
    }
    
}, "1000");

newTask.addEventListener("click", () => {
    addOverlay();
    makeTaskModal(); // add event listener to button here to make it prevent default
    activateModal();

    // Change button to indicate user is logged in
    welcomeUser(auth.currentUser.getDisplayName);

    document.querySelector("#taskAddBtn").addEventListener("click", function(e) {
        e.preventDefault();

        // Take the current inputs on the form's field
        const currentTask= makeTask(currentProject);
        addTaskToProj(currentTask, currentProject);
        displayTask(currentProject, currentTask); // list length is used to determine data attribute num of each task

        // After object is updated, overwrite and store it to Firestore
        if (auth.currentUser !== null){
            storeUserProject(auth.currentUser, currentProject); // TODO; do not store a new project, at least not as new one. just update the db's current task, thats it
        }
        

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
    makeSignUpModal();
    activateModal();
    //document.querySelector("#signUpForm").checkValidity();

    // Sign in prompt under sign up form will allow user to sign in
    document.querySelector("#signInPrompt").addEventListener("click", () => {
        makeSignInModal();

        document.querySelector("#signBackIn").addEventListener("click", (e) =>{
            e.preventDefault();
            const userEmail = document.querySelector("#user-email").value;
            const userPass = document.querySelector("#user-pass").value;
            signInWithEmail(userEmail, userPass); // maybe return a t/f to put text on screen saying account doesnt exist
        });
    });

    // Add event listener to top right "sign in" button which will then pass in our user inputted fields from the modal to signIn.js
    document.querySelector("#makeNewAccount").addEventListener("click", (e) => {
        e.preventDefault();
        const userEmail = document.querySelector("#user-email").value;
        const userPass = document.querySelector("#user-pass").value;
        const userName = document.querySelector("#user-name").value;
        signUpWithEmail(userEmail, userPass, userName); 
        // TODO: check if account creation is successful then hide modal
    });
});

function addClickToProjList(headers) {
    for (const headerLink of headers) { // make sure headerLink is const - var will chnage to most recent only
        headerLink.addEventListener("click", () => {
            // The current project will be based off of the data attribute on the header displayed on the DOM
            
            currentProject = projects[headerLink.getAttribute("data-project-number")];
            displayProj(currentProject);
        });
    }
}

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

        // Make project name load proj
        var h3s = document.querySelectorAll("#projList .projSpan h3");
        addClickToProjList(h3s);

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

export { projects };