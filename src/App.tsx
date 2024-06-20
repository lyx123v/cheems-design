import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button, { ButtonType, ButtonSize } from "./components/Button";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon";
import Input from "./components/Input";

function App() {
  const props = {
    defaultIndex: "0",
    onSelect: () => {},
    className: "test",
  };
  return (
    <div className="App">
      <Input
        style={{ width: "300px" }}
        placeholder="input with icon"
        icon="search"
      />
      <Input
        style={{ width: "300px" }}
        defaultValue="large size"
        size="lg"
        icon="search"
      />
      <Input
        style={{ width: "300px" }}
        placeholder="small size"
        size="sm"
        icon="search"
      />
      <Input
        style={{ width: "300px" }}
        defaultValue="prepend text"
        icon="search"
        prepend="https://"
      />
      <Input
        style={{ width: "300px" }}
        defaultValue="google"
        icon="search"
        append=".com"
      />
    </div>
  );
}

export default App;
