import React from "react";
import classNames from "classnames";
import "./style.scss";
import { ConfigContext } from "./ConfigProvider";

export type SizeType = "small" | "middle" | "large" | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 间隙大小
   * @default small
   */
  size?: SizeType | [SizeType, SizeType];
  /**
   * 间隙方向
   * @default horizontal
   */
  direction?: "horizontal" | "vertical";
  /**
   * 对齐方式
   * @default center
   */
  align?: "start" | "end" | "center" | "baseline";
  /**
   * 分隔符
   * @default false
   */
  split?: string | React.ReactNode;
  /**
   * 是否换行
   * @default false
   */
  wrap?: boolean; // 是否换行
}

// 间隙大小
const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

/**
 * Space组件, 设置组件之间的间距。
 * ### 引用方法
 *
 * ~~~js
 * import { Space } from 'cheemsDesign'
 * ~~~
 */
const Space: React.FC<SpaceProps> = props => {
  const { space } = React.useContext(ConfigContext);

  const {
    className,
    style,
    children,
    size = space?.size || "small", // 间隙
    direction = "horizontal", // 对齐方式
    align,
    split,
    wrap = false, // 是否换行
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(children);

  const mergedAlign = direction === "horizontal" && align === undefined ? "center" : align;
  const cn = classNames(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;

    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {i < childNodes.length && split && (
          <span className={`${className}-split`} style={style}>
            {split}
          </span>
        )}
      </>
    );
  });

  const otherStyles: React.CSSProperties = {};

  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
        getNumberSize(item)
      ),
    [size]
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = "wrap";
  }

  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style,
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  );
};

export default Space;
