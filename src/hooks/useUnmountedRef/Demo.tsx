import { useState } from "react";
import { useUnmountedRef, useUnmount, useMount } from "../../hooks";

const Child = () => {
  const unmountedRef = useUnmountedRef();

  useMount(() => {
    console.log("初始化：", unmountedRef);
  });
  useUnmount(() => {
    console.log("卸载：", unmountedRef);
  });

  return <div>ChildChildChildChildChild</div>;
};

const Index = () => {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setFlag(v => !v)}>切换 {flag ? "卸载" : "初始化"}</button>
      {flag && <Child />}
    </div>
  );
};

export default Index;
