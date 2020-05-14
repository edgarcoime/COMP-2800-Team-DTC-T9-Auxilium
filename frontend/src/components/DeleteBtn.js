import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";


class DeleteBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-danger float-right">Delete</button>
            </div> 
        )
    }
}

export default DeleteBtn;