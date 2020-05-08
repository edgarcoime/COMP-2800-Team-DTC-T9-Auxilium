import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeart1, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';

class LikeComment extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isClicked: 0
        }
        this.handleLikeClick = this.handleLikeClick.bind(this);
    }



    handleLikeClick() {
        if(this.state.isClicked == 0) {
            this.setState({isClicked: 1});
        } else {
            this.setState({isClicked: 0});
        }
    }

    render() {
        const makecomment = (text,postId)=>{
            const comment = {
                text:this.state.text,
                owner: "someone",
            }
            config = {
                headers: {
                    Authorization: "x-auth-token" + localStorage.getItem("jwt")
                 }
            }
            axios('/:postId/comment', comment, config)
        }

        return(
            <div>
                {/* <span>
                    <button className="btn" onClick={this.handleLikeClick}><span><FontAwesomeIcon icon={this.state.isClicked == 1 ? faHeart1 : faHeart} size="2x"/></span></button>
                    <button className="btn" id="toggler"><span className="pl-3"><FontAwesomeIcon icon={faComment} size="2x" /></span></button>
                </span>
                <UncontrolledCollapse toggler="#toggler" className="mt-3">
                    <span>
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            console.log(e.target[0].value);
                        }}>
                        <input type="text" className="form-control d-inline w-75" name="comment" placeholder="Leave a comment"></input>
                        <button type="submit" className="btn"><FontAwesomeIcon icon={faPaperPlane} size="lg" /></button>
                        </form>
                    </span>
                </UncontrolledCollapse> */}
            </div>
            
        )
    }
}

export default LikeComment;