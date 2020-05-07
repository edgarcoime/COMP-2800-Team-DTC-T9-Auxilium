import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'

class LoginRegisterBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }
    }

    componentDidMount() {
        this.handleContent();   
    }

    handleContent = () => {
        const name = localStorage.getItem('name');
        if (name !== null) {
            this.setState({name : name});
        }
    }


    render() {
        return (
            <span className="text-link">{this.state.name === "" ?'Login/Register' : 'Welcom, ' + this.state.name }</span>
        )
    }
}

export default LoginRegisterBtn;