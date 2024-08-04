# todo-list
### Purpose 
The purpose of this project is to further practice with OOP in simple to-do list app. This project requires a lot of manipulation of objects alongside the DOM; posing many challenges for modularity. Moreover, this project incorporates webpack to change project "tabs" when the user creates and selects projects, each with unique task lists. Moreover, Firebase's Firestore is utilized to store user data and allow the user to log in.

### Demo
The project demo does not currently exist at this time; please check back later.

### Challenges Faced
- Decoupling in this project I found very challenging. It helped to begin the Single Purpose Principle and create a seperate file for DOM manipulation as it actively forced me to recognize how a function should interact with the program.
- Another method of thinking that helped in creating a more modular program was asking myself if one function "knew" about another. I.e., if there was a call for a function within a function it most likely does not follow the Single Purpose Principle since another function knows about it.
- Hence, I tried to minimize how many functions "know" about each other. There are some cases in the DOM manipulation modules, however this is to be expected when adding `eventListener`s to buttons. 
- Apparently reading the documentation *thoroughly* is hard; the `.splice` method requires the index **first**, followed by the number of elements to remove. I had this logic reversed and wondered why an arbitrary amount of elements were being removed from my array. As it turns out, this is due to a logic errror on my end (and comepetence) in ensuring that I had the method correct.

#### Objects
- When creating the `task` object I stored the input field rather than the value of the input field meaning every time I wanted to access a field in the task I had to add `.value`. In hindsight, altering my function which creates tasks to read in the value would be of great benefit

#### Firebase
- I tried to integrate Firebase into my project, hoping to teach myself a new technology.
- This was quite the headache, I spent what I believe to be a collective 10 hours attempting to configure and debug Firebase - Firebase was supposed to make databases easy, right?
- As it turns out, being new to Firebase, I somehow set my Firestore DB to **Datastore** mode.
- After reconfiguring my project (making a new one on the Firebase console and importing that config to my project) I did it; I managed to write to Firebase.
- Integrating Firebase because of this mishap caused me *a lot* of confusion, primarily in the vague-ish error code: 400 (Bad Request)
- Typically this error code is associated with bad data being fed to Firebase (such as undefined values) but I could not have imagined this.
- Perhaps, I will look back a few years and find this struggle funny - but at the current moment this was disastorous as it made no sense due to my limited knowledge of databases.
- Debugging this issue was difficult, but persistance was key to being able to sleep soundly (Not thinking "why is this code not working" for hours past bed time).

### What I Would Do Differently
- Instead of using `.addEventListener`, I would bind the function to the class instead which lead to less "pollution" across code.
- It actually seems I may be able to refactor this code - when integrating Firebase I just used `querySelector`after the modal was populated to add my `eventListener` and functionality to the corresponding buttons on the modal.

### TODO
- Load projects and tasks from DB to web page
- Display loaded projects/tasks
- Anonymous auth
- If user is signed in, show user that they are and have a sign out button