import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import MainPage from "./MainPage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import setAuthToken from "../utils/setAuthToken";

export default class RootPage extends Component {
  state = {
    notes: [],
    userNotes: [],
    user: {},
  };

  componentDidMount() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      console.log("decoded token");
      console.log(decoded);
      // Set user and isAuthenticated
      this.setCurrentUser(decoded);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds

      if (decoded.exp < currentTime) {
        // token expired
        // Logout user
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to empty object {} which will set isAuthenticated to false
        this.setCurrentUser({});
        // Redirect to login
        // window.location.href = "./login";
      } else {
        // Get user notes
      }
    } else {
      // User is not authenticated. Redirect user to login page.
    }
  }

  setCurrentUser = (user) => {
    this.setState({ user });
  };

  getAllUsersNotes = () => {
    axios
      .get("/api/notes/all")
      .then((res) => {
        console.log(res.data);
        this.setState({
          notes: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getOneUserNotes = (userID) => {
    console.log(userID);
    axios
      .get("/api/notes", { params: { userID: userID } })
      .then((res) => {
        console.log(res.data);
        this.setState({
          userNotes: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  logValue = () => {
    console.log("log value");
  };

  render() {
    const { user } = this.state;

    return (
      <div>
        <Router>
          <div>
            <ul>
              <h3>
                {user.username ? <b>Hello {user.username}!</b> : "No user"}
              </h3>
              <li>
                <Link to="/">main page</Link>
              </li>
              <li>
                <Link to="/user">user page</Link>
              </li>
              <li>
                <Link to="/login">login page</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <MainPage
                  {...props}
                  getAllNotes={this.getAllUsersNotes}
                  logValue={this.logValue}
                  notes={this.state.notes}
                />
              )}
            />
            <Route
              exact
              path="/user"
              render={(props) => (
                <UserPage
                  {...props}
                  getOneUserNotes={this.getOneUserNotes}
                  nouserNotestes={this.state.userNotes}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <LoginPage {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
