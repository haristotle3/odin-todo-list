import { format, compareAsc } from "date-fns";
export default class TodoItem {
  constructor(title, description = ``, dueDate = ``, priority = 0) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    this.priority = priority;
    this.notes = ``;
    this.complete = false;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateNotes(newNotes) {
    this.notes = newNotes;
  }

  getID() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.priority;
  }

  getNotes() {
    return this.notes;
  }

  isComplete() {
    return this.complete;
  }
}
