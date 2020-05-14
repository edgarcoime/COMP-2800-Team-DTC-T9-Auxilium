import React, { Component } from 'react'

export class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentOwner: props.ownerId
    }
  }
  render() {
    const { commentId, commentOwner, text, ownerId } = this.props;
    return (
      <div class="comment-tile" id={"comment" + commentId}>
        <p>{`${commentOwner}: ${text}`}</p>
      </div>
    )
  }
}

export default Comment
