import { useScrolling } from "../../hooks";
import { useRef } from "react";

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrolling = useScrolling(scrollRef);

  return (
    <>
      {<div>{scrolling ? "滚动中.." : "没有滚动"}</div>}

      <div ref={scrollRef} style={{ height: "200px", overflow: "auto" }}>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
        <div>cheems</div>
      </div>
    </>
  );
};

export default Index;
