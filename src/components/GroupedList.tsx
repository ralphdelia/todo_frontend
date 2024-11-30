import { SelectedGroupType, Todo } from "../types";

const GroupedList = ({
  title,
  total,
  groupedTodos,
  handleSelectGroup,
}: {
  title: string;
  total: number;
  groupedTodos: { [k: string]: Todo[] };
  handleSelectGroup: (groupIdentifiers: SelectedGroupType) => void;
}) => {
  return (
    <>
      <summary>
        {title} - <mark>{total}</mark>
      </summary>
      <ul>
        <li
          key={"all"}
          className="todo"
          onClick={() =>
            handleSelectGroup({
              group: title === "All" ? "all" : "completed",
              date: null,
            })
          }
        >
          <span>All </span>
          <mark>{total}</mark>
        </li>
        {Object.entries(groupedTodos).map(([date, todos]) => {
          return (
            <li
              key={date}
              className="todo"
              onClick={() => {
                handleSelectGroup({
                  group: title === "All" ? "all" : "completed",
                  date,
                });
              }}
            >
              <span>{date}</span>
              <mark>{todos.length}</mark>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default GroupedList;
