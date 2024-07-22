import { Project, loadProj, createProj } from "./modules/projects.js";
import { makeModal, updateProjList } from "./modules/domManipulator.js";

// Store all projects in array
var projects = [];
const projName = document.querySelector("#projName");
const projList = document.querySelector("#projList");
const currTasks = document.querySelector("#tasks");


// Create default project for user
projects = createProj("My First Project", "", "", projects);
projects = createProj("My Second Project", "", "", projects);


// 
updateProjList(projects);


// Tets
//currTasks.appendChild(makeModal());
