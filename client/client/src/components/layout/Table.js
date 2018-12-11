import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import "./Table.css";
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
  constructor() {
    super();
    this.state ={
      dbData: [],
      filtered: [],
      filterAll: ""
    };
    this.filterAll = this.filterAll.bind(this)
  }

  onFilteredChange(filtered) {
    // extra check for the "filterAll"
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = "";
      this.setState({
        filtered: filtered.filter(item => item.id !== "all"),
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
    const tenant = this.props.tenant

    axios.get('http://localhost:5000/api/items/tenants/' + tenant.join(','))
    .then(res => this.setState({
      dbData: res.data
    }))

    console.log(this.state.dbData[0])

    var dateOptions = {year: "numeric", month: "short", day: "numeric"};

    return (
          <div className="tableOuter">
            Search by...
              <input value={this.state.filterAll} placeholder="Serial #, Company, or Model" onChange={this.filterAll} />
              <ReactTable

                filtered={this.state.filtered}

                ref={r => (this.reactTable = r)}
                onFilteredChange={this.onFilteredChange.bind(this)}

                data={this.state.dbData}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value
                }

                columns={[
                {
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
                    <button 
                    style={{
                      borderRadius:'4px',
                      border: '4px solid #33ccff',
                      backgroundColor:'#33ccff'
                    
                    }}onClick={(e) => handleButtonClick(e, row)}>Download</button>
                  )
                }, {
                  Header: "All",
                  id: "all",
                  width: 0,
                  resizable: false,
                  sortable: false,
                  Filter: () => {},
                  getProps: () => {
                    return {
                      // style: { padding: "0px"}
                    };
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: ['serial', 'company', 'fullModel'],
                      threshold: matchSorter.rankings.WORD_STARTS_WITH
                    });
                    console.log("row[0]:", result[0]);
                    return result;
                  },
                  filterAll: true
                }]}
                defaultPageSize = {10}
              />
          </div>      
    )

  }
}

export default Table;
        