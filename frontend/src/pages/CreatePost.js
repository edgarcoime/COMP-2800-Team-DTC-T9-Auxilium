import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { Link, Redirect } from "react-router-dom";  
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./pages.css"

// Components
import Header from "./../components/Header/Header";

// Initiates redux connection to the Global store to access Global state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createPost } from "../actions/postActions";
import { createCovidPost } from "../actions/covidActions";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      redirectToHome: false,
      redirectToCovid: false,
      relatedToCovid: false,
      askForHelp: false,
    };
  }

  // On change handler for input fields to change state.
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // On change handler for checkbox input fields to change state.
  onChangeCheckBox = (e) => {
    this.setState({ [e.target.name]: e.target.checked})
  }

  // Creates a new post depending on checkbox 
  // 1. Checks to see if checkbox was checked
  // 2. Depending on step one either creates a general post or a covid post
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, relatedToCovid } = this.state;

    if (relatedToCovid) {
      const newCovidPost = {
        title,
        content,
        owner: this.props.user.name,
        ownerId: this.props.user._id,
        ownerEmail: this.props.user.email
      };
      console.log(newCovidPost)
      this.props.createCovidPost(newCovidPost);
      this.setState({ redirectToCovid: true })
    } else {
      const newPost = {
        title,
        content,
        owner: this.props.user.name,
        ownerId: this.props.user._id,
      };
      console.log(newPost)
      this.props.createPost(newPost);
      this.setState({ redirectToHome: true });
    }
  };

  // Redirects user back to the landing page(General page) if the user is not authorized.
  // Unauthorized users cannot create posts
  componentDidMount = () => {
    if (!this.props.isAuthenticated) this.props.history.push("/");
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    };
    if (this.state.redirectToCovid) {
      return <Redirect to="/covid" />
    }
    return (
      <div>
        <Header history={this.props.history}/>
        <Link to="/" className="mt-4">
          <button
            type="button"
            className="btn"
          >
            <span><FontAwesomeIcon className="mt-3" icon={faArrowLeft} size="2x" /></span>
            
          </button>
        </Link>
        <div className="container mt-3">
            <Card className="bg-light shadow-sm mx-auto">
              <CardHeader>
                <p><strong>Create a Post</strong></p>
              </CardHeader>
              <CardBody className=" w-75 mx-auto">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={this.onChange}
                    placeholder="Post title"
                    className="form-control  "
                  />
                  <textarea
                    type="text"
                    name="content"
                    id="content"
                    onChange={this.onChange}
                    placeholder="Content Body"
                    className="form-control  mt-4"
                    rows="3"
                  />
                  <div className="custom-control custom-checkbox mt-2">
                    <Row>
                      <Col className="col-12 col-sm-6">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          name="relatedToCovid"
                          value="option1"
                          onChange={this.onChangeCheckBox}
                        />
                        <label
                          className="custom-control-label"
                          name="relatedToCovid"
                          for="inlineCheckbox1"
                        >
                          Related to COVID-19
                        </label>
                      </Col>
                      <Col className="col-12 col-sm">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value="option2"
                          onChange={this.onChangeCheckBox}
                          name="askForHelp"
                        />
                        <label
                          className="custom-control-label"
                          name="askForHelp"
                          for="inlineCheckbox2"
                        >
                          Ask for Help
                      </label>
                      </Col>
                    </Row>
                  
                    
                  </div>
                  <div>
                    <button type="submit" className="btn btn-aux mt-3">
                      Send
                    </button>
                  </div>
                </form>
              </CardBody>
          </Card>
        </div>
        
      </div>
    );
  }
}

// Sets the types of the Global Vars coming in as "props".
CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

// Maps Redux store to the props of the LikeComment component.
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createPost, createCovidPost })(CreatePost);
