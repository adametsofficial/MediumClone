import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../_baseUrl";
import Loading from "../Loading/Loading";
import Error from "../Error";
import { Link } from "react-router-dom";

const Tags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch(_baseUrl, "/tags");
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  if (isLoading || !response) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response &&
          response.data.tags.map(tag => (
            <Link
              to={`/tags/${tag}`}
              key={tag}
              className="tag-default tag-pill"
            >
              {tag}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Tags;
