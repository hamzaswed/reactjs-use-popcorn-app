import { useEffect } from "react";

export function useKey(action, key) {
  useEffect(() => {
    function callback(e) {
      console.log(e.code === key);
      if (e.code === key) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [key, action]);
}
