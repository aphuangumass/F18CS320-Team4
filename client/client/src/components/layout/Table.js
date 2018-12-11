import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";
import JSONTree from 'react-json-tree'
import ReactJson from 'react-json-view'



//handles button click
//grabs correct json from row and converts it to a string
//creates blob to be downloaded
//gives blob url
//makes a tempLink object so file can be given name/fileExtension
//clicks tempLink to download file
function handleDownloadClick (e, row) {
  var json = JSON.stringify(row.row._original.content, null, ' ');
  var blob = new Blob([json], {type: "octet/stream"});
  var url  = window.URL.createObjectURL(blob);
  var tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', 'filename.json');
  tempLink.click();
}

class Table extends Component {
  state ={
    dbData: [],
    treeJSON: JSON
  }
  handleViewClick (e, row) {
    var json = row.row._original.content;
    this.setState ({treeJSON: json});
    console.log(this.state.treeJSON);
  }

  render() {
    const tenant = '' + this.props.tenant

    axios.get('http://localhost:5000/api/items/')
    .then(res => this.setState({
      dbData: res.data
    }))

    var dateOptions = {year: "numeric", month: "short", day: "numeric"};

    const columns = [{
      Header: 'Serial Number',
      accessor: 'serial'
    }, {
      Header: 'Company Name',
      accessor: 'company'
    }, {
      Header: 'Model',
      accessor: 'fullModel'
    }, {
      Header: 'Date',
      id: 'date',
      accessor: d => new Date(d.date).toLocaleDateString('en-US', dateOptions)
    },{
      Header: 'View',
      accessor: 'view-content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button onClick={(e) => this.handleViewClick(e, row)} >View</button>
      )
    }, {
      Header: 'Download',
      accessor: 'content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button onClick={(e) => handleDownloadClick(e, row)}>Download</button>
      )
    }]


    return (
          <div>
              <ReactTable
                data={this.state.dbData}
                columns={columns}
                defaultPageSize = {10}
              />
              <h5>File TreeView</h5>
              <ReactJson src={this.state.treeJSON} collapsed={true} />
              {/* <JSONTree data={this.state.treeJSON} invertTheme={true}/> */}
              
          </div>      
    )

  }
}
export default Table;