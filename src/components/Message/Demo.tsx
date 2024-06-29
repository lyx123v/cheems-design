import React from "react";
import { MessageProps } from "../../components/Message";
import "./index.css";
import { ConfigProvider } from "../Space/ConfigProvider";
import { useMessage } from "./useMessage";

function Aaa(args: MessageProps) {
  const message = useMessage();

  return (
    <button
      onClick={() => {
        message.add({
          content: "请求成功",
          ...args,
        });
      }}
    >
      成功
    </button>
  );
}

function Index(args: MessageProps) {
  return (
    <ConfigProvider>
      <div>
        <Aaa {...args}></Aaa>
      </div>
    </ConfigProvider>
  );
}

export default Index;
