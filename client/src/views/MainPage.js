import React from "react";
import Note from "../components/Note";

export default function MainPage({ getAllNotes, logValue, notes }) {
  return (
    <div>
      <div>
        <button onClick={getAllNotes}>get all notes</button>
        <button onClick={logValue}>log value</button>
      </div>
      {notes.map((item) => (
        <Note {...item} key={item._id} />
      ))}
    </div>
  );
}
