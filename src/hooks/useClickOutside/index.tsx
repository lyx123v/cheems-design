import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 如果dom不存在，或者dom包含点击的元素，则返回
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      // 执行handler
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
