import { PropsWithChildren, RefObject, createContext, useRef } from "react";
import { MessageProvider, MessageRef } from "./Message";
import * as React from "react";

interface ConfigProviderProps {
  messageRef?: RefObject<MessageRef>;
}

export const ConfigContext = createContext<ConfigProviderProps>({});

export function ConfigProvider(props: PropsWithChildren) {
  const { children } = props;

  const messageRef = useRef<MessageRef>(null);

  return (
    <ConfigContext.Provider value={{ messageRef }}>
      <MessageProvider ref={messageRef}></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
}
