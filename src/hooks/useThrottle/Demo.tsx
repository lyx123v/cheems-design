import React, { useState } from "react";
import { useThrottle } from "../../hooks";

const Index: React.FC<any> = () => {
  const [value, setValue] = useState<string>();
  const throttledValue = useThrottle(value, { wait: 500 });

  return (
    <>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <div>节流的值：{throttledValue}</div>
    </>
  );
};

export default Index;
