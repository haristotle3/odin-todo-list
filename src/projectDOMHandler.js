import EventBus from "./EventBus";
export default class ProjectDOMHandler {
  constructor(project) {
    this.project = project;

    this.root = document.querySelector(".root");
    this.taskListDiv = document.createElement("div");
    this.taskListDiv.classList.add("tasks");

    this.todoItemsContainer = document.createElement("div");
    
    this.taskListDiv.appendChild(this.todoItemsContainer);
    this.root.appendChild(this.taskListDiv);

    EventBus.addEventListener("changeProject", (e) => {
      if (!e.detail) return;

      const newProject = e.detail;
      this.changeCurrentProject(newProject);
    });

    EventBus.addEventListener("deleteProject", (e) => {
      if (e.detail.deletedProjectID !== this.project.getID()) return;

      this.changeCurrentProject(e.detail.firstProject);
    });

    this.addTodoItemClickHandler();
    this.refresh();
  }

  getCurrentProjectID() {
    return this.project.getID();
  }

  changeCurrentProject(newProject) {
    this.project = newProject;
    this.refresh();

    return;
  }

  clearTodoItems() {
    while (this.todoItemsContainer.lastChild) {
      this.todoItemsContainer.removeChild(this.todoItemsContainer.lastChild);
    }

    return;
  }

  refresh() {
    this.clearTodoItems();
    if (this.project === undefined) return;

    const todoItems = this.project.getAllTodos();

    todoItems.forEach((todoItem) => {
      const itemDiv = this.createItemDiv(todoItem);
      this.todoItemsContainer.appendChild(itemDiv);
    });

    return;
  }

  createItemDiv(todoItem) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("todo-item");
    const priority = todoItem.getPriority();
    itemDiv.classList.add(`priority-${priority}`);

    if (todoItem.isComplete()) {
      itemDiv.classList.add("completed");
    }

    itemDiv.dataset.ID = todoItem.getID();

    const checkButton = document.createElement("button");
    checkButton.role = "checkbox";
    checkButton.id = todoItem.getID();

    checkButton.addEventListener("click", () => {
      EventBus.dispatchEvent(
        new CustomEvent("toggleComplete", { detail: { id: todoItem.getID() } })
      );
      itemDiv.classList.toggle("completed");
    });

    const itemTitle = document.createElement("h5");
    itemTitle.textContent = todoItem.getTitle();

    itemDiv.appendChild(checkButton);
    itemDiv.appendChild(itemTitle);
    return itemDiv;
  }

  addTodoItemClickHandler() {
    this.todoItemsContainer.addEventListener("click", (e) => {
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
