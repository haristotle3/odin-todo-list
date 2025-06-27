import EventBus from "./EventBus";
export default class ProjectDOMHandler {
  constructor(project) {
    this.project = project;

    this.root = document.querySelector(".root");
    this.taskListDiv = document.createElement("div");
    this.taskListDiv.classList.add("tasks");

    this.root.appendChild(this.taskListDiv);

    EventBus.addEventListener("changeProject", (e) => {
      if (!e.detail) return;

      const newProject = e.detail;
      this.changeCurrentProject(newProject);
    });

    this.addTodoItemClickHandler();
    this.refresh();
  }

  changeCurrentProject(newProject) {
    this.project = newProject;
    this.refresh();

    return;
  }

  clearTodoItems() {
    while (this.taskListDiv.lastChild) {
      this.taskListDiv.removeChild(this.taskListDiv.lastChild);
    }

    return;
  }

  refresh() {
    this.clearTodoItems();

    const todoItems = this.project.getAllTodos();

    todoItems.forEach((todoItem) => {
      const itemDiv = this.createItemDiv(todoItem);
      this.taskListDiv.appendChild(itemDiv);
    });

    return;
  }

  createItemDiv(todoItem) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("todo-item");
    const priority = todoItem.getPriority();
    itemDiv.classList.add(`priority-${priority}`);

    itemDiv.dataset.ID = todoItem.getID();

    const checkButton = document.createElement("button");
    checkButton.role = "checkbox";
    checkButton.id = todoItem.getID();

    const itemTitle = document.createElement("h5");
    itemTitle.textContent = todoItem.getTitle();

    itemDiv.appendChild(checkButton);
    itemDiv.appendChild(itemTitle);
    return itemDiv;
  }

  addTodoItemClickHandler() {
    this.taskListDiv.addEventListener("click", (e) => {
      const todoItemID = e.target.dataset.ID;
      if (!todoItemID) return;

      const clickedTodoItem = this.project
        .getAllTodos()
        .filter((ele) => ele.getID() === todoItemID)[0];

      EventBus.dispatchEvent(
        new CustomEvent("changeTodoItem", { detail: clickedTodoItem })
      );
    });
  }
}
