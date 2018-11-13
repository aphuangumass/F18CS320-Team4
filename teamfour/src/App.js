import React, { Component } from 'react';
<<<<<<< HEAD
import ReactTable from "react-table";
import "react-table/react-table.css";
=======
import './App.css';
import Table from './App_JS_snippet';
>>>>>>> Steven

class App extends Component {
  
  render() {
    const data = [{
      system: '1',
      company: 'Mr. Woo',
      model: '8080',
      serial: '1212'
    },{
      system: '2',
      company: 'Mr. Woo',
      model: '8081',
      serial: '12x34'
    },{
      system: '3',
      company: 'Steel Corp',
      model: '8080',
      serial: '325y6'
    },{
      system: '4',
      company: 'Apple',
      model: '3030',
      serial: '12sfd3'
    }, {
      system: '5',
      company: 'Supermarket Chain America',
      model: '6969',
      serial: '342ppx'
    },{
      system: '6',
      company: 'Mr. Woo Two',
      model: '8083',
      serial: '12x37'
    },{
      system: '7',
      company: 'Mr. Whoo Hoo',
      model: '8083',
      serial: 'erer2'
    },{
      system: '8',
      company: 'Microsoft',
      model: '901',
      serial: 'fxf32'
    },{
      system: '9',
      company: 'Microsoft',
      model: '901',
      serial: 'r43kf'
    }]

    const columns = [{
      Header: 'System',
      accessor: 'system'
    },{
      Header: 'Company Name',
      accessor: 'company'
    }, {
      Header: 'Model',
      accessor: 'model'
    },{
      Header: 'Serial Number',
      accessor: 'serial'
    }]

    return (
<<<<<<< HEAD
          <div>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {9}
                minRows = {20}
                style = {{
                  height: "300px"
                }}
                
              />
          </div>      
    )

=======
      <div className="App">
          <Table />
      </div>
    );
>>>>>>> Steven
  }
}

export default App;