import "./CSS/stylesheets/App.css";
import "./CSS/stylesheets/Style.css";

import "./CSS/login.css";
import "./CSS/chat.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

//material ui//
import { ThemeProvider, CircularProgress, makeStyles } from "@material-ui/core";

//utils//
import firebase from "./utils/firebase";
import theme from "./utils/theme";

//pages//
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";

import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";

import chat from "./pages/Chat";
import SendMessage from "./pages/SendMessage";

function App() {
  const [state, setState] = useState({
    isAuth: false,
    isLoading: true
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      direction: "column",
      height: "100vh",
      width: "100vm",
      alignItems: "center",
      justifyContent: "center"
    }
  }));

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setState({ isAuth: true, isLoading: false });
      } else {
        setState({ isAuth: false, isLoading: false });
      }
    });
  }, []);

  const classes = useStyles();
  if (state.isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress
          size={150}
          style={{ color: "rgba(255, 137, 65, 1)" }}
        />

      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" exact />
          </Route>

          <PublicRoute
            component={Login}
            isAuth={state.isAuth}
            restricted={true}
            path="/login"
            exact
          />
          <PublicRoute
            component={Register}
            isAuth={state.isAuth}
            restricted={true}
            path="/register"
            exact
          />
          <PrivateRoute
            component={Home}
            isAuth={state.isAuth}
            path="/home"
            exact
          />
          <PrivateRoute
            component={MyProfile}
            isAuth={state.isAuth}
            path="/profile"
            exact
          />
          <PrivateRoute
            component={MyAccount}
            isAuth={state.isAuth}
            path="/MyAccount"
            exact
          />

          <PrivateRoute
            component={Loading}
            isAuth={state.isAuth}
            path="/loading"
            exact
          />

          <PrivateRoute
            component={chat}
            isAuth={state.isAuth}
            path="/chat"
            exact
          />

          <PrivateRoute
            component={SendMessage}
            isAuth={state.isAuth}
            path="/SendMessage"
            exact
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
