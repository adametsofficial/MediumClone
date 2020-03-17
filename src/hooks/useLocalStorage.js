import { useState, useEffect } from "react";

export default (key, initialValue = '') => {
  const [value, setToken] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setToken];
};
