import { auth } from "../../firebaseConfig.js";
//import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore"; 
import { createNewUser } from "../database/storeUser.js";
import { storeNewUser } from "../database/storeUser.js";



export async function signUpWithEmail(userEmail, userPass, userName) {

    // Convert anonymous sign in to new user data
    const credential = EmailAuthProvider.credential(userEmail, userPass);

    linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {
        const user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
    }).catch((error) => {
        console.log("Error upgrading anonymous account", error);
    });

    // 
    // createUserWithEmailAndPassword(auth, userEmail, userPass)
    // .then((userCredential) => {
    //     // Create user with firebase
    //     console.log("Hello you signed in!");
    //     const user = userCredential.user;

    //     storeNewUser(user, userEmail, userName);
    // })
    // .catch((error) => {
    //     // Alert user if issue with firebase
    //     alert("There was an error signing you up: "+error.message);
    // });

    

    // make sure to validate email and make sure password is at least 6 characters

}

export async function signInWithEmail(userEmail, userPass) {
    signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
        console.log("wecome back"); // use auth state changed to load data
    })
    .catch((error) => {
          // Alert user if issue with firebase
          alert("There was an error signing you up: "+error.message);
    });
}

