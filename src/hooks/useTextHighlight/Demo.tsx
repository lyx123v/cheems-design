import { useTextHighlight } from "../../hooks";
import { useCallback, useRef, useState } from "react";

const Index: React.FC = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState("");
  const filterFunction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTextHighlight(domRef.current!, {
      text: textValue,
    });
  };
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  return (
    <div
      style={{
        width: "50vw",
        height: "50vh",
      }}
    >
      <div>
        <div>
          <input value={textValue} onChange={changeValue} type="text" />
          <button onClick={filterFunction}>filter</button>
        </div>
        <div ref={domRef}>
          <h1>cheems-design</h1>
          <h2>cheems-design</h2>
          <h3>cheems-design</h3>
          <h4>cheems-design</h4>
          <h5>cheems-design</h5>
          <div>
            cheems-design <strong>cheems</strong>-design.
          </div>
          <div>测试dom文本替换</div>
          <div>全程使用原始dom进行操作</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
