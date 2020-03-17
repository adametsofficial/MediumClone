import React from "react";

import classNames from "classnames";

import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../_baseUrl";

const AddToFavorites = ({ isFavorited, favoritesCount, slug }) => {
  const apiUrl = `/articles/${slug}/favorite`;
  const [{ response }, doFetch] = useFetch(_baseUrl, apiUrl);
  const favoriteLikeCount = response
    ? response.data.article.favoritesCount
    : favoritesCount;
  const isFavRes = response ? response.data.article.favorited : isFavorited;

  const handleLike = e => {
    e.preventDefault();
    doFetch({
      method: isFavRes ? "delete" : "post"
    });
  };

  const buttonCls = classNames({
    btn: true,
    "btn-sm": true,
    "btn-primary": isFavRes,
    "btn-outline-primary": !isFavRes
  });

  return (
    <button className={buttonCls} onClick={handleLike}>
      <i className="ion-heart" />
      <span>&nbsp;{favoriteLikeCount}</span>
    </button>
  );
};

export default AddToFavorites;
