import { useRef } from "react";
import type { DependencyList } from "react";

/**
 * 判断依赖性deps是否发生改变
 */
const depsAreSame = (oldDeps: DependencyList, deps: DependencyList): boolean => {
  if (Object.is(oldDeps, deps)) return true;

  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
};

const useCreation = <T,>(fn: () => T, deps: DependencyList) => {
  // 通过useRef设置一个标记initialized
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  // 判断第一次 或者依赖变化的对象发生改变时 触发factory
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  return current.obj as T;
};

export default useCreation;
