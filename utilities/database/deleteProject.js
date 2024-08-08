import { db } from "../../firebaseConfig.js";
import { doc, deleteDoc, collection, updateDoc, query, where, getDocs, increment } from "firebase/firestore";

export async function deleteProjectFromFirestore(projIndex, projects, user){

    // Find the project from project array to associate and delete data
    const projectToDelete = projects[projIndex];
    console.log("projectoDelete in dleeteProject, ", projectToDelete);
    console.log("Project index is: ", projIndex);
    console.log(projects);
    const projCollection = collection(db, "users", user.uid, "projects");

    // First, delete tasks subcollection from Firestore
    console.log("project len ", projectToDelete.tasks.length);
    for (let i = 0; i < projectToDelete.tasks.length; i++) {
        deleteTaskFromFirestore(projCollection, projectToDelete.uid, i);
    }
    
    // After subcollection is deleted, delete the project item
    await deleteDoc(doc(projCollection, projectToDelete.uid))
}

export async function deleteTaskFromFirestore(projCollection, projUid, taskNum){

    // Not recommended to delete collection/subcollections on web clients, will just remvoe all tasks then the
    // project so no reference to old tasks folder can be made;
    const newReference = collection(projCollection, projUid, "tasks");
    const q = query(newReference, where("taskNum", ">", parseInt(taskNum))); 
    const querySnapshot = await getDocs(q);

    console.log("TaskNum is ", taskNum, typeof taskNum);

    console.log(querySnapshot.docs);
    //console.log(querySnapshot.docs[0].data()); // undefined

    for (let i = 0; i < querySnapshot.size; i++){ 
        const docSnap = querySnapshot.docs[i];
        const task = docSnap.data();
        console.log("This doc has a taskNum: ", task.taskNum); // ok this works

        deIncrementNum(task.taskNum, newReference);
      
    }

    // Convert taskNum to string to match Firestores datatype; otherwsie error thrown
    await deleteDoc(doc(projCollection, projUid, "tasks", taskNum.toString(10)));
}

async function deIncrementNum(taskIndex, newReference) {

    const docRef = doc(newReference,  taskIndex.toString(10));

    await updateDoc(docRef, {
        taskNum: increment(-1)
    });
}