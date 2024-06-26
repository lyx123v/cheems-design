import React, { useState } from "react";
import { useDebounce } from "../../hooks";

const Index: React.FC<any> = () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <div>防抖的值：{debouncedValue}</div>
    </>
  );
};

export default Index;
