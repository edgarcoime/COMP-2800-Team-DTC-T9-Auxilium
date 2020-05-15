import React, { Component, Fragment } from "react";
import Header from "../components/Header/Header";
import {
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import PostTileCovid from "./../components/PostTileCovid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import './pages.css'

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions"

class Covid extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated);

    const createPostLink = (
      <Fragment>
        <Col className="col-12 col-sm-4 mt-5">
          <Link to="/createpost" className="float-right">
            
            <button type="button" id="createpostbtn" className="btn rounded">
              <FontAwesomeIcon icon={faPlusCircle} className="createpostbtn" size="3x" /> 
            </button>
            <label for="createpostbtn" className="createpostbtn">Create a post</label>
          </Link>
        </Col>
      </Fragment>
    );

    return (
      <div>
        <Header history={this.props.history}/>
        <div className="container">
        <h1 className="text-center mt-3">COVID-19</h1>
          <Row>
            <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
              <Link to="/" className="mt-4">
                <button
                  type="button"
                  className="btn btn-menu w-100 rounded btn-aux"
                >
                  {" "}
                  General
                </button>
              </Link>
            </Col>
            <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
              <Link to="/covid">
                <button type="button" className="btn w-100 rounded btn-aux">
                  {" "}
                  COVID-19
                </button>
              </Link>
            </Col>
            { isAuthenticated ? createPostLink : null }
          </Row>
          <PostTileCovid />
        </div>
      </div>
    );
  }
}

Covid.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Covid);