import { useState } from "react";
import { useTrackedEffect } from "../../hooks";

const Index = () => {
  const [count, setCount] = useState<number>(0);
  const [count1, setCount1] = useState<number>(0);

  useTrackedEffect(
    (changes, previousDeps, currentDeps, type_changes) => {
      console.log("旧值", previousDeps);
      console.log("新值", currentDeps);
      console.log("变更索引:", changes);
      console.log("变更字段", type_changes);

      if ((changes || []).includes(0) && (changes || []).includes(1)) {
        console.log("count, count1 都改变了");
      } else if ((changes || []).includes(0)) {
        console.log("count 改变了");
      } else if ((changes || []).includes(1)) {
        console.log("count1 改变了");
      }
    },
    [count, count1],
    ["count", "count1"]
  );

  return (
    <>
      <div>数字: {count}</div>
      <div>数字1: {count1}</div>
      <button onClick={() => setCount(v => v + 1)}>count + 1</button>
      <button style={{ marginLeft: 8 }} onClick={() => setCount1(v => v + 1)}>
        count1 + 1
      </button>
      <button
        style={{ marginLeft: 8 }}
        onClick={() => {
          setCount(v => v + 1);
          setCount1(v => v + 1);
        }}
      >
        count 和 count1 + 1
      </button>
    </>
  );
};

export default Index;
