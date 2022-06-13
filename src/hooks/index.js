import { useEffect } from "react";

export const useScroll = (func) => {
  useEffect(() => {
    document.addEventListener("scroll", func);
    return () => {
      document.removeEventListener("scroll", func);
    };
  }, [func]);
};
