import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const authenticated = JSON.parse(document.cookie).token;
    setIsLogin(!!authenticated);
  }, []);
  return isLogin;
};

export default useAuth;
