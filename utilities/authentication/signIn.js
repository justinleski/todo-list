import { auth, db } from "../../firebaseConfig.js";
//import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore"; 
import { createNewUser } from "../database/storeUser.js";
import { storeNewUser } from "../database/storeUser.js";

export async function signUpWithEmail(userEmail, userPass, userName) {

    // We can repurpose the modal to allow user to input email and password
    createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
        // Create user with firebase
        console.log("Hello you signed in!");
        const user = userCredential.user;

        const userEmail = document.querySelector("#user-email").value;
        const userName = document.querySelector("#user-name").value;

        storeNewUser(user, userEmail, userName);
    })
    .catch((error) => {
        // Alert user if issue with firebase
        alert("There was an error signing you up: "+error.message);
        console.log(error.message);
        console.log(error.message);
    });

    

    // make sure to validate email and make sure password is at least 6 characters

}

