import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
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
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
