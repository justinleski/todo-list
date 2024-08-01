import { auth, db } from "../../firebaseConfig.js";
//import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

export async function signUpWithEmail(userEmail, userPass) {

    // We can repurpose the modal to allow user to input email and password
    createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
        // Create user with firebase
        const user = userCredential.user;
        console.log("User is: "+user);

        // Do we even have to 
        // // Use imported database to save user to a user collection
        // var docRef = await addDoc(collection(db, "users"), {
        //     email: userEmail,
        //     password: userPass, // maybe dont save password lol?
        //     lastLogin: Date.now()
        // });
    })
    .catch((error) => {
        // Alert user if issue with firebase
        alert("There was an error signing you up: "+error.message);
        console.log(error.message);
        console.log(error.message);
    });

    // make sure to validate email and make sure password is at least 6 characters

}

