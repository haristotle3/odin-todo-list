import EventBus from "./EventBus";
import TodoItem from "./todoItem";
export default class Project {
  constructor(name, id) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.todoItems = [];

    EventBus.addEventListener("createTodoItem", (e) => {
      if (this.id !== e.detail.projID) return;

      this.addTodoItem(new TodoItem(e.detail.taskTitle));
    });
  }

  getAllTodos() {
    return this.todoItems;
  }

  addTodoItem(newTodo) {
    this.todoItems.push(newTodo);
    return;
  }

  removeItem(todoId) {
    this.todoItems = this.todoItems.filter((element) => element.id !== todoId);
    return;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
