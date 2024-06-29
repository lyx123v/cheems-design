import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from "react";
import * as React from "react";

interface LazyloadProps {
  className?: string;
  style?: CSSProperties;
  /**
   * 未加载完成前的默认显示
   */
  placeholder?: ReactNode;
  /**
   * 与 CSS 属性margin语法相似的字符串 (string) 对象，在交叉检测开始之前，由rootMargin 规定的矩形的每一边都会被添加至root元素的边框盒 (bounding box) 的相应边。
   */
  offset?: string | number;
  width?: number | string;
  height?: string | number;
  /**
   * 懒加载完成后的回调
   */
  onContentVisible?: () => void;
  children: ReactNode;
}

/**
 * 懒加载组件
 * ### 引用方法
 *
 * ~~~js
 * import { Lazyload } from 'cheemsDesign'
 * ~~~
 */
const Lazyload: FC<LazyloadProps> = props => {
  const {
    className = "",
    style,
    offset = 0,
    width,
    onContentVisible,
    placeholder,
    height,
    children,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const elementObserver = useRef<IntersectionObserver>();

  // 监听元素是否进入可视区域
  function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const { isIntersecting } = entry;

    if (isIntersecting) {
      setVisible(true);
      onContentVisible?.();

      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        // 移除监听
        elementObserver.current?.unobserve(node);
      }
    }
  }

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
      threshold: 0,
    };

    // 监听元素
    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options);

    // 监听目标元素
    const node = containerRef.current;

    // 开始监听目标元素
    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        // 停止监听目标元素
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  const styles = { height, width, ...style };

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default Lazyload;
