import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import user from "../dashboard/Dashboard.js";
import PropTypes from "prop-types";

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
          <button class="right"
              style={{
                borderRadius: '3px',
                webkitFlex:'none',
                float:'right',
                marginRight:'15%',
                marginTop:'5px',
                backgroundColor:'	#2ad2c9'
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          
          <span className="emailSpot" style={{
            float:'right',
            fontSize:'20px'
          }}> {user.name.split(" ")[0]}</span>
          <img src={require("./userWhite.png")} alt="user" class ="img" hspace="10" vspace="15" style={{
            float:'right'
          }}></img>
          
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