import React, { useState } from "react";
import { useDebounceFn } from "../../hooks";

const Index: React.FC<any> = () => {
  const [number, setNumber] = useState<number>(0);

  const run = useDebounceFn(() => setNumber(v => v + 1), { wait: 500 });

  return (
    <>
      <div>数字： {number}</div>
      <div>快速点击按钮，但只会在所有点击完成的500ms执行函数</div>
      <button onClick={run}>点击 + 1</button>
    </>
  );
};

export default Index;
