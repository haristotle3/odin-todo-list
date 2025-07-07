import projectIcon from "./assets/project.svg";
import EventBus from "./EventBus.js";
import Project from "./project.js";
export default class ProjectsListDOMHandler {
  constructor(projectList) {
    this.projLists = projectList;

    this.root = document.querySelector(".root");

    this.projectHeading = document.createElement("h3");
    this.projectHeading.textContent = "Projects ";

    this.projectHeadIcon = document.createElement("img");
    this.projectHeadIcon.src = projectIcon;

    this.projectHeading.appendChild(this.projectHeadIcon);

    this.projListDiv = document.createElement("div");
    this.projListDiv.classList.add("project-list-container");

    this.projectsOnlyDiv = document.createElement("div");
    this.projectsOnlyDiv.classList.add("project-list");

    this.addProjectForm = document.createElement("form");
    this.projNameInput = document.createElement("input");
    this.projNameInput.type = "text";
    this.projNameInput.id = "proj-name";
    this.projNameInput.placeholder = "Project Name";

    this.projSubmitButton = document.createElement("input");
    this.projSubmitButton.type = "submit";

    this.addProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.projSubmissionHandler();
    });

    this.addProjectForm.appendChild(this.projNameInput);
    this.addProjectForm.appendChild(this.projSubmitButton);
    this.addProjectForm.classList.add("invisible");

    this.addProjectsButton = document.createElement("button");
    this.addProjectsButton.textContent = "+ Add Project";

    this.addProjectsButton.addEventListener("click", () => {
      this.addProjectForm.classList.toggle("invisible");
    });

    this.projListDiv.appendChild(this.projectHeading);
    this.projListDiv.appendChild(this.projectsOnlyDiv);
    this.projListDiv.appendChild(this.addProjectForm);
    this.projListDiv.appendChild(this.addProjectsButton);
    this.root.appendChild(this.projListDiv);

    this.projectItemClickHandler();
    this.refresh();
  }

  refresh() {
    // remove all project titles
    this.removeProjectTitles();

    // get all project titles
    const projectTitles = this.projLists.getAllProjects();

    // display all project titles in the project-list div
    projectTitles.forEach((proj) => {
      const projHeading = document.createElement("h5");
      projHeading.textContent = proj.getName();
      projHeading.dataset.projID = proj.getID();
      this.projectsOnlyDiv.appendChild(projHeading);
    });

    return;
  }

  getProjectFromID(projectID) {
    return this.projLists
      .getAllProjects()
      .filter((proj) => proj.getID() === projectID)[0];
  }

  projectItemClickHandler() {
    this.projListDiv.addEventListener("click", (e) => {
      const projectID = e.target.dataset.projID;

      const clickedProject = this.getProjectFromID(projectID);

      EventBus.dispatchEvent(
        new CustomEvent("changeProject", { detail: clickedProject })
      );
    });
  }

  removeProjectTitles() {
    while (this.projectsOnlyDiv.lastChild) {
      const removedChild = this.projectsOnlyDiv.removeChild(
        this.projectsOnlyDiv.lastChild
      );
    }

    return;
  }

  projSubmissionHandler() {
    const newProjName = this.projNameInput.value;
    // create project
    const newProject = new Project(newProjName);
    // add project to project list
    this.projLists.addProject(newProject);

    // refresh.
    this.refresh();
    this.addProjectForm.reset();
    this.addProjectForm.classList.toggle("invisible");
    return;
  }
}
