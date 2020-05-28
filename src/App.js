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
import Dashboard from './containers/Dashboard/Dashboard';
import * as actions from './store/actions/index'
import Success from './components/UI/Success/Success'
import Activation from './containers/Passenger/Activation/Activation'
import OwnerRequest from './containers/OwnerRequest/OwnerRequest';
import Reserve from './containers/Passenger/Reserve/Reserve';
import RequestPage from './containers/RequestPage/RequestPage';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    //console.log(this.props.isAuth)
    let authRoutes = null
    if (this.props.isAuth){
      authRoutes = [<Route exact path='/passenger/dashboard' component={Reserve} />,
      <Route exact path='/admin/dashboard/requests' component={RequestPage} />,
      <Route exact path='/owner/dashboard' component={Dashboard} />,
      <Route exact path='/admin/dashboard' component={Dashboard} />]
    }
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path='/schedule' component={Schedule} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/signupsuccess' render={() => <Success msg={this.props.successMessage}/>} />
            <Route exact path='/auth/activate/:token' component={Activation}/>
            <Route exact path='/owner-signup' component={OwnerRequest} />
            {authRoutes}
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
    successMessage: state.signup.message,
    isAuth: state.signin.token !== null 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
