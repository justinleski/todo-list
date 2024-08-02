import { setDoc, doc } from "firebase/firestore"; 
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

        console.log("user uid: ", user.uid);
        console.log("userData is: ", userData);
        console.log("db is: ", db);

         // Add a new document in collection "users"
        await setDoc(doc(db, "users", user.uid), userData); // setDoc since we already have unique id

    } catch (error) {
        console.error("Error storing the data: "+error);
        console.error("Error storing the data: "+error.code);
        console.error("Error storing the data: "+error.message);
        if (error.details) {
            console.error("Error Details:", error.details);
        }
        throw new Error("Failed to store item");
    }
    
}

