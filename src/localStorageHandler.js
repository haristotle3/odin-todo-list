import EventBus from "./EventBus";
import Project from "./project";
import ProjectsList from "./projectsList";
import TodoItem from "./todoItem";

export default class LocalStorageHandler {
  constructor() {
    EventBus.addEventListener("updateProjList", (e) => {
      const stringified = JSON.stringify(e.detail);
      localStorage.setItem("projList", stringified);
    });
  }

  initializeProjectList() {
    const newProjectList = new ProjectsList();
    const storedProjectList = JSON.parse(localStorage.getItem("projList"));
    
    if (!storedProjectList) return newProjectList;

    storedProjectList.forEach((element) => {
      const newProject = new Project(element.name, element.id);
      element.todoItems.forEach((item) => {
        const newTodoItem = new TodoItem(
          item.title,
          item.description,
          item.dueDate,
          item.priority,
          item.id
        );
        newProject.addTodoItem(newTodoItem);
      });
      newProjectList.addProject(newProject);
    });
    // console.log(newProjectList)
    return newProjectList;
  }
}
