import React, { Component } from 'react';
import ReactTable from "react-table";
import axios from 'axios';
import "react-table/react-table.css";

const data = [{
  system: '9',
  company: 'Microsoft',
  model: '901',
  serial: 'r43kf'
}]

class Table extends Component {
  state ={
    dbData: []
  }
  
  render() {
    axios.get('http://localhost:5000/api/items')
    .then(res => this.setState({
      dbData: res.data
    }))

    //console.log(this.state.dbData)

    const columns = [{
      Header: 'Serial Number',
      accessor: 'serial'
    }, {
      Header: 'Company Name',
      accessor: 'company'
    }, {
      Header: 'Model',
      accessor: 'model'
    }, {
      Header: 'Date',
      accessor: 'date'
    }
]

    return (
          <div>
              <ReactTable
                data={this.state.dbData}
                columns={columns}
                defaultPageSize = {25}
              />
          </div>      
    )

  }
}

export default Table;