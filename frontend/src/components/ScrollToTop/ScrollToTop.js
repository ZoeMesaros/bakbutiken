import { useEffect } from "react";

// A component that scrolls to the top on page enter
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;
