import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void; // 拖拽文件回调
  children?: React.ReactNode; // 内部样式
}

// 拖拽功能
export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false); // 拖拽状态
  // 拖拽样式
  const klass = classNames("viking-uploader-dragger", {
    "is-dragover": dragOver,
  });
  // 拖拽文件
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  // 拖拽状态
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
