import { db } from "../../firebaseConfig.js";
import { doc, deleteDoc, collection } from "firebase/firestore";

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
    // project so no reference to old tasks folder can be made
    console.log("our projUid in deleteProject is ", projUid);
    // Convert taskNum to string to match Firestores datatype; otherwsie error thrown
    await deleteDoc(doc(projCollection, projUid, "tasks", taskNum.toString(10)));

}