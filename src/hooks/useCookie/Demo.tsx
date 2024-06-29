import { useEffect } from "react";
import useCookie from ".";

const Index = () => {
  const [value, updateCookie, deleteCookie] = useCookie("cheems");

  useEffect(() => {
    deleteCookie();
  }, []);

  const updateCookieHandler = () => {
    updateCookie("666");
  };

  return (
    <div>
      <p>cookie 值: {value}</p>
      <button onClick={updateCookieHandler}>更新 Cookie</button>
      <br />
      <button onClick={deleteCookie}>删除 Cookie</button>
    </div>
  );
};
export default Index;
