import React from "react";

export default function User({ id, username }) {
  return (
    <p>
      <b>{username}: </b>
      {id}
    </p>
  );
}
