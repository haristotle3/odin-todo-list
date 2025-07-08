import { format, compareAsc } from "date-fns";
import EventBus from "./EventBus";

export default class TodoItem {
  constructor(title, description = ``, dueDate = ``, priority = 0) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    this.priority = priority;
    this.notes = ``;
    this.complete = false;

    // This was the cause of race condition.
    // EventBus.addEventListener("toggleComplete", (e) => {
    //   if (this.id === e.detail.id) {
    //     this.toggleComplete();
    //   }
    // });
  }

  toggleComplete() {
    this.complete = !this.complete;
    return;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
    return;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
    return;
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
    return;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
    return;
  }

  updateNotes(newNotes) {
    this.notes = newNotes;
    return;
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
