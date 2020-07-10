import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ logoutUser, userAuthenticated }) {
  if (!userAuthenticated) {
    return <></>;
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/">main page</Link>
        </li>
        <li>
          <Link to="/user">user page</Link>
        </li>
        <li>
          <button onClick={logoutUser}>log out</button>
        </li>
      </ul>
    </div>
  );
}
