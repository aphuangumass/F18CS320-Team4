import ReactDOM from 'react-dom';
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Table from "../layout/Table";
import { unwatchFile } from 'fs';


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    console.log(user);
return (
        <div>
          <Table tenant={user.tenant}/>
        </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
