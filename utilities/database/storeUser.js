import { collection, setDoc, doc, addDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig.js";

export async function storeNewUser(user, userEmail, userName) {

    try{
        // Make reference to users collection
        // const userCollection = collection(db, "users");

        const userData = {
            name: userName,
            email: userEmail,
            lastLogin: Date.now()
        }

         // Add a new document in collection "users"
        await setDoc(doc(db, "users", user.uid), userData); // setDoc since we already have unique id

    } catch (error) {
        console.error("Error storing the data: "+error);
        throw new Error("Failed to store item");
    }
    
}

