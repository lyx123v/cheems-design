import { useCountDown } from "../../hooks/index";
import { useState } from "react";

const Index = () => {
  const [time, _] = useState(new Date().getTime() + 48 * 60 * 60 * 1000);
  const [target, setTarget] = useState<number>();

  const [remainTime, formattedTime] = useCountDown({
    targetDate: time,
  });

  const [remain, Time] = useCountDown({ targetTime: 60 * 60 * 1000 });
  const [remainButton] = useCountDown({
    targetDate: target,
    onEnd: () => {
      alert("倒计时结束");
    },
  });

  return (
    <div>
      <div>时间：{Date.now()}</div>
      <div>倒计时时间戳：{remainTime}</div>
      <div>{`距离两天后还剩：${formattedTime.days}天${formattedTime.hours}时${formattedTime.minutes}分${formattedTime.seconds}秒`}</div>
      <div>剩余：{Time.seconds}s</div>
      <button
        disabled={remainButton !== 0}
        onClick={() => {
          setTarget(Date.now() + 3000);
        }}
      >
        倒计时：{remainButton > 0 ? Math.round(remainButton / 1000) : 0} s{" "}
      </button>
    </div>
  );
};

export default Index;
