import React, { useRef, PropsWithChildren, CSSProperties, FC, useCallback, useEffect } from "react";
import useWatermark from "../../hooks/useWatermark";

export interface WatermarkProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  /**
   * 追加元素的zIndex
   */
  zIndex?: string | number;
  /**
   * 水印宽度
   */
  width?: number;
  /**
   * 水印高度
   */
  height?: number;
  /**
   * 水印旋转角度
   */
  rotate?: number;
  /**
   * 图片水印
   */
  image?: string;
  /**
   * 水印文字
   */
  content?: string | string[];
  /**
   * 水印文字样式
   */
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  /**
   * 水印间距
   */
  gap?: [number, number];
  /**
   * 水印偏移量
   */
  offset?: [number, number];
  /**
   * 获取水印挂载的容器
   */
  getContainer?: () => HTMLElement;
}

/**
 * 水印组件
 * ### 引用方法
 *
 * ~~~js
 * import { Watermark } from 'cheemsDesign'
 * ~~~
 */
const Watermark: FC<WatermarkProps> = props => {
  const {
    className,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!;
  }, [containerRef.current, props.getContainer]);

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  });

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};

export default Watermark;
