import React, { useEffect, useContext, useState } from "react";
import dangerouslySetInnerHTML from "dangerously-set-inner-html";

import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../../components/_baseUrl";
import { Link, Redirect } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error";
import { CurrentUserContext } from "../../contexts/currentUser";

import TagList from "../../components/tagList/TagList";

const Article = props => {
  const slug = props.match.params.slug;
  const _apiUrl = `/articles/${slug}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(_baseUrl, _apiUrl);
  const [{ response: deleteArticleRessponse }, doDelete] = useFetch(
    _baseUrl,
    _apiUrl
  );

  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const deleteArticle = () => {
    doDelete({
      method: "delete"
    });
  };

  const isAuthor = () => {
    if (!response || !currentUserState.isLoggedIn) {
      return false;
    }
    return (
      response.data.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleRessponse) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deleteArticleRessponse]);

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.data.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.data.article.author.username}`}>
                <img src={response.data.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.data.article.author.username}`}>
                  {response.data.article.author.username}
                </Link>
                <span className="date">{response.data.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${response.data.article.slug}/edit`}
                  >
                    <i className="ion-edit" />
                    &nbsp; Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a" />
                    &nbsp; Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p
                  style={{ "whiteSpace": "pre-line" }}
                  dangerouslySetInnerHTML={{
                    __html: response.data.article.body
                  }}
                />
              </div>
              <TagList tags={response.data.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;

// lin1-pgkjz
