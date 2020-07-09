import React from "react";
import Note from "../components/Note";

export default function MainPage({ getAllUsersNotes, logValue, notes }) {
  return (
    <div>
      <div>
        <button onClick={getAllUsersNotes}>get all notes</button>
        <button onClick={logValue}>log value</button>
      </div>
      {notes.map((item) => (
        <Note {...item} key={item._id} />
      ))}
    </div>
  );
}
