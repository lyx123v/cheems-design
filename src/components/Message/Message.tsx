import {
  CSSProperties,
  FC,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import * as React from "react";

import useStore, { MessageList } from "./useStore";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./style.scss";
import { createPortal } from "react-dom";
import { useTimer } from "./useTimer";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * 消息内容
   */
  content?: ReactNode | string;
  /**
   * 消息显示时长
   */
  duration?: number;
  /**
   * 消息关闭回调
   */
  onClose?: (...args: any) => void;
  /**
   * 消息唯一id
   */
  id?: number;
  /**
   * 消息位置
   */
  position?: Position;
}

const MessageItem: FC<MessageProps> = item => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!,
  });

  return (
    <div className="message-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {item.content}
    </div>
  );
};

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  const { messageList, add, update, remove, clearAll } = useStore("top");

  if ("current" in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll,
    };
  }
  // useImperativeHandle(ref, () => {
  //     return {
  //         add,
  //         update,
  //         remove,
  //         clearAll
  //     }
  // }, [])

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className="message-wrapper">
      {positions.map(direction => {
        return (
          <div className={`message-wrapper-${direction}`} key={direction}>
            <TransitionGroup>
              {messageList[direction].map(item => {
                return (
                  <CSSTransition key={item.id} timeout={1000} classNames="message">
                    <MessageItem onClose={remove} {...item}></MessageItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        );
      })}
    </div>
  );

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(messageWrapper, el);
});
