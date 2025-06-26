export default class TodoItemDOMHandler {
  constructor(todoItem) {
    this.todoItem = todoItem;

    // Get root and create div card
    this.root = document.querySelector(".root");
    this.todoDetailsDiv = document.createElement("div");
    this.todoDetailsDiv.classList.add("task-details");
    // priority
    const taskPriority = this.todoItem.getPriority();
    this.todoDetailsDiv.classList.add(`priority-${taskPriority}`)
    // title
    const todoItemTitle = document.createElement("h2");
    todoItemTitle.textContent = this.todoItem.getTitle();

    // due date
    const dueDateDiv = document.createElement("div");
    const dueDateTitle = document.createElement("h6");
    dueDateTitle.textContent = "DUE DATE";
    const dueDate = document.createElement("p");
    dueDate.textContent = todoItem.getDueDate();

    dueDateDiv.appendChild(dueDateTitle);
    dueDateDiv.appendChild(dueDate);

    // description
    const descriptionDiv = document.createElement("div");
    const descriptionTitle = document.createElement("h6");
    descriptionTitle.textContent = "DESCRIPTION";
    const description = document.createElement("p");
    description.textContent = todoItem.getDescription();

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
    this.todoDetailsDiv.appendChild(todoItemTitle);
    this.todoDetailsDiv.appendChild(dueDateDiv);
    this.todoDetailsDiv.appendChild(descriptionDiv);
    this.todoDetailsDiv.appendChild(notesDiv);

    this.root.appendChild(this.todoDetailsDiv);
  }
}
