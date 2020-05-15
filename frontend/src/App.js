import React, { Component } from "react";
import Home from "./pages/Home";
import Covid from "./pages/Covid";
import About from "./pages/About";
import User from "./pages/User";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EasterEgg from 'react-easter'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import easter from './images/happy-easter-wishies-color-eggs-gif.gif'
import './pages/pages.css'

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    store.dispatch(loadUser());
  }
  

  render() {
    const easterCodeDesktop = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'enter'
    ]
    const easterCode = [
      'e',
      'a',
      's',
      't',
      'e',
      'r'
    ];
    return (
      <Provider store={store}>
        <BrowserRouter>
          <EasterEgg
              keys={easterCodeDesktop}
              timeout={5000}>
            <Modal isOpen={true} className="text-center bg-light">
              <ModalHeader closeButton>
                <h2 className="text-center"><strong>Happy Easter </strong></h2>
              </ModalHeader>
              <ModalBody>
                <img className="" src={easter} alt="easter egg" height="320" width="320"/>
              </ModalBody>
            </Modal>
          </EasterEgg>
          <EasterEgg
              keys={easterCode}
              timeout={5000}>
            <Modal isOpen={true} className="text-center bg-light">
              <ModalHeader closeButton>
                <h2 className="text-center"><strong>Happy Easter </strong></h2>
              </ModalHeader>
              <ModalBody>
                <img className="" src={easter} alt="easter egg" height="320" width="320"/>
              </ModalBody>
            </Modal>
          </EasterEgg>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/covid" component={Covid} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/about" component={About} />
              <Route path="/user" component={User} />
              <Route path="/register" component={Register} exact />
              <Route path="/createpost" component={CreatePost} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
