import React, { useRef, useState } from "react";
import useClickOutside from ".";

const Index: React.FC<any> = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    alert("失去焦点");
  });
  return (
    <div>
      <div
        style={{
          width: "200px",
          height: "200px",
          background: "red",
          position: "relative",
        }}
        ref={componentRef}
      ></div>
    </div>
  );
};

export default Index;
