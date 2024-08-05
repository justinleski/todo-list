import { db } from "../../firebaseConfig.js";
import { collection, setDoc, doc } from "firebase/firestore"; 

export async function storeUserProject(user, project) {

    try{
        const projCollection = collection(db, "users", user.uid, "projects");

        // Generate unqiue project id
        const projUniqueId = generateUniqueId();

         // Add a new document in collection "users"
        await setDoc(doc(projCollection, projUniqueId), { // TODO; we cannot store Objects in Firebase, we must make another subfolder an then a unique id to correspond
            // project: project, // firebase cannot store custom objects
            projMade: Date.now(),
            projUid: projUniqueId,
            name: project.name,
            notes: project.notes,
        });

        // Remember .forEach cannot be used as it fires off multiple asynchronous  calls, we need a for .. of loop for await to work
        for (const task of project.tasks) {
            storeTask(task, projUniqueId, projCollection);
        }

       

    } catch (error) {
        console.error("Error storing the data: "+error);
        throw new Error("Failed to store item");
    }
    
}

async function storeTask(task, projUniqueId, projCollection) {

        // console.log(projUniqueId);
        // console.log(task.name.value);
        // console.log(task.desc.value);
        // console.log(task.due.value);
        // console.log(task.completed);
        // console.log(task.priority);
        // console.log(task.taskNum);

    // Store the task under corresponding task number (convert to string in base 10)
    await setDoc(doc(projCollection, projUniqueId, "tasks", task.taskNum.toString(10)), {
        parentProjectUid: projUniqueId,
        name: task.name.value,
        desc: task.desc.value,
        due: task.due.value,
        completed: task.completed,
        priority: task.priority,
        taskNum: task.taskNum,
    });
}

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}