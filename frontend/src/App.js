import React from 'react';
import Header from './components//Header/Header'
import Home from './components/Home'
import Covid from './components/Covid'
import About from './components/About'
import User from './components/User'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Header />
        <div className="App">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/covid" component={Covid} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
          </Switch>
        </div>
    </BrowserRouter>

  );
}

export default App;
