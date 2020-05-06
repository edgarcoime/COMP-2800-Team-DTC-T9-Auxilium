import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeart1 } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

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
        return(
            <div>
                <p>34 Likes</p>
                <div>
                    <button className="btn" onClick={this.handleLikeClick}><span><FontAwesomeIcon icon={this.state.isClicked == 1 ? faHeart1 : faHeart} size="2x"/></span></button>
                    <button className="btn"><span className="pl-3"><FontAwesomeIcon icon={faComment} size="2x" /></span></button>
                </div>
            </div>
        )
    }
}

export default LikeComment;