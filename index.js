let saveBtn = document.getElementById("save");
let todosUlElement = document.getElementById("EnteredTodos");

const saveHandler = (e) => {
  e.preventDefault();

  // Get values from inputs
  let todoName = document.getElementById("name");
  let todoDescription = document.getElementById("description");
  let id = Math.floor(Math.random() * 500);

  const todo = new Todo(todoName.value, todoDescription.value, id);
  //save the todo
  todo.save();
  todoName.value = "";
  todoDescription.value = "";
  //   alert("Saved Successfully!");

  renderTodos();
};
saveBtn.addEventListener("click", saveHandler);

//* Render all todos
const renderTodos = () => {
  // Empty Ul div
  todosUlElement.innerHTML = "";

  // Load todos
  const todos = Todo.getAllTodos();
  todos.forEach((todo) => {
    //* Render todos
    const todoDiv = document.createElement("div");
    const liElement = document.createElement("li");
    const breakLine = document.createElement("br");
    liElement.innerHTML = `Title: ${todo.name}`;
    liElement.appendChild(breakLine);
    liElement.innerHTML += `Description: ${todo.description}`;

    if (todo.completed) {
      liElement.classList.add("li-decoration");
    }
    todoDiv.classList.add("todo-div");
    todoDiv.appendChild(liElement);
    todosUlElement.appendChild(todoDiv);

    //* Handle toggle
    todoDiv.addEventListener("dblclick", () => {
      Todo.toggle(todo.id);
      liElement.classList.toggle("li-decoration");
    });

    // Handle delete todo
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add("delete_btn");
    deleteBtn.addEventListener("click", (e) => {
      Todo.deleteTodo(todo.id);
      renderTodos();
    });
    liElement.appendChild(deleteBtn);
  });
};

renderTodos();
