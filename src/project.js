class Project {
  constructor() {
    this.todoItems = [];
  }

  addTodoItem(newTodo) {
    this.todoItems.push(newTodo);
  }

  removeItem(todoId) {
    this.todoItems = this.todoItems.filter((element) => element.id !== todoId);
  }
}
