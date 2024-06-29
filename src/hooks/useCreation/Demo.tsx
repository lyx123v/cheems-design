import React, { useMemo, useRef, useState } from "react";
import { useCreation } from "../../hooks";

const Index: React.FC<any> = () => {
  const [flag, setFlag] = useState<boolean>(false);

  const getNowData = (str: string) => {
    return Math.random();
  };
  useRef(getNowData("useRef"));
  const nowData = useCreation(() => getNowData("useCreation"), [getNowData]);
  const memoData = useMemo(() => getNowData("useMemo"), [getNowData]);

  return (
    <>
      <div>正常的函数： {getNowData("react")}</div>
      <div>useCreation包裹后的： {nowData}</div>
      <div>memoData包裹后的： {memoData}</div>
      <button
        onClick={() => {
          setFlag(v => !v);
        }}
      >
        切换状态{JSON.stringify(flag)}
      </button>
    </>
  );
};

export default Index;
