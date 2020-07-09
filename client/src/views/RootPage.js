import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import MainPage from "./MainPage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";

export default class RootPage extends Component {
  state = {
    notes: [],
    userNotes: [],
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
    return (
      <div>
        <Router>
          <div>
            <ul>
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
