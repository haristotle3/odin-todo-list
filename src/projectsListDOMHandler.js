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
      const projectTitleButtonDiv = document.createElement("div");
      projectTitleButtonDiv.dataset.projID = proj.getID();
      projectTitleButtonDiv.classList.add("project-div");

      const projHeading = document.createElement("h5");
      projHeading.textContent = proj.getName();

      const deleteBtn = document.createElement("button");
      deleteBtn.dataset.projID = proj.getID();
      deleteBtn.textContent = "X";

      deleteBtn.addEventListener("click", () => {
        const deletedProjectID = deleteBtn.dataset.projID;
        this.projLists.removeProject(deleteBtn.dataset.projID);

        // projLists contains another projects array
        // horrible way to do it but it works for now
        // learning shouldn't stop
        EventBus.dispatchEvent(
          new CustomEvent("deleteProject", {
            detail: {
              deletedProjectID,
              firstProject: this.projLists.projects[0],
            },
          })
        );

        this.refresh();
      });

      projectTitleButtonDiv.appendChild(projHeading);
      projectTitleButtonDiv.appendChild(deleteBtn);

      if (!document.querySelector(".current-project"))
        projectTitleButtonDiv.classList.toggle("current-project");

      this.projectsOnlyDiv.appendChild(projectTitleButtonDiv);
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
      if (!e.target.dataset.projID) return;

      const previouslyCurrentProject =
        document.querySelector(".current-project");
      previouslyCurrentProject.classList.toggle("current-project");

      const projectID = e.target.dataset.projID;
      e.target.classList.toggle("current-project");

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
    EventBus.dispatchEvent(
      new CustomEvent("changeProject", { detail: newProject })
    );
    // refresh.
    this.refresh();
    this.addProjectForm.reset();
    this.addProjectForm.classList.toggle("invisible");
    return;
  }
}
