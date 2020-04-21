import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import Home from './containers/Home/Home'
import Schedule from './containers/Schedule/Schedule'
import Layout from './hoc/Layout/Layout'
import SignIn from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import Logout from './containers/Logout/Logout'
import Dashboard from './containers/Passenger/Dashboard/Dashboard';
import * as actions from './store/actions/index'
import Success from './components/UI/Success/Success'

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path='/schedule' component={Schedule} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/passenger/dashboard' component={Dashboard} />
            <Route exact path='/signupsuccess' render={() => <Success msg={this.props.successMessage}/>} />
            <Route path='/' component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignin: () => dispatch(actions.authStateSetFromLocal())
  }
}

const mapStateToProps = (state) => {
  return {
    successMessage: state.signup.message
  }
}

export default connect(null, mapDispatchToProps)(App);
