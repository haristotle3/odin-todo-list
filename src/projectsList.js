export default class ProjectsList {
  constructor() {
    this.projects = [];
  }

  getAllProjects() {
    return this.projects;
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }
}
