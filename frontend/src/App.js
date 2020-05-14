import React, { Component } from "react";
import Home from "./pages/Home";
import Covid from "./pages/Covid";
import About from "./pages/About";
import User from "./pages/User";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import './pages/pages.css'


// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="mh-100">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/covid" component={Covid} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/about" component={About} />
              <Route path="/user" component={User} />
              <Route path="/register" component={Register} exact />
              <Route path="/createpost" component={CreatePost} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
