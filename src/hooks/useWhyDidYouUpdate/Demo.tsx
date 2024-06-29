import { useWhyDidYouUpdate } from "../../hooks";
import react, { useRef, useState } from "react";

const DemoChild: React.FC<{ count: number }> = props => {
  const [randomNum, setRandomNum] = useState(Math.random());

  useWhyDidYouUpdate("Index", { ...props, randomNum });

  return (
    <div>
      <div>
        <span>number: {props.count}</span>
      </div>
      <div>
        randomNum: {randomNum}
        <button onClick={() => setRandomNum(Math.random)}>设置随机 state</button>
      </div>
    </div>
  );
};

const Index = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <DemoChild count={count} />
      <div>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>减一</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>加一</button>
      </div>
    </div>
  );
};

export default Index;
