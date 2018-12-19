import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Row, Col } from 'react-grid-system';
import Table from "../layout/Table";
import './Dashboard.css';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      // search: ''
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.setState({search: this.state.value});
  // }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    document.body.style = 'background: white;';
    const { user } = this.props.auth;
    console.log(user);
return (
        <Container>
            <Col >
              <div class="input-field inline">
                {/* <form onSubmit={this.handleSubmit}> */}
                  <label htmlFor="search_bar">Search Files...</label>
                  <input value={this.state.value} onChange={this.handleChange}
                    id="search_bar" type="text"/>
                  {/* <button class="waves-effect waves-light btn-small" type="submit" name="action">Submit */}
                  {/* </button> */}
                  {/* </form> */}
              </div>
            </Col>
          
          <Table tenant={user.tenant} name={user.name} search={this.state.value}/>
        </Container>
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
