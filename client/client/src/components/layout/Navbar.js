import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue-grey darken-4"style={{
        marginBottom:'30px'/*topBar colliding with table, this doesnt fix*/ 
      }}>

          <img src={require("./hpelogo2_resize.png")} alt="logo" class ="left" hspace="180" vspace="10"></img>
          
          <span className="emailSpot">user@email.com</span>
          <button class="right"
              style={{
                borderRadius: '3px',
                webkitFlex:'none'
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          {/*<a href="#" class="left">Logo</a>*/}

          {/*}
          <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              MERN
            </Link>
            */}


          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;