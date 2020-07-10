import React from "react";
import Note from "../components/Note";
import { Redirect } from "react-router-dom";

export default function MainPage({
  getAllUsersNotes,
  logValue,
  notes,
  userAuthenticated,
}) {
  return (
    <div>
      {userAuthenticated ? "yes" : "no"}
      {!userAuthenticated && <Redirect to="/login" />}
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
