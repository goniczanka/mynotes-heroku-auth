import React, { Component } from "react";
import Note from "./components/Note";
import axios from "axios";

export default class App extends Component {
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

  render() {
    return (
      <div>
        <div>
          <button onClick={this.getAllNotes}>get all notes</button>
        </div>
        {this.state.notes.map((item) => (
          <Note {...item} key={item._id} />
        ))}
      </div>
    );
  }
}
