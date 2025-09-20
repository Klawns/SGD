import { useState, useEffect } from "react";

export function useToast(duration = 3000) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const trigger = ({ message, type = "success" }) => {
    setMessage(message);
    setType(type);
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return { show, message, type, trigger };
}
