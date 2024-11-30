import { deleteTodo, updateTodo } from "../services/todoService";
import { Todo } from "../types";
import { compareByTodoDate, getDate } from "../utils";

const TodosComponent = ({
  todos,
  openEditTodoForm,
  replaceExistingTodo,
  removeTodo,
}: {
  todos: Todo[];
  openEditTodoForm: (todo: Todo) => void;
  replaceExistingTodo: (newTodo: Todo) => void;
  removeTodo: (id: number) => void;
}) => {
  if (todos.length === 0) {
    return (
      <div>
        <hr />
        <p>There are no todos.</p>
      </div>
    );
  }

  const handleCompleteToggle = async (todo: Todo) => {
    const updatedTodo = await updateTodo(todo.id, {
      completed: !todo.completed,
    });
    replaceExistingTodo(updatedTodo);
  };

  const handleDeleteTodo = async (id: number) => {
    const { success } = await deleteTodo(id);

    if (success) {
      removeTodo(id);
    }
  };

  const uncompleted = todos
    .filter((todo) => !todo.completed)
    .toSorted(compareByTodoDate)
    .map((todo) => {
      return (
        <div key={todo.id}>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                type="checkbox"
                onChange={() => handleCompleteToggle(todo)}
              />
              <span
                style={{ display: "inline" }}
                className="todo"
                onClick={() => openEditTodoForm(todo)}
              >
                {todo.title} - {getDate(todo)}
              </span>
            </div>
            <div onClick={() => handleDeleteTodo(todo.id)}>
              <span className="material-icons icons">delete</span>
            </div>
          </div>
        </div>
      );
    });

  const completed = todos
    .filter((todo) => todo.completed)
    .toSorted(compareByTodoDate)
    .map((todo) => {
      return (
        <div key={todo.id}>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                type="checkbox"
                onChange={() => handleCompleteToggle(todo)}
                checked
              />
              <s
                style={{ display: "inline" }}
                className="todo"
                onClick={() => openEditTodoForm(todo)}
              >
                {todo.title} - {getDate(todo)}
              </s>
            </div>
            <div onClick={() => handleDeleteTodo(todo.id)}>
              <span className="material-icons icons">delete</span>
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {uncompleted}
      {completed}
    </>
  );
};

export default TodosComponent;
