import React from "react";

export default function Note({ title, content }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
