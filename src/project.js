export default class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todoItems = [];
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
