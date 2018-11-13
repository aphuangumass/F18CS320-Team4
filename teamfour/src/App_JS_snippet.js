import React, { Component } from 'react';
import ReactTable from "react-table";
import axios from 'axios';
import "react-table/react-table.css";

const dbData = 
axios.get('/api/items')
  .then(console.log(Response));

const data = [{
  system: '9',
  company: 'Microsoft',
  model: '901',
  serial: 'r43kf'
}]

class Table extends Component {
  
  render() {

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
          <div>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {25}
              />
          </div>      
    )

  }
}

export default Table;