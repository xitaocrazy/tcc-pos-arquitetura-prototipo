import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { EditAsset } from "../components/Assets/Edit";
import { CreateAsset } from "../components/Assets/Create";
import { CreateMaintenanceHistory } from "../components/MaintenanceHistory/Create";
import { NotFound } from "../pages/NotFound";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...params }) => {
  const isAuth = useSelector(({ auth: { isAuth } }) => isAuth);

  return (
    <Route
      {...params}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "./login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <>
    <Switch>
      <PrivateRoute exact path="/" component={Home}></PrivateRoute>
      <Route exact path="/details/login" render={() => <Redirect to="/login" />}></Route>
      <PrivateRoute exact path="/details/:id" component={EditAsset}></PrivateRoute>
      <Route exact path="/404" component={NotFound}></Route>
      <Route exact path="/login" component={Login}></Route>
      <PrivateRoute exact path="/createasset" component={CreateAsset}></PrivateRoute>
      <PrivateRoute exact path="/details/managemaintenance/:id" component={CreateMaintenanceHistory}></PrivateRoute>
      <PrivateRoute exact path="/details/addmaintenancehistory/:id" component={CreateMaintenanceHistory}></PrivateRoute>
      <Route path="*" render={() => <Redirect to="/404" />}></Route>      
    </Switch>
  </>
);

export default Routes;
