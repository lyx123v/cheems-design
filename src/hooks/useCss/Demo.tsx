import { useCss } from "../../hooks";

const Index = () => {
  const classDiv = useCss({
    color: "red",
    "&:hover": {
      color: "blue",
    },
  });

  const classP = useCss({
    p: {
      color: "green",
      "&:nth-of-type(2)": {
        color: "rebeccapurple",
      },
    },
  });

  return (
    <>
      <div className={classDiv}>鼠标hover</div>
      <div className={classP}>
        <p>CSS-in-JS</p>
        <p>控制div下p标签的字体颜色</p>
        <p style={{ color: "pink" }}>行内样式</p>
      </div>
    </>
  );
};

export default Index;
