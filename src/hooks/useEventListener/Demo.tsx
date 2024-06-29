import React, { useState, useRef } from "react";
import { useEventListener } from "../../hooks";

const Index = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEventListener(
    "click",
    () => {
      setValue(value + 1);
    },
    ref
  );

  useEventListener(
    "click",
    () => {
      setValue(value + 1);
    },
    ref.current
  );

  return (
    <button ref={ref} id="btn" type="button">
      点击 {value} 下
    </button>
  );
};

export default Index;
