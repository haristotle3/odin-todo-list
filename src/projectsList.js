import EventBus from "./EventBus";

export default class ProjectsList {
  constructor() {
    this.projects = [];

  }

  getAllProjects() {
    return this.projects;
  }

  addProject(newProject) {
    this.projects.push(newProject);
    return;
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
    return;
  }
}
