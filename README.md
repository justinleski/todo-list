# todo-list
### Purpose 
The purpose of this project is to further practice with OOP in simple to-do list app. This project requires a lot of manipulation of objects alongside the DOM; posing many challenges for modularity. Moreover, this project incorporates webpack to change project "tabs" when the user creates and selects projects, each with unique task lists.

### Demo
The project demo does not currently exist at this time; please check back later.

### Challenges Faced
- Decoupling in this project I found very challenging. It helped to begin the Single Purpose Principle and create a seperate file for DOM manipulation as it actively forced me to recognize how a function should interact with the program.
- Another method of thinking that helped in creating a more modular program was asking myself if one function "knew" about another. I.e., if there was a call for a function within a function it most likely does not follow the Single Purpose Principle since another function knows about it.
- Hence, I tried to minimize how many functions "know" about each other. There are some cases in the DOM manipulation modules, however this is to be expected when adding `eventListener`s to buttons. 
- Apparently reading the documentation *thoroughly* is hard; the `.splice` method requires the index **first**, followed by the number of elements to remove. I had this logic reversed and wondered why an arbitrary amount of elements were being removed from my array. As it turns out, this is due to a logic errror on my end (and comepetence) in ensuring that I had the method correct.

### What I Would Do Differently
- Instead of using `.addEventListener`, I would bind the function to the class instead which lead to less "pollution" across code.
