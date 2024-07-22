import "../style.css";

const makeModal = () => {

    const p = document.createElement("p");
    p.classList.add("test");
    p.textContent = "Hello";
    return p;

}

const updateProjList = (projects) => {
    var list = document.querySelector("#projList");
    clearContent(list);

    console.log(projects);

    // `projects` is an array containing the list of project objects
    projects.forEach((project) => {
        var name = document.createElement("h3")
        name.textContent = project.name;;
        list.appendChild(name);
    });

}

function clearContent(content) {
    content.replaceChildren();
}

export { makeModal, updateProjList };