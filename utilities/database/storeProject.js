import { db } from "../../firebaseConfig.js";
import { collection, setDoc, doc } from "firebase/firestore"; 

export async function storeUserProject(user, project) {

    try{
        const projCollection = collection(db, "users", user.uid, "projects");
        const projUniqueId = project.uid;

         // Add a new document in collection "users"
        await setDoc(doc(projCollection, projUniqueId), { 
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

    // Store the task under corresponding task number (convert to string in base 10)
    await setDoc(doc(projCollection, projUniqueId, "tasks", task.taskNum.toString(10)), {
        parentProjectUid: projUniqueId,
        name: task.name,
        desc: task.desc,
        due: task.due,
        completed: task.completed,
        priority: task.priority,
        taskNum: task.taskNum,
    });
}
