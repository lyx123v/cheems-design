import { useCopy } from "../../hooks/index";
// import useCopy from "./index";
import { useState } from "react";

const Index = () => {
  const [value, setValue] = useState<string>();

  const [copyText, copy] = useCopy();
  return (
    <>
      <input
        style={{ display: "inline-block", width: 240, marginRight: 8 }}
        value={value}
        onChange={v => setValue(v.target.value)}
      />
      <button onClick={() => copy(value || "")}>复制</button>
      <div>{copyText ? `复制结果: ${copyText}` : ""}</div>
    </>
  );
};

export default Index;
