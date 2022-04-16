import React from "react";
import { Link } from "react-router-dom";
import './NoPath.scss'

function NoPath() {
  return (
    <div className="nopath__container">
        <h1 className="nopath__h1">No page found</h1>
        <h2 className="nopath__h2">4<span className="nopath__number">0</span>4</h2>
        <Link to="/" className="button btn__nopath">Login</Link>

    </div>
  )
}

export default NoPath