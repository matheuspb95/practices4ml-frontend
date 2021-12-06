import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddPractice from "../pages/AddPractice";
import Practices from "../pages/Practices";
import ViewPractice from '../pages/ViewPractice';
import Members from "../pages/Members";
import Notifications from "../pages/Notifications";


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/add-practice" exact>
          <AddPractice />
        </Route>
        <Route path="/update-practice" exact>
          <AddPractice />
        </Route>
        <Route path="/practices" exact>
          <Practices />
        </Route>
        <Route path="/view-practice" exact>
          <ViewPractice />
        </Route>
        <Route path="/members" exact>
          <Members />
        </Route>
        <Route path="/notifications" exact>
          <Notifications />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;