import { db } from "../../firebaseConfig.js";
import { collection, setDoc, doc } from "firebase/firestore"; 

export async function storeUserProject(user, project) {

    try{
        const projCollection = collection(db, "users", user.uid, "projects");

        // Generate unqiue project id
        const projUniqueId = generateUniqueId();

         // Add a new document in collection "users"
        const projRef = await setDoc(doc(projCollection, projUniqueId), { // TODO; we cannot store Objects in Firebase, we must make another subfolder an then a unique id to correspond
            project: project,
            projMade: Date.now(),
            projUid: projUniqueId,
        });
    } catch (error) {
        console.error("Error storing the data: "+error);
        throw new Error("Failed to store item");
    }
    
}

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}