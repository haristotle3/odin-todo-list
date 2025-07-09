import EventBus from "./EventBus";
import { format, compareAsc } from "date-fns";

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

  createLabel(forAttr, textContent) {
    const label = document.createElement("label");
    label.htmlFor = forAttr;
    label.textContent = textContent;

    return label;
  }

  createInput(type, name, id) {
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;

    return input;
  }

  getDateFromString(dueDateString) {
    const strArr = dueDateString.split("-");
    const intArr = strArr.map((ele) => Number(ele));

    const newDate = format(
      new Date(intArr[0], intArr[1] - 1, intArr[2]),
      "dd/MM/yyyy"
    );

    return newDate;
  }

  createDialogBox() {
    const dialog = document.createElement("dialog");

    const form = document.createElement("form");
    form.method = "dialog";

    const title = this.createLabel("title", "Title:");
    const titleInput = this.createInput("text", "title", "title");

    const dueDate = this.createLabel("date", "Due Date:");
    const dueDateInput = this.createInput("date", "date", "date");
    dueDateInput.value = "2003-10-31";
    const description = this.createLabel("description", "Description:");
    const descriptionInput = this.createInput(
      "textarea",
      "description",
      "description"
    );

    const notes = this.createLabel("notes", "Notes:");
    const notesInput = this.createInput("textarea", "notes", "notes");

    const priority = this.createLabel("priority", "Priority:");
    const priorityInput = this.createInput("number", "priority", "priority");
    priorityInput.value = "0";
    priorityInput.min = "0";
    priorityInput.max = "5";

    const submitBtn = this.createInput("submit");

    form.appendChild(title);
    form.appendChild(titleInput);
    form.appendChild(dueDate);
    form.appendChild(dueDateInput);
    form.appendChild(description);
    form.appendChild(descriptionInput);
    form.appendChild(notes);
    form.appendChild(notesInput);
    form.appendChild(priority);
    form.appendChild(priorityInput);
    form.appendChild(submitBtn);

    form.addEventListener("submit", () => {
      const newTitle = document.getElementById("title").value;
      const newDueDateString = document.getElementById("date").value;
      const newDueDate = this.getDateFromString(newDueDateString);
      const newDesc = document.getElementById("description").value;
      const newNotes = document.getElementById("notes").value;
      const newPriority = document.getElementById("priority").value;

      if (newTitle) this.todoItem.updateTitle(newTitle);

      if (newDesc) this.todoItem.updateDescription(newDesc);

      if (newDueDate) this.todoItem.updateDueDate(newDueDate);

      if (newNotes) this.todoItem.updateNotes(newNotes);

      if (priority) this.todoItem.updatePriority(Number(newPriority));

      this.refresh();
      EventBus.dispatchEvent(new CustomEvent("refreshRequest"));
      EventBus.dispatchEvent(new CustomEvent("updateItem"));
      form.reset();
    });

    dialog.appendChild(form);
    return dialog;
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

    // dialog box
    const dialogBox = this.createDialogBox();
    // edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
      dialogBox.showModal();
    });

    // append children
    this.todoDetailsDiv.appendChild(titleDiv);
    this.todoDetailsDiv.appendChild(dueDateDiv);
    this.todoDetailsDiv.appendChild(descriptionDiv);
    this.todoDetailsDiv.appendChild(notesDiv);
    this.todoDetailsDiv.appendChild(editBtn);
    this.todoDetailsDiv.appendChild(dialogBox);
    return;
  }
}
