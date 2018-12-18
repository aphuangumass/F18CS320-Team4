import React, { Component } from 'react';
import { Col } from 'react-grid-system';


class TableReadMe extends Component {
  render() {
    const name = this.props.name
    return (
        <Col>
        <h><b>Table Readme</b></h>
        <div style={{fontSize:"small"}}>
        <p>The files displayed are for the user: <i>{name.split(" ")[0]}</i>.</p>
        <p>Search the files using any of the column values, such as Model. The search is dynamic, substrings will produce hits.</p>
        <p>Table contents are also filterable by the column headers (High - Low).</p>
        <p>Used capacities are shown. A red bar indicates that used space has surpassed 70%.</p>
        <p>Click the view button on any row to view the json for that system. It will overlay this readme; hiding the json tree will bring the readme back into view.</p>
        <p>Download will download the json file to your local system.</p>
        
        </div>
        </Col>  
    )
  }
}
export default TableReadMe;