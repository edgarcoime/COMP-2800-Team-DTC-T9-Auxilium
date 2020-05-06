import React from 'react';
import Header from './components/Header/Header'
import Home from './pages/Home'
import Covid from './pages/Covid'
import About from './pages/About'
import User from './pages/User'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Register from './pages/Register'
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
            <Route path="/createpost" component={CreatePost} />
          </Switch>
        </div>
    </BrowserRouter>

  );
}

export default App;
