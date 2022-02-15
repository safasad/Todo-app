let todos = [];

(function loadTodos() {
  const data = localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : [];
})();

class Todo {
  constructor(name, description, id) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  save() {
    const todo = {
      name: this.name,
      description: this.description,
      id: this.id,
      completed: false,
    };

    todos.push(todo);

    saveToLocalStorage();
  }

  static getAllTodos() {
    return todos;
  }

  static deleteTodo(todoId) {
    todos = todos.filter((todo) => todo.id !== todoId);
    saveToLocalStorage();
  }

  static toggle(todoId) {
    const todo = todos.find((todo) => todo.id === todoId);
    todo.completed = !todo.completed;
    saveToLocalStorage();
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
