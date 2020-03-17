import React, { useEffect, Fragment } from "react";
import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../../components/_baseUrl";
import { limit, getPaginator } from "../../utils/utils";
import { stringify } from "query-string";
import Error from "../../components/Error";
import Loading from "../../components/Loading/Loading";
import { Feed } from "../../components/Feed/Feed";
import Pagination from "../../components/pagination/Pagination";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const _apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(_baseUrl, _apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.data.articles} />
          <Pagination
            total={response.data.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UserArticles;
