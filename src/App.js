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
import GetRoutes from './containers/Passenger/GetRoutes/GetRoutes';
import RequestPage from './containers/Admin/RequestPage/RequestPage';
import AddConductor from './containers/Owner/AddConductor/AddConductor'
import AddBus from './containers/Owner/AddBus/AddBus';
import AddTurn from './containers/Owner/AddTurn/AddTurn';
import RequestBus from './containers/Admin/RequestBus/RequestBus'
import OwnerDetails from './containers/Admin/OwnerDetails/OwnerDetails'
import Checkout from './containers/Passenger/Checkout/Checkout'
import Reserve from './containers/Passenger/Reserve/Reserve'
import SeatMap from './containers/Passenger/SeatMap/SeatMap'
import ViewBookings from './containers/Owner/ViewBookings/ViewBookings';
import Bookings from './containers/Passenger/Bookings/Bookings';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    //console.log(this.props.isAuth)
    let authRoutes = null
    if (this.props.isAuth && this.props.role == 'PASSENGER'){
      authRoutes = [
        <Route exact path='/passenger/dashboard' component={Reserve} />,
        <Route exact path='/passenger/dashboard/getroutes' component={GetRoutes} />,
        <Route exact path='/passenger/dashboard/reserve' component={Reserve} />,
        <Route exact path='/passenger/dashboard/reserve/seatmap' component={SeatMap} />,
        <Route exact path='/passenger/dashboard/reserve/checkout' component={Checkout} />,
        <Route exact path='/passenger/dashboard/bookings' component={Bookings} />
      ]
    }
    if (this.props.isAuth && this.props.role == 'OWNER'){
      authRoutes = [
        <Route exact path='/owner/dashboard' component={Dashboard} />,
        <Route exact path='/owner/dashboard/addconductor' component={AddConductor} />,
        <Route exact path='/owner/dashboard/addbus' component={AddBus} />,
        <Route exact path='/owner/dashboard/addturns' component={AddTurn} />,
        <Route exact path='/owner/dashboard/bookings' component={ViewBookings} />
      ]
    }
    if (this.props.isAuth && this.props.role == 'ADMIN'){
      authRoutes = [
        <Route exact path='/admin/dashboard/requests' component={RequestPage} />,
        <Route exact path='/admin/dashboard/registerbus' component={RequestBus} />,
        <Route exact path='/admin/dashboard/ownerdetails' component={OwnerDetails} />,
        <Route exact path='/admin/dashboard' component={Dashboard} />
      ]
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
            {/*Paypal Check*/}
            <Route exact path='/checkout' component={Checkout} />
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
    isAuth: state.signin.token !== null,
    role: state.signin.role
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
