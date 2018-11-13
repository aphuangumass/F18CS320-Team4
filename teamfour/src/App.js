import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const data = [{
  system: '1',
  company: 'Mr. Woo',
  model: '8080',
  serial: '1212',
  link: <a href="">download</a>
},{
  system: '2',
  company: 'Mr. Woo',
  model: '8081',
  serial: '12x34',
  link: <a href="">download</a>
},{
  system: '3',
  company: 'Steel Corp',
  model: '8080',
  serial: '325y6',
  link: <a href="">download</a>
},{
  system: '4',
  company: 'Apple',
  model: '3030',
  serial: '12sfd3',
  link: <a href="">download</a>
}, {
  system: '5',
  company: 'Supermarket Chain America',
  model: '6969',
  serial: '342ppx',
  link: <a href="">download</a>
},{
  system: '6',
  company: 'Mr. Woo Two',
  model: '8083',
  serial: '12x37',
  link: <a href="">download</a>
},{
  system: '7',
  company: 'Mr. Whoo Hoo',
  model: '8083',
  serial: 'erer2',
  link: <a href="">download</a>
},{
  system: '8',
  company: 'Microsoft',
  model: '901',
  serial: 'fxf32',
  link: <a href="">download</a>
},{
  system: '9',
  company: 'Microsoft',
  model: '901',
  serial: 'r43kf',
  link: <a href="">download</a>
}]
 
const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let sortedData = data;

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(sortedData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }  

  render() {
    const { data, pages, loading} = this.state;
    const columns = [{
      Header: 'System',
      accessor: 'system'
    },{
      Header: 'Company Name',
      accessor: 'company'
    },{
      Header: 'Model',
      accessor: 'model'
    },{
      Header: 'Serial Number',
      accessor: 'serial'
    },{
      Header: 'Download Link',
      accessor: 'link',
      content: <a href=""></a>
    }]

    return (
      <div id class="table1">
        <h2 style={{ padding: "10px 20px", textAlign: "center", color: "white"}}>Snail Team 6</h2>
          <div>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {9}
                minRows = {20}
                style = {{
                  height: "300px"
                }}
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change
              />
          </div>
      </div>    
    )

  }
}

export default App;