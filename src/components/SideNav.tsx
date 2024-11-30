import { SelectedGroupType, GroupedTodos, Todo } from "../types";
import GroupedList from "./GroupedList";

const SideNav = ({
  todos,
  groupedTodos,
  handleSelectGroup,
}: {
  todos: Todo[];
  groupedTodos: GroupedTodos;
  handleSelectGroup: (groupIdentifiers: SelectedGroupType) => void;
}) => {
  const totalCount = todos.length;
  const totalCompleted = todos.filter((todo) => todo.completed).length;

  return (
    <aside>
      <strong>Todos</strong>
      <hr />
      <div>
        <details>
          <GroupedList
            title="All"
            total={totalCount}
            groupedTodos={groupedTodos.all}
            handleSelectGroup={handleSelectGroup}
          />
        </details>
        <details>
          <GroupedList
            title="Completed"
            total={totalCompleted}
            groupedTodos={groupedTodos.completed}
            handleSelectGroup={handleSelectGroup}
          />
        </details>
      </div>
    </aside>
  );
};
export default SideNav;
