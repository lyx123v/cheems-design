import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button, { ButtonType, ButtonSize } from "./components/Button";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  const props = {
    defaultIndex: "0",
    onSelect: () => {},
    className: "test",
  };
  return (
    <div className="App">
      <Menu {...props}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>xyz</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>drop1</MenuItem>
        </SubMenu>
        <SubMenu title="opened">
          <MenuItem>opened1</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
