import React, { useLayoutEffect } from "react";
import useMutateObserver from "../../hooks/useMutateObserver";

interface MutationObserverProps {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}

/**
 * 监听节点变化组件
 * ### 引用方法
 *
 * ~~~js
 * import { MutateObserver } from 'cheemsDesign'
 * ~~~
 */
const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { options, onMutate = () => {}, children } = props;

  const elementRef = React.useRef<HTMLElement>(null);

  const [target, setTarget] = React.useState<HTMLElement>();

  useMutateObserver(target!, onMutate, options);

  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  if (!children) {
    return null;
  }

  return React.cloneElement(children, { ref: elementRef });
};

export default MutateObserver;
