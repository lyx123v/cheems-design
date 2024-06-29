import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";
export interface ProgressProps {
  percent: number; // 进度条百分比0-100
  strokeHeight?: number; // 进度条高度
  showText?: boolean; // 是否显示百分比
  styles?: React.CSSProperties; // 自定义样式
  theme?: ThemeProps; // 主题
}

/**
 * Progress组件, 进度条
 * ### 引用方法
 *
 * ~~~js
 * import { Progress } from 'cheemsDesign'
 * ~~~
 */
const Progress: FC<ProgressProps> = props => {
  const { percent, strokeHeight = 15, showText = true, styles, theme = "primary" } = props;
  return (
    <div className="cheems-progress-bar" style={styles}>
      <div className="cheems-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`cheems-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
