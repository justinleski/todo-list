class Project {
    constructor(name, notes, tasks = [], uid) {
        this.name = name;
        this.notes = notes;
        this.tasks = tasks;
        this.uid = uid;
    }
}

const removeProj = (index, projects) => {
    // Take the attribute as the index and remove
    projects.splice(index, 1); // remove 1 project at index
    // Keep in mind you do not have to renumber data attributes as program reloads all projects on refresh
}

const loadProj = (name, notes, tasks, uid) => {
    var proj = new Project(name, notes, tasks, uid);
    return proj;
}

const createProj = (name, notes, tasks) => {
    // Generate unqiue project id
    const projUniqueId = generateUniqueId();

    var proj = new Project(name, notes, tasks, projUniqueId);
    return proj;
}

const addTaskToProj = (task, proj) => {
    proj.tasks.push(task);
    return proj;
}


function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}


export { createProj, addTaskToProj, removeProj, loadProj };
