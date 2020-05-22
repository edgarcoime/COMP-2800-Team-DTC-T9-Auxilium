import React, { Component, Fragment } from "react";
import Header from "./../components/Header/Header";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import PostTile from "./../components/PostTile";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import './pages.css'

// Initiates redux connection to the Global store to access Global state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterMsg: "",
    };
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
      
      <div >
        <Header history={this.props.history}/>
        <p className="text-right mr-2 mt-2"><strong>

          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class=" btn twitter-share-button twitter-btn" data-size="large" data-show-count="false">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
                <span className="ml-2">Tweet Us</span>
          </a>
        </strong></p>
        <div className="container">
          
          <h1 className="text-center mt-3">General</h1>
          <Row className="btn-group-toggle" data-toggle="buttons">
            <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
              <Link to="/" className="mt-4">
                <button
                  type="button"
                  className="btn btn-menu w-100 rounded btn-aux"
                >
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
            
            {isAuthenticated ? createPostLink : null}
          </Row>
          <PostTile isAuthenticated={isAuthenticated}/>
        </div>
      </div>
    );
  }
}

// Sets the types of the Global Vars coming in as "props".
Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};

// Maps Redux store to the props of the Home component.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Home);

