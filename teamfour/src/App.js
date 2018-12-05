import React, { Component } from 'react';
import ReactTable from "react-table";
//
import "react-table/react-table.css";
import './App.css';
import Table from './components/table.js';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Topbar from './components/Topbar.js';

class App extends Component {
  


  render() {
    return (
      
      <div className="App">
      <div className="topBar">
        <Topbar/>

      </div>
          
          <Table />
      </div>
    );
  }
}

export default App;