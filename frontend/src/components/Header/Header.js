import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Home from './../Home'
import Covid from './../Covid'
import About from './../About'
import User from './../User'
import Popup from "reactjs-popup";
import logo from './../images/logo_transparent.png'
import user from './../images/interface.png'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
                <Row className="header">
                    <Col className="col-3 col-sm-3">

                        <NavLink to="/" className="figure   text-decoration-none">
                            <img src={logo} alt="an image" height="80" width="80"/>
                        </NavLink>
                    </Col>
                    <Col className="col-sm-4 d-none d-sm-inline">
                        <form className="mt-3">
                            <input type="text" className="form-control d-inline w-75" placeholder="Search ..." id="searchbox" />  
                            <button type="submit" className="btn mb-1 text-link">
                                <i className="fa fa-search fa-lg "></i>
                            </button>
                        </form>
                    </Col>
                    <Col className="col-sm">
                    <nav className="navbar mt-1">
                            <div className="nav-item">
                                <NavLink to="/" className="nav-link text-link">
                                    <span className="nav-text ml-1 text-link"><i className="fa fa-home fa-lg"></i><span className="d-none d-sm-inline">Home</span></span>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to="/covid" className="nav-link">
                                    <span className="nav-text ml-1 text-link"><i class="fas fa-square fa-lg"></i><span className="d-none d-sm-inline">COVID-19</span></span>
                                </NavLink>
                            </div>
                            
                            <NavLink to="/about" className="nav-link">
                                
                                <span className="text-link"><i className="fa fa-users fa-lg "></i><span className="d-none d-sm-inline">About Us</span></span>
                            </NavLink>
                            <NavLink to="/login" className="nav-link">
                                {/* <Popup trigger={} position="bottom right">
                                    <form>
                                        <input type="text" className="form-control" name="username" id="username" placeholder="Email"/>
                                        <input type="password" className="form-control" name="username" id="username" placeholder="Email"/>

                                    </form>
                                </Popup> */}
                                <span className="text-link">Login/Register</span>
                            </NavLink>

                        </nav>
                    </Col> 
                </Row>
            
        );
    }
}

export default Header;