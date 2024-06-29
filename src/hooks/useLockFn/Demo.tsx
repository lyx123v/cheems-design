import { useLockFn } from "../../hooks";
import { useState, useRef } from "react";

const mockRequest = (count: number) => {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`执行完成, 当前为：${count + 1}`);
    }, 2000);
  });
};
const Index = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const click = useLockFn(async () => {
    setLoading(true);
    const res = await mockRequest(count);
    console.log(res);
    setLoading(false);
    setCount(v => v + 1);
  });

  return (
    <>
      <div>数字：{count}</div>
      {loading ? "lodaing" : <button onClick={() => click()}>竞态锁: 点击 + 1</button>}
    </>
  );
};

export default Index;
