import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue-grey darken-4">
          <Link to="/">
            <img src={require("./hpelogo2_resize.png")} alt="logo" class ="left" hspace="180" vspace="10"></img>
          </Link>

          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;