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
  }

  render() {
    
    const tenant = this.props.tenant
    const filter = this.props.search
    // const filter = (this.props.search === '') ? '' : this.props.search.toString()

    axios.get('http://localhost:5000/api/items/tenants/' + tenant.join(','))
    .then(res => {if(this.state.dbData !== res.data) this.setState({
      dbData: res.data
    //   .filter(x => filter === ""
    //     || x.serial === filter
    //     || x.company === filter
    //     || x.model === filter
    //     || x.fullModel === filter
    //     || x.osVersion === filter
    //     || (filter.charAt(2) === '%' && Number(filter.substring(0,2)) <= Math.floor((1 - x.capacity[0]/x.capacity[1]) * 100))
    // )
  })})

    console.log(filter)

    // console.log(this.state.dbData[0])

    var dateOptions = {year: "numeric", month: "short", day: "numeric"};

    const capStyle = {
      backgroundColor: '#fa8072',
      borderRadius: '5px'
    }

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
      Header: 'Capacity used',
      id: 'capacity',
      accessor: c => {
        var per = Math.floor((1 - c.capacity[0] / c.capacity[1]) * 100)
        return ((per >= 70) ? 
          (<div style={capStyle}>{per}%</div>):
          (<div>{per}%</div>)
        )}
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
              <ReactTable
                data={this.state.dbData.filter(x => filter === ""
                    || x.company === filter
                    || x.model === filter
                    || x.fullModel === filter
                    || x.osVersion === filter
                    || (filter.charAt(2) === '%' && Number(filter.substring(0,2)) <= Math.floor((1 - x.capacity[0]/x.capacity[1]) * 100))
                )}
                columns={columns}
                defaultPageSize = {15}
              />
              
          </div>      
    )

  }
}

export default Table;