import EventBus from "./EventBus";
export default class ProjectDOMHandler {
  constructor(project) {
    this.project = project;

    this.root = document.querySelector(".root");
    this.taskListDiv = document.createElement("div");
    this.taskListDiv.classList.add("tasks");

    this.todoItemsContainer = document.createElement("div");

    this.addTodoDiv = document.createElement("div");

    this.addItemForm = document.createElement("form");

    this.addTodoItemInput = document.createElement("input");
    this.addTodoItemInput.id = "taskTitle";
    this.addTodoItemInput.placeholder = "+ Add Task";

    this.addTodoItemButton = document.createElement("input");
    this.addTodoItemButton.type = "submit";
    this.addTodoItemButton.value = "+Add";

    this.addItemForm.appendChild(this.addTodoItemInput);
    this.addItemForm.appendChild(this.addTodoItemButton);
    this.addTodoDiv.appendChild(this.addItemForm);

    this.addItemForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskInput = document.getElementById("taskTitle");
      if (!taskInput.value) return;

      EventBus.dispatchEvent(
        new CustomEvent("createTodoItem", {
          detail: { projID: this.project.getID(), taskTitle: taskInput.value },
        })
      );
      this.addItemForm.reset();
      this.refresh();
    });

    this.taskListDiv.appendChild(this.todoItemsContainer);
    this.taskListDiv.appendChild(this.addTodoDiv);
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

    checkButton.addEventListener("click", (e) => {
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
