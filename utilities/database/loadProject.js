import { collection, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { Task } from "../../src/modules/task.js";
import { createProj } from "../../src/modules/projects.js";


// Query all projects from Firebase and retrieve their relevant tasks; then put both tasks and projects into respective objects
export async function loadProjectFromFirestore(user){
    var projectsArray = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "projects"));
    querySnapshot.forEach((doc) => {
        // Convert Firestore data to Project object
        const proj = doc.data();
        var tasks = retrieveTasksFromProject(proj.projUid, user)
        .then((loadedTasksArray) => {
            tasks = loadedTasksArray;
            //console.log("All tasks loaded to project successfully", tasks);

            // If tasks are retrieved, create Project object
            const newProj = createProj(proj.name, proj.notes, tasks);
            projectsArray.push(newProj);
        })
        .catch(console.error("Tasks could not be loaded onto project"));

    });

    return projectsArray;
}

async function retrieveTasksFromProject(projectUid, user) {
    var tasks = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "projects", projectUid, "tasks"));
    querySnapshot.forEach((doc) => {
        // add tasks to project object
        const task = doc.data();
    
        //Firestore returns a string, convert back to date object to be formatted by date-fns
        //var taskDueDate = new Date(task.due);

        // Create new task object and store in array which will be used to create new project
        const newTask = new Task(task.name, task.desc, task.due, task.completed, task.priority);
        newTask.taskNum = task.taskNum;
        tasks.push(newTask);
    });

    console.log("loadProjectFromFirestore ", tasks[0].due);
    console.log("typeof ", typeof tasks[0].due);

    return tasks;
}