import React, { Component } from 'react';
<<<<<<< HEAD
// import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';
import Table from './components/table.js';
=======
import ReactTable from "react-table";
//
import "react-table/react-table.css";
import './App.css';
import Table from './table.js';
import ReactDOM from 'react-dom';
import Login from './login';
>>>>>>> e29bb23e8e99c8c07757489653d6bc50702e3eab

class App extends Component {
  
  LogOut(){
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  render() {
    return (
      
      <div className="App">
          <button
              className = "btn btn-primary"
              type = "button"
              onClick = {() => this.LogOut()} 
          > Log Out</button>
          <Table />
      </div>
    );
  }
}

export default App;