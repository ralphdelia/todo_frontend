import { SyntheticEvent } from "react";
import { useModal } from "../contexts/modalContext";

import { Todo, GroupedTodos, SelectedGroupType } from "../types";

import Modal from "./Modal";
import TodosComponent from "./TodosComponent";
import TodoForm from "./TodoForm";

const MainContent = ({
  groupedTodos,
  selectedGroup,
  addNewTodo,
  removeTodo,
  replaceExistingTodo,
}: {
  groupedTodos: GroupedTodos;
  selectedGroup: SelectedGroupType;
  addNewTodo: (newTodo: Todo) => void;
  removeTodo: (id: number) => void;
  replaceExistingTodo: (newTodo: Todo) => void;
}) => {
  const { openModal } = useModal();
  const { group, date } = selectedGroup;

  let todos = [];
  if (date === null) {
    todos = Object.values(groupedTodos[group]).flat();
  } else {
    todos = groupedTodos[group][date];
  }

  const openNewTodoForm = (event: SyntheticEvent) => {
    event.preventDefault();
    openModal({
      title: "Create a new Todo",
      child: <TodoForm todoActionUpdate={addNewTodo} />,
    });
  };

  const openEditTodoForm = (todo: Todo) => {
    openModal({
      title: `Edit "${todo.title}"`,
      child: <TodoForm todo={todo} todoActionUpdate={replaceExistingTodo} />,
    });
  };

  return (
    <div className="container">
      <h2>
        {group[0].toUpperCase() + group.slice(1)} {date && `- ${date}`}
      </h2>

      <button className="" onClick={openNewTodoForm}>
        <span className="material-icons">add_circle</span>Add new to do
      </button>

      <TodosComponent
        todos={todos}
        openEditTodoForm={openEditTodoForm}
        removeTodo={removeTodo}
        replaceExistingTodo={replaceExistingTodo}
      />

      <Modal />
    </div>
  );
};

export default MainContent;
