import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";
import ReactJson from 'react-json-view'
import { Container, Row, Col } from 'react-grid-system';
import TableReadMe from '../layout/TableReadMe'
import ReactTooltip from 'react-tooltip'



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
      Header: <p data-tip="Serial number of this machine." style={cellHeaderWrapper}>Serial Number</p>,
      accessor: 'serial'
    }, {
      Header: <p data-tip="The company that is using the system." style={cellHeaderWrapper}>Company</p>,
      accessor: 'company'
    }, {
      Header: <p data-tip="Model of the system." style={cellHeaderWrapper}>Model</p>,
      accessor: 'fullModel'
    }, {
      Header: <p data-tip="The date in which each file was created." style={cellHeaderWrapper}>Date</p>,
      id: 'date',
      accessor: d => new Date(d.date).toLocaleDateString('en-US', dateOptions)
    },{
      Header: <p data-tip="View JSON Tree next to the table." style={cellHeaderWrapper}>View</p>,
      accessor: 'view-content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button style={tableButtonWrapper} className="btn btn-small waves-effect #006064 hoverable white-text" onClick={(e) => this.handleViewClick(e, row)} >View</button>
      )
    }, {
      // var per = Math.floor((1 - c.capacity[0] / c.capacity[1]) * 100,
      Header: <p data-tip="Used capacity, red indicates that over 70% is used." style={cellHeaderWrapper}>Capacity Used</p>,
      accessor: 'capacity',
      sortMethod: (a, b) => {
        // console.log(Number(a[0]),b[1])
        return ((a[0] / a[1]) > (b[0] / b[1])) ? 1 : -1;
      },
      Cell: row => {
        if(Math.floor((1 - row.value[0] / row.value[1]) * 100) > 70)
        return(
        <div
          style={{
            width: '100%',
            height: '50%'
          }}
          >
         <text
          style={{
            paddingRight: '3px'
          }}
         >
         {Math.floor((1 - row.value[0] / row.value[1]) * 100)}%
         </text>
         <img src={require("./900px-GHS-pictogram-exclam.png")} class="center" 
            style={{
              width:'15px',
              height: '15px'
            }}
        ></img>
          <div
            style={{
              width: `${Math.floor((1 - row.value[0] / row.value[1]) * 100)}%`,
              height: '50%',
              backgroundColor: '#ff2e00',
              borderRadius: '2px',
              transition: 'all .2s ease-out'
            }}
          />
        </div>)
        else
        return(
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
                backgroundColor: '#85cc00',
                borderRadius: '2px',
                transition: 'all .2s ease-out'
              }}
            />
          </div>)
      }
      // accessor: c => {
      //   var per = Math.floor((1 - c.capacity[0] / c.capacity[1]) * 100)
      //   return ((per >= 70) ? 
      //     (<div style={capStyle}>{per}%</div>):
      //     (<div>{per}%</div>)
      //   )}
    }, {
      Header: <p data-tip="Download JSON File to local machine." style={cellHeaderWrapper}>Download</p>,
      accessor: 'content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button style={tableButtonWrapper} className="btn btn-small waves-effect #006064 hoverable white-text" onClick={(e) => handleDownloadClick(e, row)}>Download</button>
      )
    }]

    return (  
      <Container>
        <Row>
          <Col md={9.5}>
            <ReactTable
              data={this.searchWithin(filter)}
              columns={columns}
              defaultPageSize = {10}
            />
          </Col>
          { !this.state.showTree ? <TableReadMe name={name}/>: 
            <Col>
              <h6><b>JSON TreeView</b></h6>
              <button className="btn btn-nano waves-effect #006064 hoverable white-text" style={treeHideButtonWrapper} onClick={() => this.onHideTree()}>Hide</button>
              <ReactJson src={this.state.treeJSON} collapsed={true} enableClipboard={false} style={{fontSize:"small"}}/>
            </Col>  
          } 
        </Row>
        <ReactTooltip />
      </Container>
      
    )
  }
}
const cellHeaderWrapper = {
  marginTop: '0',
  marginBottom: '0',
}
const tableButtonWrapper = {
  display: 'block',
  margin: 'auto'
}
const treeHideButtonWrapper = {
  height: '18px',
  lineHeight: '15px',
  padding: '0 0.5rem',
  marginBottom: '5px'
}
export default Table;