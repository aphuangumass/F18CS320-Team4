import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Row, Col } from 'react-grid-system';
import Table from "../layout/Table";


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
          <Row>
            <Col md={4}>
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                {/* THROWS TYPE ERROR.V */}
                {/* <b>Full info</b> {user.tenant.join(', ')} */}
                <p className="flow-text grey-text text-darken-1"></p>
              </h4>
            </Col>
            <Col md={4}></Col>
            <Col md={4}>
              <div class="input-field inline">
                {/* <form onSubmit={this.handleSubmit}> */}
                  <label for="search_bar">Search Files...</label>
                  <input value={this.state.value} onChange={this.handleChange}
                    id="search_bar" type="text"/>
                  {/* <button class="waves-effect waves-light btn-small" type="submit" name="action">Submit */}
                  {/* </button> */}
                  {/* </form> */}
              </div>
            </Col>
           </Row>
          <Table tenant={user.tenant} search={this.state.value}/>
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
