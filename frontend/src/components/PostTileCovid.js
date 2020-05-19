import React, { Component, Fragment } from "react";
import axios from "axios";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import './component.css'


// Component
import CovidPost from "./partials/CovidPost.component";

class PostTileCovid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: []
    };
  }

  postCreated = (createdAt) => {
    let createdWhen = "";
    const created = Date.parse(createdAt);
    let now = Date.now();
    const differenceInMilliSecond = now - created;
    const h = differenceInMilliSecond / 1000 / 60 / 60;
    if (h >= 24) {
      createdWhen = Math.trunc(h / 24) + "d ago";
    } else if (h < 1) {
      createdWhen = Math.trunc(h * 60) + "m ago";
    } else {
      createdWhen = Math.trunc(h) + "h ago";
    }

    return `Created: ${createdWhen}`;
  };

  postUpdated = (updatedAt) => {
    let updatedWhen = "";
    const created = Date.parse(updatedAt);
    let now = Date.now();
    const differenceInMilliSecond = now - created;
    const h = differenceInMilliSecond / 1000 / 60 / 60;
    if (h >= 24) {
      updatedWhen = Math.trunc(h / 24) + "d ago";
    } else if (h < 1) {
      updatedWhen = Math.trunc(h * 60) + "m ago";
    } else {
      updatedWhen = Math.trunc(h) + "h ago";
    }

    return `Updated: ${updatedWhen}`;
  };

  componentDidMount() {
    axios.get("/api/covid/getall").then((res) => {
      const posts = res.data;
      // console.log(posts)
      this.setState({posts: posts });
      this.setState({filteredPosts: posts});
    });
  }

  handleSearchChange = (event) => {
    const { value } = event.target;
    const lowerCaseValue = value.toLowerCase();

    this.setState(prevState => {
      const filteredPosts = prevState.posts.filter(elm => 
        elm.title.toLowerCase().includes(lowerCaseValue)
      );

      return { filteredPosts };
    });
  }

  render() {
    const { filteredPosts } = this.state;
    return (
      <div className="container">
        <div className="form-group has-search mt-4">
            <span className="form-control-logo"><FontAwesomeIcon icon={faSearch} size="lg"/></span>
            <input type="text" className="form-control" placeholder="Search by Title" onChange={this.handleSearchChange}/>
          </div>
        {filteredPosts.map((post) => (
          <TransitionGroup>
            <CSSTransition key={post._id} classNames="fade" timeout={1500}>
              <CovidPost 
                _id={post._id}
                owner={post.owner}
                createdAt={post.createdAt}
                title={post.title}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
                isAuthenticated={ this.props.isAuthenticated }
              />
            </CSSTransition>
          </TransitionGroup>
          
        ))}
      </div>
    );
  }
}

export default PostTileCovid;
