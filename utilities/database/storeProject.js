import { db } from "../../firebaseConfig.js";
import { collection, setDoc, doc, addDoc } from "firebase/firestore"; 

export async function storeUserProject(user, project) {

    try{
        // Make reference to users collection
        const projCollection = collection(db, "users", user.uid, "projects");

        // Generate unqiue project id
        //const projUniqueId = generateUniqueId();

         // Add a new document in collection "users"
        const projRef = await addDoc(doc(projCollection, projUniqueId), {
            project: project,
            projMade: Date.now(),
            //uid: projUniqueId,
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