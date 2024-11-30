import { useEffect, useState } from "react";

import { SelectedGroupType, GroupedTodos, Todo } from "./types";

import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import TopNav from "./components/TopNav";
import { ModalProvider } from "./contexts/modalContext";

import { getAll } from "./services/todoService";
import { groupTodos } from "./utils";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [groupedTodos, setGroupedTodos] = useState<GroupedTodos>({
    all: {},
    completed: {},
  });
  const [selectedGroup, setSelectedGroup] = useState<SelectedGroupType>({
    group: "all",
    date: null,
  });

  useEffect(() => {
    getAll().then((todos) => {
      setTodos(todos);
    });
  }, []);

  useEffect(() => {
    // format todos
    const newGroupedTodos = groupTodos(todos);
    setGroupedTodos(newGroupedTodos);

    // Ensures that the selected group and date remain valid by deselecting any
    // date that no longer has associated todos after the todos list is updated.
    const { group, date } = selectedGroup;
    if (date !== null && newGroupedTodos[group][date] === undefined) {
      setSelectedGroup({ group, date: null });
    }
  }, [todos]);

  const handleSelectGroup = (groupIdentifiers: SelectedGroupType) => {
    const { group, date } = groupIdentifiers;
    if (date !== null && !(date in groupedTodos[group])) {
      throw Error("Invalid Date passes as a group identifier");
    }
    setSelectedGroup(groupIdentifiers);
  };

  const addNewTodo = (newTodo: Todo) => {
    setTodos((current) => [...current, newTodo]);
  };

  const replaceExistingTodo = (updatedTodo: Todo) => {
    setTodos((current) => [
      ...current.filter((t) => t.id !== updatedTodo.id),
      updatedTodo,
    ]);
  };

  const removeTodo = (id: number) => {
    setTodos((current) => {
      return current.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <ModalProvider>
        <div className="container">
          <TopNav />
          <div style={{ display: "flex" }}>
            <SideNav
              handleSelectGroup={handleSelectGroup}
              todos={todos}
              groupedTodos={groupedTodos}
            />
            <MainContent
              addNewTodo={addNewTodo}
              removeTodo={removeTodo}
              replaceExistingTodo={replaceExistingTodo}
              selectedGroup={selectedGroup}
              groupedTodos={groupedTodos}
            />
          </div>
        </div>
      </ModalProvider>
    </>
  );
}

export default App;
