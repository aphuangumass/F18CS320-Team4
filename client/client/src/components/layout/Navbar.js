import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import { logoutUser } from "../../actions/authActions";
import './Navbar.css';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : ''
      // search: ''
    };
    
    this.handleChange = this.handleChange.bind(this);  // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated)
      {
        this.setState({
               user: nextProps.auth.user.name
        })
      }
    }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {


    let button;
    const { user } = this.props.auth;   //getting user
    const {isAuthenticated} = this.props.auth;  //checking if user is logged in 

    if (isAuthenticated) {
      button = <LogoutButton onClick={this.onLogoutClick} class="waves-effect waves-light btn-small"/>;
    } 
    else {
      button = null;
    }
    
    
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue-grey darken-4">
          <Link to="/">
            <img src={require("./hpelogo2_resize.png")} alt="logo" class ="left" hspace="100" vspace="10"></img>
          </Link>

          <ul id="nav-mobile" class="right hide-on-med-and-down">
             <li className="greeterino">  <Greeting user= {user} isLoggedIn={isAuthenticated} /></li>
             <li className="logouterino"> {button } </li>
          </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting name={props.user.name}/>;
  }
  return <GuestGreeting />;
}

function UserGreeting(props) {
  return  <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li> Hello,&nbsp;</li>
              <li> {props.name} </li>
          </ul>;
}

function GuestGreeting(props) {
  return <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li> <Link to="/register"> Register </Link> </li>
          <li> <Link to="/login"> Login </Link> </li>
        </ul>;
}

function LogoutButton(props) {
  return (
    <button className="btn btn-small waves-effect #006064 hoverable white-text" onClick={props.onClick}>
      Logout
    </button>
  );
}


Navbar.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  logoutUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentUser, logoutUser }, 
)(Navbar);