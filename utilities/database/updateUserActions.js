// todo update task when:
// - Project update when Notes edited
// - When task checked, store in db
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const checkTask = async(taskBtn, taskNum, compState) => {

    // Get reference to the task document to update:
    const task = doc();

    await updateDoc(task, {
        completed: compState
    });
}

export const updateNotes = async(newString) => {

    // Get reference to the task document to update:
    const task = doc();

    await updateDoc(notes, {
        notes: newString
    })

}