import { useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../_baseUrl";
import { CurrentUserContext } from "../../contexts/currentUser";
import useLocalStorage from "../../hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch(_baseUrl, "/user");
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      dispatch({ typr: "SET_UNAUTHORIZED" });
      return;
    }
    doFetch();
    dispatch({ type: "LOADING" });
  }, [doFetch, dispatch, token]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({type: 'SET_AUTHORIZED', payload: response.data.user})
  }, [response, dispatch]);

  return children;
};

export default CurrentUserChecker;
