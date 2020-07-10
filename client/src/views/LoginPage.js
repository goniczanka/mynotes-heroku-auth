import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { Redirect } from "react-router-dom";

export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    userAuthenticated: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(user);

    axios
      .post("/api/user/login", user)
      .then((res) => {
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        this.props.setUserAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };

  render() {
    const { userAuthenticated } = this.props;
    return (
      <>
        {userAuthenticated && <Redirect to="/" />}
        <p>{userAuthenticated ? "logged in" : "logged out"}</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="username"
            name="username"
            value={this.state.username}
          />
          <input
            type="password"
            onChange={this.handleChange}
            placeholder="password"
            name="password"
            value={this.state.password}
          />
          <button type="submit">submit</button>
        </form>
      </>
    );
  }
}
