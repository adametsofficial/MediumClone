import React, { useEffect, useState, useContext } from "react";

import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../../components/_baseUrl";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";
import ArticleForm from "../CreateArticle/ArticleForm";

export default function EditArticle({ match }) {
  const slug = match.params.slug;
  const _apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doArticleFetch] = useFetch(
    _baseUrl,
    _apiUrl
  );
  const [currentUserState] = useContext(CurrentUserContext);

  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [
    { response: updateArticleResponse, error },
    doUpdateArticle
  ] = useFetch(_baseUrl, _apiUrl);

  const [initialValues, setInitialValues] = useState(null);
  const handleSubmit = article => {
    doUpdateArticle({
      method: "put",
      data: {
        article
      }
    });
  };

  useEffect(() => {
    doArticleFetch();
  }, [doArticleFetch]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.data.article.title,
      description: fetchArticleResponse.data.article.description,
      body: fetchArticleResponse.data.article.body,
      tagList: fetchArticleResponse.data.article.tagList
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/article/${slug}`} />;
  }

  return (
    <ArticleForm
      errors={(error && error.response.data.errors) || {}}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}
