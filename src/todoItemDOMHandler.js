import EventBus from "./EventBus";

export default class TodoItemDOMHandler {
  constructor(todoItem) {
    this.todoItem = todoItem;

    // Get root and create div card
    this.root = document.querySelector(".root");
    this.todoDetailsDiv = document.createElement("div");
    this.todoDetailsDiv.classList.add("task-details");

    EventBus.addEventListener("changeTodoItem", (e) => {
      const newTodoItem = e.detail;
      this.changeCurrentTodoItem(newTodoItem);
    });

    EventBus.addEventListener("toggleComplete", (e) => {
      if (e.detail.id === this.todoItem.getID()) {
        this.todoItem.toggleComplete();
        this.refresh();
      }
    });

    EventBus.addEventListener("deleteTodoItem", (e) => {
      if (this.todoItem.getID() !== e.detail.itemID) return;

      this.changeCurrentTodoItem(e.detail.firstTodoItem);
    });

    this.root.appendChild(this.todoDetailsDiv);
    this.refresh();
  }

  changeCurrentTodoItem(newTodoItem) {
    this.todoItem = newTodoItem;
    this.refresh();
    return;
  }

  clearTodoDetails() {
    while (this.todoDetailsDiv.lastChild) {
      this.todoDetailsDiv.removeChild(this.todoDetailsDiv.lastChild);
    }
    return;
  }

  refresh() {
    this.clearTodoDetails();
    if (!this.todoItem) return;
    // priority
    const taskPriority = this.todoItem.getPriority();
    // remove old priorities
    this.todoDetailsDiv.classList.remove(
      `priority-0`,
      `priority-1`,
      `priority-2`,
      `priority-3`,
      `priority-4`,
      `priority-5`
    );
    // add new priority
    this.todoDetailsDiv.classList.add(`priority-${taskPriority}`);

    // title and compeleted checkbox
    const titleDiv = document.createElement("div");
    titleDiv.style.display = "flex";
    titleDiv.style.justifyContent = "space-between";
    // title
    const todoItemTitle = document.createElement("h2");
    todoItemTitle.textContent = this.todoItem.getTitle();
    // checkbox
    const checkBox = document.createElement("h2");

    if (this.todoItem.isComplete()) checkBox.textContent = "✅";
    else checkBox.textContent = "";

    titleDiv.appendChild(todoItemTitle);
    titleDiv.appendChild(checkBox);

    // due date
    const dueDateDiv = document.createElement("div");
    const dueDateTitle = document.createElement("h6");
    dueDateTitle.textContent = "DUE DATE";
    const dueDate = document.createElement("p");
    dueDate.textContent = this.todoItem.getDueDate();

    dueDateDiv.appendChild(dueDateTitle);
    dueDateDiv.appendChild(dueDate);

    // description
    const descriptionDiv = document.createElement("div");
    const descriptionTitle = document.createElement("h6");
    descriptionTitle.textContent = "DESCRIPTION";
    const description = document.createElement("p");
    description.textContent = this.todoItem.getDescription();

    descriptionDiv.appendChild(descriptionTitle);
    descriptionDiv.appendChild(description);

    // notes
    const notesDiv = document.createElement("div");
    const notesTitle = document.createElement("h6");
    notesTitle.textContent = "NOTES";
    const notes = document.createElement("p");
    notes.textContent = this.todoItem.getNotes();

    notesDiv.appendChild(notesTitle);
    notesDiv.appendChild(notes);

    // append children
    this.todoDetailsDiv.appendChild(titleDiv);
    this.todoDetailsDiv.appendChild(dueDateDiv);
    this.todoDetailsDiv.appendChild(descriptionDiv);
    this.todoDetailsDiv.appendChild(notesDiv);
    return;
  }
}
