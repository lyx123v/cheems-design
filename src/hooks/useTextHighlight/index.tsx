interface useTextHighlightCinfig {
  /**
   * @description 匹配文本
   */
  text: string;
  /**
   * @description 全局匹配
   */
  globalMatching: boolean;
  /**
   * @description 忽略大小写
   */
  ignoreCase: boolean;
  /**
   * @description 样式
   */
  style: object;
}

let oldDom: string | null = null;
function useTextHighlight(node: HTMLElement, config?: useTextHighlightCinfig) {
  if (!oldDom) {
    oldDom = node.outerHTML;
  }
  const {
    globalMatching = true,
    ignoreCase = true,
    style = {
      padding: "0",
    },
    text,
  } = config || {};
  // changeStyle
  // 对象转css字符串
  const changeStyleStr: string = Object.keys(style)
    .map(key => `${key}:${style[key]}`)
    .join(";");

  const dfs = (node: HTMLElement) => {
    // 如果是文本节点
    if (node.nodeType === Node.TEXT_NODE) {
      // 当前文本
      const nodeText: string = node.nodeValue!;
      // g为全局匹配
      // i为忽略大小写
      const regex = new RegExp(`(${text})`, `${globalMatching ? "g" : ""}${ignoreCase ? "i" : ""}`);
      // 使用正则表达式查找节点文本中的所有匹配项。
      const matches = [...nodeText.matchAll(regex)];
      // 未匹配到直接返回
      if (matches.length === 0) return;
      // 存储文本和 <mark> 元素。
      const fragments = [];
      let lastIndex = 0;
      matches.forEach(match => {
        // 为匹配前的文本创建文本节点。
        fragments.push(document.createTextNode(nodeText.slice(lastIndex, match.index)));
        // mark元素用来标记或突出显示文本内容
        const mark = document.createElement("mark");

        mark.setAttribute("style", changeStyleStr);
        // 将匹配的文本添加到 <mark> 元素。
        mark.appendChild(document.createTextNode(match[0]));
        fragments.push(mark);
        // 将 lastIndex 更新为当前匹配的末尾。
        lastIndex = match.index + match[0].length;
      });
      // 为最后一个匹配后的文本创建文本节点。
      fragments.push(document.createTextNode(nodeText.slice(lastIndex)));
      // 将新节点插入到旧节点后面，然后删除旧节点
      fragments.forEach(fragment => node.parentNode!.insertBefore(fragment, node));
      node.parentNode!.removeChild(node); // 移除当前的文本节点。
      return;
    }
    node.childNodes.forEach(dfs);
  };
  console.log("oldDom", oldDom);
  node.innerHTML = oldDom;
  console.log("node", node);
  if (text) {
    dfs(node);
  }
}

export default useTextHighlight;
