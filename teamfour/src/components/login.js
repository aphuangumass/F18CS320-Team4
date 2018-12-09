import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import snail from '../assets/snailTeamSixWhite.png';

class Login extends Component {
constructor(props){
    super(props)
    this.state = {
        email: '',
        password: ''
    }
}
Login(){
    console.log("this.state", this.state);
    if(this.state.email=="admin@umass.edu"&&this.state.password=="password")
    {ReactDOM.render(<App />, document.getElementById('root'));}

    else{
        console.log("Wrong pwrd/user");
        console.log(this.state);
        alert("Wrong Password/User");
    } 
}
render() {
    return (
    <div style={loginBody}>
      <h1 style={loginHeader}>Snail Team Six</h1>
      <div style = {outerStyle}>
          <h2 style={headStyle}>Please Enter Email and Password</h2>
          <div><center>
              <input style={textFieldStyle}
              className = "textIn"
              type="text"
              placeholder="email"
              onChange={event =>this.setState({email: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.Login();
                }
              }}
              /></center>
            </div>
            <div><center>
              <input style={textFieldStyle}
              className = "textIn"
              type = "password"
              placeholder = "password"
              onChange={event =>this.setState({password: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.Login();
                }
              }}
              /></center>
              
            </div>
            <div>
              <button style = {buttonStyle}
              className = "btn btn-primary"
              type = "button"
              onClick={() => this.Login()}
              > Log In</button>
              </div>
              
          </div>
          <img src={snail} style={imageStyle}></img>
    </div>
    );
  }
}

const loginBody = {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    backgroundColor: '#557B78'
}
const loginHeader = {
    textAlign: 'center', 
    color: 'white',
}
const headStyle = {
    textAlign: 'center',
}
const textFieldStyle = {
    margin: '15px',
    align: 'center',
    float: 'center',
    padding: '10px'
}
const buttonStyle = {
    backgroundColor: '#0dab7f', /* HPE green*/
    border: 'none',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginLeft: '47.5%',
    marginTop: '10px',
    marginBottom: '20px'
}
const outerStyle = {
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: 'white',
    margin: '25px',
    borderWidth: '7px',
    borderRadius: '30px'
}
const imageStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: '43%',
    bottom: '0'
}
export default Login;
