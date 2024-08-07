import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js"; 
import { loadProjectFromFirestore } from "./utilities/database/loadProject.js"
import { projects } from "../../src/index.js";
import { displayProj } from "./src/modules/domManipulator.js"

// Detetc auth state
onAuthStateChanged(auth, (user) => {

    console.log("unAuthStateCHnaged ",user);

    // Check if user not signed in
    if(user) {
        //storeNewUser(user.uid, userEmail, userName);
        console.log("We got the usr unAuthststaeChnaged: "+user.email);
        projects = loadProjectFromFirestore();
        projects.forEach((project) => {
            updateProjList(project);
        });
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