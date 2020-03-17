import React, { useEffect, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { _baseUrl } from "../../components/_baseUrl";
import { CurrentUserContext } from "../../contexts/currentUser";
import { BackendErrorMessages } from "../../components/BackendErrorMessages/BackendErrorMessages";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Redirect } from "react-router-dom";

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const _apiUrl = `/user`;
  const [{ response, error }, doFetch] = useFetch(_baseUrl, _apiUrl);
  const user = currentUserState.currentUser;
  const [, setToken] = useLocalStorage("token");
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false);

  
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    doFetch({
      method: "put",
      data: {
        user: {
          ...user,
          image,
          username,
          bio,
          email,
          password
        }
      }
    });
  };

  const logout = e => {
    e.preventDefault();
    setToken("");
    dispatch({ type: "LOGOUT" });
    setIsSuccessfullLogout(true)
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setImage(user.image);
    setUsername(user.username);
    setBio(!user.bio ? " " : user.bio);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: "SET_AUTHORIZED", payload: response.data.user });
  }, [dispatch, response]);



  if (isSuccessfullLogout || !user) {
      return <Redirect to={'/'} />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12 ">
            <h1 className="text-xs-center">
              Your settings,{" "}
              <b>
                {currentUserState.currentUser &&
                  currentUserState.currentUser.username}
              </b>
            </h1>
            {error && (
              <BackendErrorMessages backendError={error.response.data.errors} />
            )}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    placeholder={"URL of profile picture"}
                    className="form-control form-control-lg"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="text"
                    placeholder={"Username"}
                    className="form-control form-control-lg"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    rows="8"
                    className="form-control form-control-lg"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Short bio"
                  ></textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="text"
                    placeholder={"Email"}
                    className="form-control form-control-lg"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    type="password"
                    placeholder={"Password"}
                    className="form-control form-control-lg"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
