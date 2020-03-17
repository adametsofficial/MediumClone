import React, { useEffect, Fragment } from "react";
import { Feed } from "../../components/Feed/Feed";
import useFetch from "../../hooks/useFetch";

import { _baseUrl } from "../../components/_baseUrl";
import Pagination from "../../components/pagination/Pagination";
import { limit, getPaginator } from "../../utils/utils";
import { stringify } from "query-string";
import Tags from "../../components/Tags/Tags";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error";
import FeedToggler from "../../components/FeedToggler/FeedToggler";


const YourFeed = ({ location, match }) => {

  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset
  });
  const _apiFeed = `/articles/feed?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(
    _baseUrl,
    _apiFeed
  );
  const url = match.url;
  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>a place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading || (!response && <Loading />)}
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
          <div className="col-md-3">
            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
