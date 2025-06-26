export default class ProjectDOMHandler {
  constructor(project) {
    this.project = project;

    this.root = document.querySelector(".root");
    this.taskListDiv = document.createElement("div");
    this.taskListDiv.classList.add("tasks");

    const todoItems = this.project.getAllTodos();

    todoItems.forEach((todoItem) => {
      const itemDiv = this.createItemDiv(todoItem);
      this.taskListDiv.appendChild(itemDiv);
    });

    this.root.appendChild(this.taskListDiv);
  }

  createItemDiv(todoItem) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("todo-item");

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
