import React, { Component } from 'react';
import ReactTable from "react-table";
import ReactJson from 'react-json-view';//need to install still
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
    },{
      Header: 'View',
      id: 'click-me-button',
      render: ({ row }) => (<button onClick={(e) => this.handleButtonClick(e, row)}>View</button>)
    }
]

    return (
          <div>
              <ReactTable
                data={this.state.dbData}
                columns={columns}
                defaultPageSize = {25}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      console.log("A Td Element was clicked!");
                      console.log("it produced this event:", e);
                      console.log("It was in this column:", column);
                      console.log("It was in this row:", rowInfo);
                      console.log("It was in this table instance:", instance);
                      <ReactJson src={my_json_object} />
                      
                      // IMPORTANT! React-Table uses onClick internally to trigger
                      // events like expanding SubComponents and pivots.
                      // By default a custom 'onClick' handler will override this functionality.
                      // If you want to fire the original onClick handler, call the
                      // 'handleOriginal' function.
                      if (handleOriginal) {
                        handleOriginal();
                      }
                    }
                  };
                }}
              />
          </div>      
    )

  }
}

export default Table;