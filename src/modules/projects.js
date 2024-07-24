class Project {
    constructor(name, notes, tasks = []) {
        this.name = name;
        this.notes = notes;
        this.tasks = tasks;
    }


}

const loadProj = () => {
    
}

const createProj = (name, notes, tasks) => {
    var proj = new Project(name, notes, tasks);
    return proj;
}
const addTaskToProj = (task, proj) => {
    proj.tasks.push(task);
    return proj;
}

export { loadProj, createProj, addTaskToProj };
