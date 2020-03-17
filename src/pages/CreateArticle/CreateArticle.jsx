import React, { useEffect, useState, useContext } from "react";
import ArticleForm from "./ArticleForm";
import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../../components/_baseUrl";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const CreateArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const _apiUrl = `/articles`;
  const [{ response, error }, doFetch] = useFetch(_baseUrl, _apiUrl);
  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: []
  };
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const handleSubmit = article => {
    doFetch({
      method: "post",
      data: {
        article
      }
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/article/${response.data.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.response.data.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
