import { useState, useEffect } from "react";
import { useSafeState } from "../../hooks";

const Child = () => {
  const [value, setValue] = useSafeState("1");

  useEffect(() => {
    setTimeout(() => {
      setValue("定时器3s后触发");
    }, 3000);
  }, []);

  const text = value || "Loading...";

  return <div>{text}</div>;
};

const Index = () => {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setFlag(v => !v)}>切换 {flag ? "unmount" : "mount"}</button>
      {flag && <Child />}
    </div>
  );
};

export default Index;
