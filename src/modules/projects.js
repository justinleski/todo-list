class Project {
    constructor(name, notes, tasks = []) {
        this.name = name;
        this.notes = notes;
        this.tasks = tasks;
    }
}

const removeProj = (index, projects) => {
    // Take the attribute as the index and remove
    projects.splice(index, 1); // remove 1 project at index
    // Keep in mind you do not have to renumber data attributes as program reloads all projects on refresh
}

const createProj = (name, notes, tasks) => {
    var proj = new Project(name, notes, tasks);
    return proj;
}
const addTaskToProj = (task, proj) => {
    proj.tasks.push(task);
    return proj;
}


export { createProj, addTaskToProj, removeProj };
