import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

const data = [{
  system: '9',
  company: 'Microsoft',
  model: '901',
  serial: 'r43kf'
}]

// TALK ABOUT THIS ********************************************
class SpaceLessthan30 extends React.Component {
  render() {
    return <span>{this.props.value <= 30 ? "Yes" : "No"}</span>;
  }
}

/*********************************************************** */

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
  tempLink.setAttribute('download', 'filename.json');
  tempLink.click();
}

class Table extends Component {
  constructor() {
    super();
    state ={
      dbData: [],
      filtered: [],
      filteredAll: ""
    };
    this.filterAll = this.filterAll.bind(this);
  }

  onFilteredChange(filtered) {
    // console.log('filtered:',filtered);
    // const { sortedData } = this.reactTable.getResolvedState();
    // console.log('sortedData:', sortedData);

    // extra check for the "filterAll"
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = "";
      this.setState({
        filtered: filtered.filter(item => item.id != "all"),
        filterAll
      });
    } else this.setState({ filtered });
  }

  filterAll(e) {
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: "all", value: filterAll }];
    // NOTE: this completely clears any COLUMN filters
    this.setState({ filterAll, filtered });
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
              Filter All:{" "} 
              <input value={this.state.filterAll} onChange={this.filterAll} />
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