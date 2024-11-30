import { Todo, GroupedTodos, NewTodoType } from "./types";

export function groupByDate(todos: Todo[]) {
  const groupedTodos: { [k: string]: Todo[] } = {};

  todos.forEach((todo) => {
    const date = getDate(todo);
    groupedTodos[date] =
      date in groupedTodos ? [...groupedTodos[date], todo] : [todo];
  });
  return groupedTodos;
}

export function groupTodos(todos: Todo[]): GroupedTodos {
  const groupedTodos: GroupedTodos = {
    all: {},
    completed: {},
  };

  const completed = todos.filter((todo) => todo.completed);

  groupedTodos.all = groupByDate(todos);
  groupedTodos.completed = groupByDate(completed);

  return groupedTodos;
}

export function getDate(todo: Todo) {
  const noDueDate = todo.month === "" || todo.year === "";
  return noDueDate ? "No Due Date" : `${todo.month}/${todo.year}`;
}

export function formatNewTodo(newTodo: NewTodoType) {
  const { title, date, description, completed } = newTodo;
  const [year, month, day] = date.split("-");

  if ("completed" in newTodo) {
    return { month, day, year, title, description, completed };
  }
  return { description, month, day, year, title };
}

export const compareByTodoDate = (a: Todo, b: Todo) => {
  const aMonth = parseInt(a.month, 10);
  const aYear = parseInt(a.year, 10);
  const bMonth = parseInt(b.month, 10);
  const bYear = parseInt(b.year, 10);

  if (aYear === bYear && aMonth === bMonth) {
    return 0;
  }

  if (aYear === bYear) {
    return aMonth > bMonth ? 1 : -1;
  }

  return aYear > bYear ? 1 : -1;
};
