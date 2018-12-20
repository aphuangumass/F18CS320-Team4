import React, { Component } from 'react';
import ReactTable from "react-table";
//import ReactJson from 'react-json-view';
import axios from 'axios';
import "react-table/react-table.css";
import ReactJson from 'react-json-view'
import { Container, Row, Col } from 'react-grid-system';
import TableReadMe from '../layout/TableReadMe'
import ReactTooltip from 'react-tooltip'
import './Table.css'


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
  tempLink.setAttribute('download', row.row._original.name);
  tempLink.click();
}

class Table extends Component {
  constructor() {
    super()
    this.state ={
      dbData: [],

      treeJSON: {},
      showTree: false
    };
    // this.fetchData = this.fetchData.bind(this);
  }

  // fetchData(state, instance) {
  //   // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
  //   // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
  //   this.setState({ loading: true });

  //   axios.get('http://localhost:5000/api/items/tenants/' + this.props.tenant.join(',') + '/search/' + this.props.search)
  //   .then(res => this.setState({
  //     dbData: res.data,
  //     loading: false
  //   }))
  // }

  handleViewClick (e, row) {
    var json = row.row._original.content;
    this.setState ({treeJSON: json});
    console.log(this.state.treeJSON);
    this.setState ({showTree: true});
  }

  onHideTree () {
    this.setState ({showTree: false});
  }

  render() {
    // const filter = (this.props.search === '') ? '' : this.props.search.toString()

    // DELETED "tenants/' + tenant.join(',')" FROM BELOW. ADD TO .../items/
    axios.get('http://localhost:5000/api/items/tenants/' + this.props.tenant.join(',') + '/search/' + this.props.search)
    .then(res => {if (this.state.dbData !== res.data) this.setState({dbData: res.data})})

    const name = this.props.name
    // const filter = (this.props.search === '') ? '' : this.props.search.toString()

    const dateOptions = {year: "numeric", month: "short", day: "numeric"};

    const columns = [{
      Header: <p data-tip="Serial number of this machine." style={cellHeaderWrapper}>Serial Number</p>,
      accessor: 'serial',
      className: 'center',
      resizable: false
    }, {
      Header: <p data-tip="The company that is using the system." style={cellHeaderWrapper}>Company</p>,
      accessor: 'company',
      width: 140,
      // className: 'center',
      resizable: false

    }, {
      Header: <p data-tip="Model of the system." style={cellHeaderWrapper}>Model</p>,
      accessor: 'fullModel',
      width: 130,
      resizable: false
    }, {
      Header: <p data-tip="The date in which each file was created." style={cellHeaderWrapper}>Date</p>,
      id: 'date',
      resizable: false,
      accessor: d => new Date(d.date).toLocaleDateString('en-US', dateOptions)
    },{
      Header: <p data-tip="View JSON Tree next to the table." style={cellHeaderWrapper}>View</p>,
      sortable: false,
      resizable: false,
      accessor: 'view-content',
      //creates a new component inside of this column in the table
      Cell : row => (
        //button calls its clicky function when clicked
        <button style={tableButtonWrapper} className="btn btn-small waves-effect #006064 hoverable white-text" onClick={(e) => this.handleViewClick(e, row)} >View</button>
      )
    }, {
      Header: <p data-tip="Used capacity, red indicates that over 70% is used." style={cellHeaderWrapper}>Capacity Used</p>,
      accessor: 'capacityLeft',
      resizable: false,
      sortMethod: (a, b) => {
        // console.log(Number(a[0]),b[1])
        return (a > b) ? 1 : -1;
      },
      Cell: row => {
        if(row.value > 70)
        return(
        <div
          style={{
            width: '100%',
            height: '50%'
          }}
          >
         <text
          style={{
            paddingRight: '5px'
          }}
         >
         {row.value}%
         </text>
         <img src={require("./900px-GHS-pictogram-exclam.png")} class="center" 
            style={{
              width:'15px',
              height: '15px'
            }}
        ></img>
          <div
            style={{
              width: `${row.value}%`,
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
           {row.value}%
            <div
              style={{
                width: `${row.value}%`,
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
      sortable:false,
      resizable: false,
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
              getTheadThProps={() => { return { style: { outline: 0, } }; }}
              onSortedChange={(c, s) => { document.activeElement.blur() }}

              data={this.state.dbData}

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