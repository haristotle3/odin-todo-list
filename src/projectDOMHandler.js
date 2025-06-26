export default class ProjectDOMHandler {
  constructor(project) {
    this.project = project;

    this.root = document.querySelector(".root");
    this.taskListDiv = document.createElement("div");
    this.taskListDiv.classList.add("tasks");

    this.root.appendChild(this.taskListDiv);
    this.refresh();
  }

  changeCurrentProject(newProject) {
    this.project = newProject;
    this.refresh();
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
  }

  createItemDiv(todoItem) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("todo-item");
    const priority = todoItem.getPriority();
    itemDiv.classList.add(`priority-${priority}`);

    const checkButton = document.createElement("button");
    checkButton.role = "checkbox";
    checkButton.id = todoItem.getID();

    const itemTitle = document.createElement("h5");
    itemTitle.textContent = todoItem.getTitle();

    itemDiv.appendChild(checkButton);
    itemDiv.appendChild(itemTitle);
    return itemDiv;
  }
}
