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
Validate(){
    //if the username and password work login
    console.log("VALIDATING");
    if(this.state.email === "admin@umass.edu" && this.state.password === "password"){
        console.log("this.state", this.state);
        ReactDOM.render(<App />, document.getElementById('root'));
    }
    else{
        window.confirm("incorrect login credentials");
    }
}
render() {
    return (
      <div>
          <h2>Log In</h2>
          <div>
              <input
              className = "textIn"
              type="text"
              placeholder="email"
              onChange={event =>this.setState({email: event.target.value})}
              />
              <input
              className = "textIn"
              type = "password"
              placeholder = "password"
              onChange={event =>this.setState({password: event.target.value})}
              />
              <button
              className = "btn btn-primary"
              type = "button"
              onClick={() => this.Validate()}
              > Log In</button>

          </div>
      </div>
    );
  }
}
export default Login;