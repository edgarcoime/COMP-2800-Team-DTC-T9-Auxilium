import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Card, CardImg, CardText, CardBody, CardLink,CardTitle, CardSubtitle } from 'reactstrap'
import LikeComment from './LikeComment'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeart1, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { UncontrolledCollapse, Button } from 'reactstrap';

class PostTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isClicked: 0,
            comments: [],
            newData:[],
        }
        this.handleLikeClick = this.handleLikeClick.bind(this);
        this.makeComment = this.makeComment.bind(this);
        this.addLike = this.addLike.bind(this)
    }

    onChangeComment = (e) =>{
        this.setState({
        comment: e.target.value
        })
    }

    whenPosted(createdAt) {
        const created = Date.parse(createdAt);
        let now = Date.now();
        const differenceInMilliSecond = now - created;
        const h = differenceInMilliSecond/1000/60/60;
        console.log(h);
        if (h >= 24) {
            return Math.trunc(h / 24) + 'd ago';
        } else if (h < 1) {
            return Math.trunc(h * 60) + 'm ago';
        }
        return Math.trunc(h) + 'h ago';
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/posts/getall')
            .then(res => {
                const posts = res.data;
                this.setState({posts})
            })
    }

    handleLikeClick() {
        if(this.state.isClicked == 0) {
            this.setState({isClicked: 1});
        } else {
            this.setState({isClicked: 0});
        }
    }

    makeComment = async(text,postId) =>{
        const comment = {
            text: text,
            owner: localStorage.getItem("name"),
            postId: postId
        }
        
        const newConfig = {
            "headers": {
                "x-auth-token":`${localStorage.getItem("jwt")}`
             }
        }
        // const OMG = JSON.parse(JSON.stringify(newConfig))        
        
        await axios.post('http://localhost:5000/api/posts/comment',comment)
        .then(res =>  {
            const result = res.data;
            console.log(result.comments.length);
            const newData = this.state.posts.map(post =>{
            console.log(post)
            if(post._id==result._id){
                console.log("pass1");
                console.log(result.comments.length);
                
                return result;
                
            }else{
                console.log("pass2");

                return post;

            }
            })
            console.log(newData)
            this.setState(newData);
        })
        .catch(err => console.log(err))   
    }

    deleteComment = async(text,postId) =>{
        
        const comment = {
            text: text,
            owner: localStorage.getItem("name"),
            postId: postId
        }
        
        const newConfig = {
            "headers": {
                "x-auth-token":`${localStorage.getItem("jwt")}`
             }
        }
        // const OMG = JSON.parse(JSON.stringify(newConfig))        
        
        await axios.post('http://localhost:5000/api/posts/comment/delete',comment)
        .then(res =>  {
            const result = res.data;
            console.log(result.comments.length);
            const newData = this.state.posts.map(post =>{
            console.log(post)
            if(post._id==result._id){
                console.log("pass1");
                console.log(result.comments.length);
                
                return result;
                
            }else{
                console.log("pass2");

                return post;

            }
            })
            console.log(newData)
            this.setState(newData);
        })
        .catch(err => console.log(err))   
    }

    addLike = async(click,postId) =>{
        this.setState({isClicked: 1});
        console.log(click)
        if(this.state.isClicked !=0){
        const like = {
            owner: localStorage.getItem("name"),
            postId: postId
        }
        
        const newConfig = {
            "headers": {
                "x-auth-token":`${localStorage.getItem("jwt")}`
             }
        }
        // const OMG = JSON.parse(JSON.stringify(newConfig))        
        await axios.post('http://localhost:5000/api/posts/like',like)
        .then(res =>  {
            const result = res.data;
            console.log(result.likes.length);
            const newData = this.state.posts.map(post =>{
            console.log(post)
            if(post._id==result._id){
                console.log("pass1");                
                return result;
                
            }else{
                console.log("pass2");

                return post;

            }
            })
            console.log(newData)
            this.setState(newData);
        })
        .catch(err => console.log(err))
   
    }else{
        this.setState({isClicked: 0});
        const like = {
            owner: localStorage.getItem("name"),
            postId: postId
        }
        
        const newConfig = {
            "headers": {
                "x-auth-token":`${localStorage.getItem("jwt")}`
             }
        }
        // const OMG = JSON.parse(JSON.stringify(newConfig))        
        await axios.post('http://localhost:5000/api/posts/like/delete',like)
        .then(res =>  {
            const result = res.data;
            console.log(result.likes.length);
            const newData = this.state.posts.map(post =>{
            console.log(post)
            if(post._id==result._id){
                console.log("pass1");                
                return result;
                
            }else{
                console.log("pass2");

                return post;

            }
            })
            console.log(newData)
            this.setState(newData);
        })
        .catch(err => console.log(err))  
     
    }
    }
    
   

    render() {
    
        return (

            <div> 
                {
                    this.state.posts.map(post =>
                        <Row>
                            <Col className="mt-5">
                                <Card className="bg-light shadow-sm">
                                    <CardTitle className="p-3">
                                        <Row>
                                            <Col className="col-8 col-sm-10">
                                                <p><strong>{post.owner}</strong></p>
                                            </Col>
                                            <Col className="col-4 col-sm-2">
                                                {console.log(Date.parse(post.createdAt))}
                                                <span className="float-right">{this.whenPosted(post.createdAt)}</span>
                                            </Col>
                                        </Row>
                                    </CardTitle>
                                    <CardBody className="pt-0">
                                        <h4>{post.title}</h4>
                                        <p>{post.content}</p>
                                        <p>{post.likes.length} likes</p>
                                        <span>
                                         <form onSubmit={this.onSubmit=(e)=>{
                            e.preventDefault()
                            this.addLike(this.state.isClicked, post._id)
                        }}> 
                    <button className="btn" onClick={this.handleLikeClick}><span><FontAwesomeIcon icon={this.state.isClicked == 1 ? faHeart1 : faHeart} size="2x"/></span></button>
                    <button className="btn" id="toggler"><span className="pl-3"><FontAwesomeIcon icon={faComment} size="2x" /></span></button>
                    </form>
                </span>
                <UncontrolledCollapse toggler="#toggler" className="mt-3">
                    <span>
                        <form onSubmit={this.onSubmit=(e)=>{
                            e.preventDefault()
                            this.makeComment(e.target[0].value, post._id)
                        }}>
                        <input type="text" className="form-control d-inline w-75" name="comment" placeholder="Leave a comment" value={this.state.text} onChange={this.onChangeComment}></input>
                        <button type="submit" className="btn"><FontAwesomeIcon icon={faPaperPlane} size="lg" /></button>
                        </form>
                    </span>
                </UncontrolledCollapse>                                        
                                        <ol>
                                        {post.comments.map(comment=>{
                                            if(comment.owner != localStorage.getItem("name")){
                                            return (<li>{comment.text}     user:{comment.owner}</li>)
                                            }else{
                                                return (

                                                <li><form onSubmit={this.onSubmit=(e)=>{
                                                    e.preventDefault()
                                                    this.deleteComment(comment.text, post._id)
                                                }}>{comment.text}     user:{comment.owner} <button onClick>X</button>
                                                 </form></li>)
                                            }
                                                
                                            })}
                                            </ol>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            </div>
        );
    }
}

export default PostTile;