import React, { Component, Fragment } from "react";
import Header from "./../components/Header/Header";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import PostTile from "./../components/PostTile";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated);

    const createPostLink = (
      <Fragment>
        <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
          <Link to="/createpost">
            <button type="button" className="btn w-100 rounded btn-warning">
              {" "}
              Create a Post
            </button>
          </Link>
        </Col>
      </Fragment>
    );

    return (
      <div>
        <Header />
        <div className="container">
          <Row>
            <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
              <Link to="/" className="mt-4">
                <button
                  type="button"
                  className="btn btn-menu w-100 rounded btn-warning"
                >
                  {" "}
                  General
                </button>
              </Link>
            </Col>
            <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
              <Link to="/covid">
                <button type="button" className="btn w-100 rounded btn-warning">
                  {" "}
                  COVID-19
                </button>
              </Link>
            </Col>
            {isAuthenticated ? createPostLink : null}
          </Row>
          <PostTile />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Home);
