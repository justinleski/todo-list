import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig.js"; 

// Detetc auth state
onAuthStateChanged(auth, (user) => {

    // Check if user not signed in
    if(user == null) {
      console.log("user not signed in");
        return;
    } 
    // Check if user is signed in, then we can store their data in the db
    else if (user) {
      console.log("Currently signed in is: "+user);
    }

    // const { uid } = user;
    // const expensesCol = collection(db, `users/${uid}/expenses`)
});

//const auth = getAuth();
// signInAnonymously(auth)
//   .then(() => {
//     // Signed in..
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });