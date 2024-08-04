class Task {

    constructor(name, desc, due, completed, priority) {
        this.name = name;
        this.desc = desc;
        this.due = due;
        this.completed = completed;
        this.priority = priority;
        this.taskNum = null;
    }

    // set taskNum(value) {
    //     this._taskNum = value;
    // }

    // get taskNum() {
    //     return this._taskNum;
    // }
}

const makeTask = (currentProject) => {
    // Take form inputs and make new task
    var taskName = document.querySelector("#task-name"); // im silly here; I shouldve used .value but my program is too far gone
    var taskDesc = document.querySelector("#task-desc");
    var taskDue = document.querySelector("#task-due");
    var taskPriority = document.querySelector('input[name="priority-buttons"]:checked').getAttribute("data-type");
    var taskComp = document.querySelector("#task-comp").checked;
    console.log(taskComp);

    // Make new task and return obj
    var task = new Task(taskName, taskDesc, taskDue, taskComp, taskPriority);

    // Calculate index of task
    task.taskNum = currentProject.tasks.length;

    return task;

}

const removeTask = (currentProject, taskNumber) => {
    var tasks = currentProject.tasks;

    // for task in tasks > 1, index-- ; De-incriment the taskNumbers for anything above
    for (let i = 0; i < tasks.length; i++) {
        if (i > taskNumber) {
            tasks[i].taskNum--;
        }
    }

    // Remove from array
    tasks.splice(taskNumber, 1);
   
}

export { makeTask, removeTask }