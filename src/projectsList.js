export default class ProjectsList {
  constructor() {
    this.projects = [];
  }

  getProjects() {
    return this.projects;
  }

  addProjects(newProject) {
    this.projects.push(newProject);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }
}
