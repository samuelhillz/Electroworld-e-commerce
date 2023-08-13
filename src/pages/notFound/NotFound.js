import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-box">
      <div className="notfound">
        <h2>404</h2> <p>Opps, Page not found</p>
        <button>
          <Link style={{ textDecoration: "none",color:'black'}} to="/">
            &larr; Back to home page
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
