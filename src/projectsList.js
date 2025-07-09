import EventBus from "./EventBus";

export default class ProjectsList {
  constructor() {
    this.projects = [];
    EventBus.addEventListener("updateItem", () => {
      EventBus.dispatchEvent(
        new CustomEvent("updateProjList", { detail: this.projects })
      );
    });
  }

  getAllProjects() {
    return this.projects;
  }

  addProject(newProject) {
    this.projects.push(newProject);
    EventBus.dispatchEvent(
      new CustomEvent("updateProjList", { detail: this.projects })
    );
    return;
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
    EventBus.dispatchEvent(
      new CustomEvent("updateProjList", { detail: this.projects })
    );
    return;
  }
}
