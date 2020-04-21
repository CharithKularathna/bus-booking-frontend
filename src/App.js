import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home/Home'
import Schedule from './containers/Schedule/Schedule'
import Layout from './hoc/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import SignIn from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import Logout from './containers/Logout/Logout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path='/schedule' component={Schedule} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/logout' component={Logout} />
            <Route path='/' component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
