import { useEffect } from "react";

// Componente sin UI, solo escucha teclas
export function InvisibleAdminAccess({ onShowLogin }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "g") {
        onShowLogin();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onShowLogin]);
  return null;
}
