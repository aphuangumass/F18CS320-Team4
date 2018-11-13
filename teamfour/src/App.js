import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';
import Table from './App_JS_snippet';

class App extends Component {
  
  render() {
    return (
      <div className="App">
          <Table />
      </div>
    );
  }
}

export default App;