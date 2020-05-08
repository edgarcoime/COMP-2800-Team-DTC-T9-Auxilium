import React, { Component } from "react";
import { Col, Card, CardBody } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Components
import Header from "./../components/Header/Header";

// Redux
import { connect } from "react-redux";
import { createPost } from "../actions/postActions";
import PropTypes from "prop-types";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      redirectToHome: false,
      relatedToCovid: false,
      askForHelp: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckBox = (e) => {
    const nameOfState = e.target.name
    this.setState({ [e.target.name]: e.target.checked})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, relatedToCovid, askForHelp } = this.state;

    if (relatedToCovid) {
      const newCovidPost = {
        title,
        content,
        owner: this.props.user.name,
        ownerId: this.props.user._id,
      };
      console.log(newCovidPost);
      this.setState({ redirectToHome: true })
    } else {
      
      const newPost = {
        title,
        content,
        owner: this.props.user.name,
        ownerId: this.props.user._id,
      };
      console.log(newPost);
      this.props.createPost(newPost);
      // this.props.history.push("/");
      this.setState({ redirectToHome: true });
    }
  };

  componentDidMount = () => {
    if (!this.props.isAuthenticated) this.props.history.push("/");
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        <div className="container">
          <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
            <Link to="/" className="mt-4">
              <button
                type="button"
                className="btn btn-menu w-75 rounded btn-success"
              >
                Post
              </button>
            </Link>
          </Col>
        </div>
        <Card className="bg-info shadow mx-auto w-75">
          <CardBody className="mx-auto w-50">
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
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  name="relatedToCovid"
                  value="option1"
                  onChange={this.onChangeCheckBox}
                />
                <label
                  class="form-check-label"
                  name="relatedToCovid"
                  for="inlineCheckbox1"
                >
                  Related to COVID-19
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                  onChange={this.onChangeCheckBox}
                  name="askForHelp"
                />
                <label
                  class="form-check-label"
                  name="askForHelp"
                  for="inlineCheckbox2"
                >
                  Ask for Help
                </label>
              </div>
              <div>
                <button type="submit" className="btn btn-success mt-5">
                  Send
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
