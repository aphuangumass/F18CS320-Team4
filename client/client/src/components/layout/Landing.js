import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    document.body.style = 'background: #006064;';
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
        <img src={require("./logo_resize.png")} alt="logo" class ="brand-logo center" hspace="45%" vspace="2"></img>
          <div className="col s12 center-align">
            <h3>
              <p className="white-text">
              <b>HPE InfoSight™</b> File Browser {" "}
              </p>
              <span style={{ fontFamily: "monospace" }}></span> 
            </h3>
            <h6>
            <p className="white-text text-darken-1">
              Analyze and view files from active systems
            </p>
            </h6>
            <br />
            <Link
                to="/register"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable"
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;