import React, { useEffect } from "react";

import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../../components/_baseUrl";
import { NavLink } from "react-router-dom";
import UserArticles from "../UserArticles/UserArticles";

const UserProfile = ({ match, location }) => {
  const slug = match.params.slug;
  const isFavorites = location.pathname.includes("favorites");
  const _apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(_baseUrl, _apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={response.data.profile.image}
                alt=""
                className="user-img"
              />
              <h4>{response.data.profile.username}</h4>
              <p>{response.data.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    exact
                    to={`/profiles/${response.data.profile.username}`}
                    className="nav-link"
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.data.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.data.profile.username}
              location={location}
              isFavorites={isFavorites}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
