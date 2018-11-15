import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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
    } 
}
render() {
    return (
      <div style = {outerStyle}>
          <h2 style={headStyle}>Please Enter Email and Password</h2>
          <div><center>
              <input style={textFieldStyle}
              className = "textIn"
              type="text"
              placeholder="email"
              onChange={event =>this.setState({email: event.target.value})}
              /></center>
            </div>
            <div><center>
              <input style={textFieldStyle}
              className = "textIn"
              type = "password"
              placeholder = "password"
              onChange={event =>this.setState({password: event.target.value})}
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
      
    );
  }
}
const headStyle = {
    textAlign: 'center',
};
const textFieldStyle = {
    margin: '15px',
    align: 'center',
    float: 'center',
    padding: '10px'
};
const buttonStyle = {
    backgroundColor: '#0dab7f', /* HPE green*/
    border: 'none',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginLeft: '45%',
    marginTop: '10px',
    marginBottom: '20px'
}
const outerStyle = {
    borderStyle: 'solid',
    borderColor: '#5f7a76',
    margin: '100px',
    borderWidth: '7px',
    borderRadius: '30px'
}
export default Login;