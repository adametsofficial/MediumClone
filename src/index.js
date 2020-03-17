import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Routes from "./pages/routes";
import TopBar from "./components/topBar/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";
import CurrentUserChecker from "./components/currentUserChecker/currentUserChecker";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
// jojabam427@upcmaill.com