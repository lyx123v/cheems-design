import React, {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useInteractions, // 事件组合，返回触发器
  useFloating, // 浮层位置计算方法
  useClick, // click 触发
  useDismiss,
  offset,
  arrow,
  FloatingArrow,
  flip, //
  useHover,
  OffsetOptions, // hover 触发
} from "@floating-ui/react";
import "./style.scss";
import { createPortal } from "react-dom";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type trigger = "hover" | "click";
type AlignedPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  /**
   * 显示内容
   */
  content?: ReactNode;
  /**
   * 触发方式
   * @default hover
   */
  trigger?: trigger;
  /**
   * 显示位置
   * @default bottom
   */
  placement?: Side | AlignedPlacement;
  /**
   * 是否打开
   */
  open?: boolean;
  /**
   * 是否打开
   */
  OffsetOptions?: OffsetOptions;
  /**
   * 打开关闭回调
   */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Popover组件
 * ### 引用方法
 *
 * ~~~js
 * import { Popover } from 'cheemsDesign'
 * ~~~
 */
export default function Popover(props: PopoverProps) {
  const {
    open,
    onOpenChange,
    content,
    children,
    trigger = "hover",
    placement = "bottom",
    className,
    style,
    OffsetOptions,
  } = props;

  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(open);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: open => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      offset(OffsetOptions || 10),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  });

  // const interaction = trigger === "hover" ? useHover(context) : useClick(context);
  const hover = useHover(context, {
    enabled: trigger === "hover",
  });

  const click = useClick(context, {
    enabled: trigger === "click",
  });
  const interaction = trigger === "hover" ? hover : click;

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([interaction, dismiss]);

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  const floating = isOpen && (
    <div
      className="popover-floating"
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      {content}
      <FloatingArrow ref={arrowRef} context={context} fill="#fff" stroke="#000" strokeWidth={1} />
    </div>
  );

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className={className} style={style}>
        {children}
      </span>
      {createPortal(floating, el)}
    </>
  );
}
