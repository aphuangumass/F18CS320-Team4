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
      <div>
          <h2 className = "LogHead">Log In</h2>
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
              onClick={() => this.Login()}
              > Log In</button>

          </div>
      </div>
    );
  }
}

export default Login;