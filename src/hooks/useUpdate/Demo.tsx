import { useUpdate } from "../../hooks";

const Index = () => {
  const update = useUpdate();

  return (
    <div>
      <div>时间：{Date.now()}</div>
      <button
        onClick={() => {
          update();
        }}
      >
        更新
      </button>
    </div>
  );
};

export default Index;
