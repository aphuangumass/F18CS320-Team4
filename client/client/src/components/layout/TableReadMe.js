import React, { Component } from 'react';
import { Col } from 'react-grid-system';


class TableReadMe extends Component {
  render() {
    const name = this.props.name
    return (
        <Col>
        <h><b>Table Readme</b></h>
        <div style={{fontSize:"small"}}>
        <p><b>»</b> The files displayed are for the user: <i>{name.split(" ")[0]}</i>.</p>
        <p><b>»</b> Search the files using any of the column values, such as Model. The search is dynamic, substrings will produce hits.</p>
        <p><b>»</b> Table contents are sortable by the column headers.</p>
        <p><b>»</b> Hover over column headers for more information</p>
        </div>
        </Col>  
    )
  }
}
export default TableReadMe;