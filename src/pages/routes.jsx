import React from "react";
import { Route, Switch } from "react-router-dom";
import GlobalFeed from "./globalFeed/globalFeed";
import Article from "./article/Article";
import Authentication from "./authentication/Authentication";
import TagFeed from "./TagFeed/TagFeed";
import YourFeed from "./YourFeed/YourFeed";
import CreateArticle from "./CreateArticle/CreateArticle";
import EditArticle from "./EditArticle/EditArticle";
import Settings from "./SettingsPage/Settings";
import UserProfile from "./UserProfile/UserProfile";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={GlobalFeed} />
      <Route exact path="/profiles/:slug" component={UserProfile} />
      <Route exact path="/profiles/:slug/favorites" component={UserProfile} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/articles/new" component={CreateArticle} />
      <Route exact path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route exact path="/login" component={Authentication} />
      <Route exact path="/register" component={Authentication} />
      <Route path="/article/:slug" component={Article} />
    </Switch>
  );
};

export default Routes;
