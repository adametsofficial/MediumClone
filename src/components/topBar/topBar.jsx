import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Medium
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          {currentUserState.isLoggedIn === false && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </Fragment>
          )}
          {currentUserState.isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose" />
                  &nbsp; New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className="ion-gear-a" />
                  &nbsp; Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className="nav-link"
                >
                  <img
                    className={"user-pic"}
                    src={currentUserState.currentUser.image}
                    alt=""
                  />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
