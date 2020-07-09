import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import MainPage from "./MainPage";

export default class RootPage extends Component {
  state = {
    notes: [],
  };

  getAllNotes = () => {
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

  logValue = () => {
    console.log("log value");
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <MainPage
                  {...props}
                  getAllNotes={this.getAllNotes}
                  logValue={this.logValue}
                  notes={this.state.notes}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
