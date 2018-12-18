import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";
import ReactJson from 'react-json-view'
import { Container, Row, Col } from 'react-grid-system';
import TableReadMe from '../layout/TableReadMe'



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
    treeJSON: {},
    showTree: false,
    filteredData: []
  }
  handleViewClick (e, row) {
    var json = row.row._original.content;
    this.setState ({treeJSON: json});
    console.log(this.state.treeJSON);
    this.setState ({showTree: true});
  }
  onHideTree () {
    this.setState ({showTree: false});
  }

  searchWithin = (str) => {
    return this.state.dbData.filter(entry => str === '' 
    || (entry.serial !== null && entry.serial.toString().toUpperCase().includes(str))
    || (entry.company !== '' && entry.company.toString().toUpperCase().includes(str))
    || (entry.model !== null && entry.model.toString().toUpperCase().includes(str))
    || (entry.fullModel !== null &&entry.fullModel.toString().toUpperCase().includes(str))
    || (entry.osVersion !== null &&entry.osVersion.toString().toUpperCase().includes(str))
    || (str.charAt(2) === '%' && Number(str.substring(0,2)) <= Math.floor((1 - entry.capacity[0]/entry.capacity[1]) * 100))
    )
  }
  
  render() {
    
    const tenant = this.props.tenant
    const filter = this.props.search.toString().toUpperCase()
    const name = this.props.name
    // const filter = (this.props.search === '') ? '' : this.props.search.toString()

    // DELETED "tenants/' + tenant.join(',')" FROM BELOW. ADD TO .../items/
    axios.get('http://localhost:5000/api/items/tenants/' + tenant.join(','))
    .then(res => this.setState({
      dbData: res.data
    //   .filter(x => filter === ""
    //     || x.serial === filter
    //     || x.company === filter
    //     || x.model === filter
    //     || x.fullModel === filter
    //     || x.osVersion === filter
    //     || (filter.charAt(2) === '%' && Number(filter.substring(0,2)) <= Math.floor((1 - x.capacity[0]/x.capacity[1]) * 100))
    //
    }))

    // console.log(filter)

    // console.log(this.state.dbData[0])

    const dateOptions = {year: "numeric", month: "short", day: "numeric"};

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
        <button style={tableButtonWrapper} className="btn btn-small waves-effect #006064 hoverable white-text" onClick={(e) => this.handleViewClick(e, row)} >View</button>
      )
    }, {
      // var per = Math.floor((1 - c.capacity[0] / c.capacity[1]) * 100,
      Header: 'Capacity used',
      accessor: 'capacity',
      sortMethod: (a, b) => {
        // console.log(Number(a[0]),b[1])
        return ((a[0] / a[1]) > (b[0] / b[1])) ? 1 : -1;
      },
      Cell: row => (
        <div
          style={{
            width: '100%',
            height: '50%'
          }}
          >
         {Math.floor((1 - row.value[0] / row.value[1]) * 100)}%
          <div
            style={{
              width: `${Math.floor((1 - row.value[0] / row.value[1]) * 100)}%`,
              height: '50%',
              backgroundColor: Math.floor((1 - row.value[0] / row.value[1]) * 100) < 70 ? '#85cc00'
                // : Math.floor((1 - row.value[0] / row.value[1]) * 100) > 33 ? '#ffbf00'
                : '#ff2e00',
              borderRadius: '2px',
              transition: 'all .2s ease-out'
            }}
          />
        </div>
      )
      // accessor: c => {
      //   var per = Math.floor((1 - c.capacity[0] / c.capacity[1]) * 100)
      //   return ((per >= 70) ? 
      //     (<div style={capStyle}>{per}%</div>):
      //     (<div>{per}%</div>)
      //   )}
    }, {
      Header: 'Download',
      accessor: 'content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button  style={tableButtonWrapper} className="btn btn-small waves-effect #006064 hoverable white-text" onClick={(e) => handleDownloadClick(e, row)}>Download</button>
      )
    }]

    return (  
      <Container>
        <Row>
          <Col md={9}>
            <ReactTable
              data={this.searchWithin(filter)}
              columns={columns}
              defaultPageSize = {10}
            />
          </Col>
          { !this.state.showTree ? <TableReadMe name={name}/>: 
            <Col>
              <h5>File TreeView</h5>
              <button style={treeHideButtonWrapper} onClick={() => this.onHideTree()}>Hide</button>
              <ReactJson src={this.state.treeJSON} collapsed={true} enableClipboard={false} style={{fontSize:"small"}}/>
            </Col>  
          } 
        </Row>
      </Container>
      
    )
  }
}
const tableButtonWrapper = {
  display: 'block',
  margin: 'auto'
}
const treeHideButtonWrapper = {
  display: 'block',
  marginLeft: '15px'
}
export default Table;