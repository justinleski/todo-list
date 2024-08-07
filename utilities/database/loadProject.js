import { collection, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { Task } from "../../src/modules/task.js";
import { loadProj } from "../../src/modules/projects.js";


// Query all projects from Firebase and retrieve their relevant tasks; then put both tasks and projects into respective objects
export async function loadProjectFromFirestore(user){
    var projectsArray = [];

    const userProjectsRef = collection(db, "users", user.uid, "projects");
    const querySnapshot = await getDocs(userProjectsRef);

    for (let i = 0; i < querySnapshot.size; i++){
        const docSnap = querySnapshot.docs[i];
        const proj = docSnap.data();

        try {
            const loadedTasksArray = await retrieveTasksFromProject(proj.projUid, user);
            // If tasks are retrieved, create Project object
            const newProj = loadProj(proj.name, proj.notes, loadedTasksArray, proj.projUid); 
            projectsArray.push(newProj);
        } catch {
            console.error("Tasks could not be loaded onto project");
        }
    }

    return projectsArray;
}

async function retrieveTasksFromProject(projectUid, user) {
    var tasks = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "projects", projectUid, "tasks"));
    querySnapshot.forEach((doc) => {
        // add tasks to project object
        const task = doc.data();

        // Create new task object and store in array which will be used to create new project
        const newTask = new Task(task.name, task.desc, task.due, task.completed, task.priority);
        newTask.taskNum = task.taskNum;
        tasks.push(newTask);
    });

    return tasks;
}