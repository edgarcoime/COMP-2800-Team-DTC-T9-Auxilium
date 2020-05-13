import React, { Component, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeart1, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

class LikeComment extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isClicked: 0,
            isCommentClicked: 0,
        }
    }



    handleLikeClick = () => {
        if(this.state.isClicked == 0) {
            this.setState({isClicked: 1});
        } else {
            this.setState({isClicked: 0});
        }
    }

    handleCommnetClick = e => {
        if(this.state.isCommentClicked == 0) {
            this.setState({isCommentClicked: 1});
        } else {
            this.setState({isCommentClicked: 0});
        }
    }

    render() {
        return(
            <div>
                <span>
                    <button className="btn" onClick={this.handleLikeClick}><span><FontAwesomeIcon icon={this.state.isClicked == 1 ? faHeart1 : faHeart} size="2x"/></span></button>
                    <button className="btn" onClick={this.handleCommnetClick}><span className="pl-3"><FontAwesomeIcon icon={faComment} size="2x" /></span></button>
                </span>
                <Collapse isOpen={this.state.isCommentClicked} className="mt-3">
                    <span>
                        <input type="text" className="form-control d-inline w-75" name="comment" placeholder="Leave a comment"></input>
                        <button type="submit" className="btn"><FontAwesomeIcon icon={faPaperPlane} size="lg" /></button>
                    </span>
                </Collapse>
            </div>
            
        )
    }
}

export default LikeComment;