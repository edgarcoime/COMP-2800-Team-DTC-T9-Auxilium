import React, { Component } from 'react'


class CreatePostBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return(
            <Col className="col-4 col-sm-4 d-none d-sm-block mt-5">
                <Link to="/createpost">
                    <button type="button" className="btn w-100 rounded btn-warning" > Create a Post</button>
                </Link>
            </Col>
        )
    }
}