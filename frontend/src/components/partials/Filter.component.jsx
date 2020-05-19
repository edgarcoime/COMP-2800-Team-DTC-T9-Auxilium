import React, { Component } from 'react';
import { connect } from "react-redux";
// import {filterPosts} from "../../actions/postActions"
import {getAllPosts, filterPost} from "../../actions/postActions"
class Filter extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          isOpen: false,
          search: ""
        };
      }
    // handleChangeWord = (e) => {
    //     this.setState({word: e.target.value});
    //     this.listPost();
    //   }
    //   listPost = () =>{
    //     this.setState(state=>{
    //       if(state.word !=''){
    //         return { posts: state.posts.filter(a=>
    //           a.avilablePosts.indexof(state.word.toUpperCase())>=0
    //           )}
    //       }
    //     })
    //   }
    updateSearch = (e) =>{
        this.setState({search: e.target.value.substr(0,20)})
    }
    componentDidMount() {
        this.props.getAllPosts()
    }

    render(){
        console.log(this.props.filterPosts)
        return(
        <form class='navbar-form rounded'>
                <div class='input-group mt-3 rounded'>
                  {/* <input class='form-control' type='text' name='search' placeholder='Search by title' value={this.state.search} onChange={this.updateSearch.bind(this)} /> */}
                  <input class='form-control' type='text' name='search' placeholder='Search by title' value={this.props.word} 
                 onChange={(event) => {
                this.props.filterPost(
                  this.props.posts,
                  event.target.value
                ) ;
              } } />
                  <span class="input-group-btn">
                    <button type='submit' class='btn text-link'>
                      <span class='fa fa-search fa-lg'></span>
                    </button>
                  </span>
                </div>
              </form>
        )
    }
}
const mapStateToProps = (state) => ({
    posts: state.post.posts,
    word: state.post.word,
    filterPosts: state.post.filterPosts
  });

export default connect(mapStateToProps, {getAllPosts, filterPost})(Filter);