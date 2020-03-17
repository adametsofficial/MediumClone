import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default (_baseUrl, url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ""
        }
      }
    };
    if (!isLoading) {
      return;
    } else if (isLoading) {
      axios(_baseUrl + url || url, requestOptions)
        .then(res => {
          setIsLoading(false);
          setResponse(res);
        })
        .catch(error => {
          // setError(error.response.data);
        });
      setIsLoading(false);
    }
  }, [_baseUrl, isLoading, options, token, url]);

  return [{ isLoading, response, error }, doFetch];
};
