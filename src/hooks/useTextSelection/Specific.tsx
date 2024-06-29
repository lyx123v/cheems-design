import react, { useRef } from "react";
import * as React from "react";

import { useTextSelection } from "../../hooks";

const Index = () => {
  const ref = useRef(null);
  const selection = useTextSelection(ref);

  return (
    <div style={{ width: "300px" }}>
      <p style={{ fontWeight: "bold" }}>只能选择框中的文字</p>
      <div ref={ref} style={{ border: "1px solid", padding: 10, marginBottom: 4 }}>
        <div>测试文字测试文字</div>
      </div>
      <div>选中的数据：</div>
      <div
        style={{
          wordBreak: "break-all",
        }}
      >{`${JSON.stringify(selection)}`}</div>
    </div>
  );
};

export default Index;
