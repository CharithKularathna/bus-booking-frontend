import React from 'react';
import PaypalBtn from 'react-paypal-checkout';
import axiosInstanace from '../../../axiosAuth'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
    root: {
        width: '90%',
        height: '500px',
        minWidth: 275,
        marginTop: '10px'
      },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
})

class Checkout extends React.Component {

    state = {
        rate: 188.90

    }

    componentDidMount() {
        console.log(this.props.bookedSeats)
        console.log(this.props.totalPrice)
    }

    render() {	
        const {classes} = this.props
        const bookedSeats = this.props.bookedSeats
        let bookingsText = null
        if (bookedSeats != null){
            bookingsText =  bookedSeats.map(seatNo => (
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {`Booking: Seat No. ${seatNo.toString()}`}
                </Typography>
            ))
        }
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was completed succeessfully!");
            console.log(payment)
            const payerID = payment.payerID
            const paymentID = payment.paymentID
            const paymentObject = {
                seatIdArray: this.props.bookedSeats,
                turnId: this.props.turnID,
                startStation: this.props.startStation,
                endStation: this.props.endStation,
                paymentId: paymentID,
                payerId: payerID
            }
            console.log(paymentObject)
            axiosInstanace.post('bookseats/'+this.props.uid, paymentObject,
            {
                headers: {
                    'Authorization': `Bearer ${this.props.token}`
                }
            })
            .then(res => {
                console.log('res')
                console.log(res)
                this.props.history.push('/passenger/dashboard')
            })
            .catch(err=>{
                console.log('err')
                console.log(err)
            })
            
        }		
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!');
            console.log(data)
        }	
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);		
        }			
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let locale = 'en_US'; 
        let total = (this.props.totalPrice/this.state.rate).toFixed(2)
        console.log(total)
        // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
        let style = {
            'label':'pay', 
            'tagline': false, 
            'size':'medium', 
            'shape':'pill', 
            'color':'gold'
        };
 
        const client = {
            sandbox:    'AZwb0hiiFQ5rTGYdH8FOnOy66avmq1tizYmg14yxiJnDgCzNKkQ-2FAk-07IPUjH9uNn1VAGFSYbxXw3',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <ShoppingCartIcon /> Checkout
                    </Typography>
                    <Divider />
                    <div style={{marginLeft:'10px', marginTop:'10px'}}>
                        {bookingsText}
                    </div>
                    <Divider />
                    <Typography variant="h5" component="h2" style={{marginLeft:'10px', marginTop:'10px'}}>
                        {`Total: LKR ${this.props.totalPrice}.00`}
                    </Typography>
                </CardContent>
                <div style={{marginTop:'60px',marginLeft:'auto',marginRight:'auto', width:'300px'}}>
                    <PaypalBtn 
                        env={env} 
                        client={client} 
                        currency={currency} 
                        total={total} 
                        locale={locale} 
                        style={style}
                        onError={onError} 
                        onSuccess={onSuccess} 
                        onCancel={onCancel} />
                
                </div>
            </Card>
                
                
        );
    }
}

const mapStateToProps = (state) => {
    return{
        turnID: state.booking.turnID,
        totalPrice: state.booking.price,
        bookedSeats: state.booking.bookedSeats,
        uid: state.signin.userID,
        token: state.signin.token,
        startStation:state.booking.startStation,
        endStation:state.booking.endStation
    }
}


export default connect(mapStateToProps)(withStyles(styles)(Checkout));