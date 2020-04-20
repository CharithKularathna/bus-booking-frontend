import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home/Home'
import Schedule from './containers/Schedule/Schedule'
import Layout from './hoc/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import SignIn from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/schedule' component={Schedule} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
