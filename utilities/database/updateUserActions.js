// todo update task when:
// - Project update when Notes edited
// - When task checked, store in db
import { doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const checkTask = async(projCollection, projUid, taskIndex, compState) => {

    // Get reference to the task document to update:
    const newReference = collection(projCollection, projUid, "tasks");
    const taskRef = doc(newReference,  taskIndex.toString(10));

    await updateDoc(taskRef, {
        completed: compState
    });
}

export const updateNotes = async(projCollection, currentProject) => {

    // Get reference to the task document to update:
    const proj = doc(projCollection, currentProject.uid);

    await updateDoc(proj, {
        notes: currentProject.notes
    });

}