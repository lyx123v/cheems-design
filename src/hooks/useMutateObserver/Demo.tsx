import { useEffect, useRef, useState } from "react";
import MutateObserver from "../../components/MutateObserver";

const Index = () => {
  const [className, setClassName] = useState("aaa");

  useEffect(() => {
    setTimeout(() => setClassName("bbb"), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };

  return (
    <div>
      <MutateObserver onMutate={callback}>
        <div id="container">
          <div className={className}>
            {className === "aaa" ? (
              <div>aaa</div>
            ) : (
              <div>
                <p>bbb 看控制台</p>
              </div>
            )}
          </div>
        </div>
      </MutateObserver>
    </div>
  );
};

export default Index;
