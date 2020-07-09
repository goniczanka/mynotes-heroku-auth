import React, { Component } from "react";
import axios from "axios";
import User from "../components/User";

export default class UserPage extends Component {
  state = {
    userID: "",
    users: [],
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    axios.get("/api/users").then((res) => {
      console.log(res.data);
      const users = res.data.map((user) => ({
        id: user._id,
        username: user.username,
      }));
      this.setState({
        users: users,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      userID: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { getOneUserNotes } = this.props;
    getOneUserNotes(this.state.userID);
  };

  render() {
    const { userID } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            value={userID}
            onChange={this.handleChange}
          />
          <button type="submit">get user notes</button>
        </form>
        <div>
          {this.state.users.map((user) => (
            <User {...user} key={user._id} />
          ))}
        </div>
      </div>
    );
  }
}
