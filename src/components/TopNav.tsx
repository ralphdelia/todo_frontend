import ToggleThemeIcon from "./ToggleThemeIcon";

const TopNav = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>{/* <strong>Todos</strong> */}</li>
        </ul>
        <ul>
          <li>
            <ToggleThemeIcon />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopNav;
