import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js"; 

// Detetc auth state
onAuthStateChanged(auth, (user) => {

    // Check if user not signed in
    if(user) {
        //storeNewUser(user.uid, userEmail, userName);
        console.log("We got the usr unAuthststaeChnaged: "+user.email);
    } 
    else {
      // If user is not signed in, sign them in anonymously
      console.log("user not signed in");
      signInAnonymously(auth)
      .then(() => {
          // Signed in..
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
    // ...
});
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