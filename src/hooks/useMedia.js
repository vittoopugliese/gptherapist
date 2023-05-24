import { useEffect, useState} from "react";

export function useMedia() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 794);

  useEffect(() => {
    window.addEventListener("resize", handleToggle);

    function handleToggle() {
      window.innerWidth > 794 ? setIsMobile(false) : setIsMobile(true);
    }

    return () => {
      window.removeEventListener("resize", handleToggle);
    };
  }, []);

  return {isMobile};
}
