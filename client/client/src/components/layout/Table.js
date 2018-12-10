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
    dbData: [],
    query: '',
    results: []
  }

  
  getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  render() {
    const tenant = this.props.tenant

    axios.get('http://localhost:5000/api/items/tenants/' + tenant.join(','))
    .then(res => this.setState({
      dbData: res.data
    }))

    console.log(this.state.dbData[0])

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
    }, {
      Header: 'Download',
      accessor: 'content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button onClick={(e) => handleButtonClick(e, row)}>Download</button>
      )
    }]


    return (
          <div>
              <form>
                <input
                  placeholder="Search for..."
                  ref={input => this.search = input}
                  onChange={this.handleInputChange}
                  />
                <p>{this.state.query}</p>
              </form>
              <ReactTable
                data={this.state.dbData}
                columns={columns}
                defaultPageSize = {10}
              />
              
          </div>      
    )

  }
}

export default Table;