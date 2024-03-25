import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, getCookie } from "cookies-next";

const useVIP = () => {
  const router = useRouter();
  const { asPath, pathname } = router;
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    handleIsVIPBasedOnPathname();
  }, [asPath]);

  const handleIsVIPBasedOnPathname = () => {
    let stats = asPath?.includes("/master-class");
    stats ? setIsVIP(true) : setIsVIP(false);
    setCookie("theme", stats ? "dark" : "light");
  };

  return { isVIP };
};

export default useVIP;
