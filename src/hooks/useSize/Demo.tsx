import { useSize } from "../../hooks";
import { useRef } from "react";

const Index = () => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  return (
    <div
      style={{
        width: "50vw",
        height: "50vh",
      }}
      ref={ref}
    >
      <p>改变窗口大小试试</p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};

export default Index;
