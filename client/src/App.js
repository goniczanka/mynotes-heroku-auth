import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  componentDidMount() {
    this.getBlogPosts();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        this.setState({
          title: "",
          body: "",
        });
        this.getBlogPosts(this.state.posts);
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  getBlogPosts = () => {
    axios
      .get("/api")
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  displayBlogPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            placeholder="title"
          />
          <textarea
            name="body"
            onChange={this.handleChange}
            placeholder="body"
          ></textarea>
          <button type="submit">send</button>
        </form>
        <div>{this.displayBlogPosts(this.state.posts)}</div>
      </div>
    );
  }
}
