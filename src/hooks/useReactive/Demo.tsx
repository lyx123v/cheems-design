import { useReactive } from "../../hooks";

const Index = () => {
  const state = useReactive<any>({
    count: 0,
    name: "ReactiveHooks",
    flag: true,
    arr: [],
    bugs: ["cheems", "react", "hook"],
    addBug(bug: string) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  });

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>基本使用：</div>
      <div style={{ marginTop: 8 }}> 对数字进行操作：{state.count}</div>
      <div
        style={{
          margin: "8px 0",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button onClick={() => state.count++}>加1</button>
        <button style={{ marginLeft: 8 }} onClick={() => state.count--}>
          减1
        </button>
        <button style={{ marginLeft: 8 }} onClick={() => (state.count = 7)}>
          设置为7
        </button>
      </div>
      <div style={{ marginTop: 8 }}> 对字符串进行操作：{state.name}</div>
      <div
        style={{
          margin: "8px 0",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button onClick={() => (state.name = "cheems")}>设置为cheems</button>
        <button style={{ marginLeft: 8 }} onClick={() => (state.name = "Domesy")}>
          设置为Domesy
        </button>
      </div>
      <div style={{ marginTop: 8 }}> 对布尔值进行操作：{JSON.stringify(state.flag)}</div>
      <div
        style={{
          margin: "8px 0",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button onClick={() => (state.flag = !state.flag)}>切换状态</button>
      </div>
      <div style={{ marginTop: 8 }}> 对数组进行操作：{JSON.stringify(state.arr)}</div>
      <div
        style={{
          margin: "8px 0",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button onClick={() => state.arr.push(Math.floor(Math.random() * 100))}>push</button>
        <button style={{ marginLeft: 8 }} onClick={() => state.arr.pop()}>
          pop
        </button>
        <button style={{ marginLeft: 8 }} onClick={() => state.arr.shift()}>
          shift
        </button>
        <button
          style={{ marginLeft: 8 }}
          onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
        >
          unshift
        </button>
        <button style={{ marginLeft: 8 }} onClick={() => state.arr.reverse()}>
          reverse
        </button>
        <button style={{ marginLeft: 8 }} onClick={() => state.arr.sort()}>
          sort
        </button>
      </div>
      <div style={{ fontWeight: "bold", marginTop: 8 }}>计算属性：</div>
      <div style={{ marginTop: 8 }}>数量：{state.bugsCount} 个</div>
      <div style={{ margin: "8px 0" }}>
        <form
          onSubmit={e => {
            state.bug && state.addBug(state.bug);
            state.bug = "";
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={state.bug}
            style={{ width: 200 }}
            onChange={e => (state.bug = e.target.value)}
          />
          <button style={{ marginLeft: 8 }}>增加</button>
          <button style={{ marginLeft: 8 }} onClick={() => state.bugs.shift()}>
            删除
          </button>
        </form>
      </div>
      <ul>
        {state.bugs.map((bug: any, index: number) => (
          <li key={index}>{bug}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
