class Project {
    constructor(name, notes, tasks) {
        this.name = name;
        this.notes = notes;
        this.tasks = tasks;
    }
}

const loadProj = () => {
    
}

const createProj = (name, notes, tasks, list) => {
    var proj = new Project(name, notes, tasks);
    list.push(proj);
    return list;
}

export { loadProj, createProj };
