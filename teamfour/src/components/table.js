import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";

//handles button click
//grabs correct json from row and converts it to a string
//creates blob to be downloaded
//gives blob url
//makes a tempLink object so file can be given name/fileExtension
//clicks tempLink to download file
function handleButtonClick (e, row) {
  var json = JSON.stringify(row.row._original.content, null, ' ');
  var blob = new Blob([json], {type: "octet/stream"});
  var url  = window.URL.createObjectURL(blob);
  var tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', row.row._original.name);
  tempLink.click();
}

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
    }, {
      Header: 'Capacity Less than 30',
      accessor: 'date'
    },{
      Header: 'Download',
      accessor: 'content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button onClick={(e) => handleButtonClick(e, row)}>Download</button>
      )
    }
    // {
    //   Header: 'content',
    //   accessor:  'content',
    // }

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