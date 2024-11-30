import { useModal } from "../contexts/modalContext";
import useTodoForm from "../hooks/useTodoForm";

import Input from "./Input";

import { Todo, NewTodoSchema } from "../types";
interface TodoProps {
  todo?: Todo;
  todoActionUpdate: (newTodo: Todo) => void;
}

const TodoForm: React.FC<TodoProps> = ({ todo, todoActionUpdate }) => {
  const existingTodo = todo
    ? { ...todo, date: `${todo.year}-${todo.day}-${todo.month}` }
    : undefined;

  const existingErrors: {
    title: string[] | undefined;
    date: string[] | undefined;
  } = { title: undefined, date: undefined };

  if (existingTodo) {
    const titleResult = NewTodoSchema.shape.title.safeParse(existingTodo.title);
    const dateResult = NewTodoSchema.shape.date.safeParse(existingTodo.date);

    existingErrors.title = titleResult.success
      ? []
      : titleResult.error.issues.map((e) => e.message);

    existingErrors.date = dateResult.success
      ? []
      : dateResult.error.issues.map((e) => e.message);
  }

  const {
    newTodo,
    errors,
    handleChange,
    markComplete,
    handleUpdateExisting,
    handleCreateNew,
  } = useTodoForm({ existingTodo, existingErrors, todoActionUpdate });
  const { closeModal } = useModal();

  const disableSubmit =
    errors.title === undefined ||
    (errors.title && errors.title.length !== 0) ||
    errors.date === undefined ||
    (errors.date && errors.date.length !== 0);

  return (
    <>
      <form onSubmit={existingTodo ? handleUpdateExisting : handleCreateNew}>
        <label>
          Title{" "}
          <Input
            errors={errors.title}
            value={newTodo.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "title")
            }
            type="text"
          />
        </label>
        <label>
          Due Date{" "}
          <Input
            errors={errors.date}
            value={newTodo.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "date")
            }
            type="date"
          />
        </label>
        <label>
          Description
          <textarea
            value={newTodo.description}
            onChange={(e) => handleChange(e, "description")}
            name="desc"
          ></textarea>
        </label>
        <div className="grid">
          {disableSubmit ? (
            <button className="primary" disabled>
              Save
            </button>
          ) : (
            <button className="primary">Save</button>
          )}
          {existingTodo ? (
            <button className="secondary" onClick={markComplete}>
              Mark As Complete
            </button>
          ) : (
            <button className="secondary" onClick={closeModal}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};
export default TodoForm;
