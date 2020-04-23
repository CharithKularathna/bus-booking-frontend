import React, { Component } from 'react'
import classes from './Reserve.css'

class Reserve extends Component {
    state = {
        options:[
            'Ambalangoda','Ampara','Anuradhapura','Badulla','Bandarawela','Colombo','Embilipitiya',
            'Galle','Hambanthota','Jaffna','Kataragama','Kurunegala','Monaragala','Matara','Ratnapura',

        ],
        searched:false
    }

    submitHandler = (event) => {
        event.preventDefault();
        setTimeout(()=>{
            this.setState({searched:true})
        },2000)
    }

    render(){
        const options= this.state.options.map(city => (
            <option key={city}>{city}</option>
        ))

        return(
            <div className={classes.Reserve}>
                <h4><b>Reserve a Seat</b></h4>
                <hr></hr>
                <form className="form-inline" onSubmit={this.submitHandler}>
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="start">Start</label>
                        <select id="start" className="form-control">
                            <option selected>Choose...</option>
                            {options}
                        </select>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="destination">Destination</label>
                        <select id="destination" className="form-control">
                            <option selected>Choose...</option>
                            {options}
                        </select>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="date">Date</label>
                        <input type='date' id='date' className="form-control"></input>
                    </div>
                <button type="submit" className="btn btn-primary mb-2">Check for Buses</button>
                </form>
                {this.state.searched ?
                (<React.Fragment>
                    <hr></hr>
                    <h4>Search Results</h4>
                    <div className={"card " + classes.Card}>
                        <h5 className="card-header">NKK TRAVELS</h5>
                        <div className="card-body">
                            <h5 className="card-title">5.00 AM - 9.00 AM</h5>
                            <p className="card-text">Luxury</p>
                            <p className="card-text">Bus Number: N/A</p>
                            <p className="card-text">Route: 122</p>
                            <a href="#" className="btn btn-primary">View Seats</a>
                        </div>
                        <div className='card-footer'>
                            <p className="text-muted">LKR 800</p>
                        </div>
                    </div>
                    <div className={"card " + classes.Card}>
                        <h5 className="card-header">SG TRAVELS</h5>
                        <div className="card-body">
                        <h5 className="card-title">9.00 AM - 13.00 AM</h5>
                        <p className="card-text">Semi Luxury</p>
                        <p className="card-text">Bus Number: N/A</p>
                        <p className="card-text">Route: 98</p>
                            <a href="#" className="btn btn-primary">View Seats</a>
                        </div>
                        <div className='card-footer'>
                            <p className="text-muted">LKR 600</p>
                        </div>
                    </div>
                </React.Fragment>)
                : null}
            </div>
        )
    }
}

export default Reserve;