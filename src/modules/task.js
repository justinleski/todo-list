class Task {

    constructor(name, desc, due, completed, priority) {
        this.name = name;
        this.desc = desc;
        this.due = due;
        this.completed = completed;
        this.priority = priority;
    }
}

const makeTask = () => {
    // Take form inputs and make new task
    var taskName = document.querySelector("#task-name");
    var taskDesc = document.querySelector("#task-desc");
    var taskDue = document.querySelector("#task-due");
    var taskPriority = document.querySelector("#task-priority");
    var taskComp = document.querySelector("#task-comp");

    // Make new task and return obj
    var task = new Task(taskName, taskDesc, taskDue, taskComp, taskPriority);
    return task;

}


export { makeTask }