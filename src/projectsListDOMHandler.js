import projectIcon from "./assets/project.svg";

export default class ProjectsListDOMHandler {
  constructor(projectList) {
    this.projLists = projectList;

    this.root = document.querySelector(".root");
    this.projListDiv = document.createElement("div");
    this.projListDiv.classList.add("project-list");

    this.projectHeading = document.createElement("h3");
    this.projectHeading.textContent = "Projects";

    this.projectHeadIcon = document.createElement("img");
    this.projectHeadIcon.src = projectIcon;

    this.projectHeading.appendChild(this.projectHeadIcon);
    this.projListDiv.appendChild(this.projectHeading);

    this.root.appendChild(this.projListDiv);
    this.refresh();
  }

  refresh() {
    // remove all project titles
    this.removeProjectTitles();

    // get all project titles
    const projectTitles = this.projLists
      .getAllProjects()
      .map((proj) => proj.getName());

    // display all project titles in the project-list div
    projectTitles.forEach((projName) => {
      const projHeading = document.createElement("h5");
      projHeading.textContent = projName;
      this.projListDiv.appendChild(projHeading);
    });

    return;
  }

  removeProjectTitles() {
    while (this.projListDiv.lastChild) {
      const removedChild = this.projListDiv.removeChild(
        this.projListDiv.lastChild
      );
      if (!this.projListDiv.lastChild) {
        this.projListDiv.appendChild(removedChild);
        break;
      }
    }

    return;
  }
}
