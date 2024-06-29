import { useEffect } from "react";
import { useLatest } from "../";

const useEventListener = (event: string, handler: (...e: any) => void, target?: any) => {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    // 支持useRef 和 DOM节点
    let targetElement: any;
    if (!target) {
      // 监听window
      targetElement = window;
    } else if ("current" in target) {
      // 监听ref
      targetElement = target.current;
    } else {
      // 监听DOM节点
      targetElement = target;
    }

    //  防止没有 addEventListener 这个属性
    if (!targetElement?.addEventListener) return;

    const useEventListener = (event: Event) => {
      return handlerRef.current(event);
    };
    targetElement.addEventListener(event, useEventListener);
    return () => {
      targetElement.removeEventListener(event, useEventListener);
    };
  }, [event, target]);
};

export default useEventListener;
