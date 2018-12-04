import React, { Component } from 'react';
import ReactTable from "react-table";
//
import "react-table/react-table.css";
import './App.css';
import Table from './components/table.js';
import ReactDOM from 'react-dom';
import Login from './components/login';

class App extends Component {
  
  LogOut(){
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  render() {
    return (
      
      <div className="App">
      <div className="topBar">
        <topBar />

      </div>
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