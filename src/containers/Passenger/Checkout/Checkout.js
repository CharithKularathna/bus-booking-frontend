import React from 'react';
import PaypalBtn from 'react-paypal-checkout';
import Input from '../../../components/UI/Input/Input'
import axios from 'axios'

class Checkout extends React.Component {
    state = {
        total: null,
        elementConfig:{
            type:'text'
        }
    }

    inputChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({total: event.target.value})
    }

    render() {		
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was completed succeessfully!");
            console.log(payment)
            
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
        let total = parseInt(this.state.total)
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
            <div style={{marginTop:'60px',marginLeft:'auto',marginRight:'auto', width:'300px'}}>
                <Input 
                    value={this.state.total}
                    changed={this.inputChangeHandler} 
                    label={"Price"}
                    elementConfig={this.state.elementConfig}
                    greyInput
                />
                <br/>
                <br/>
                <br/>
                <PaypalBtn 
                    env={env} 
                    client={client} 
                    currency={currency} 
                    total={parseInt(this.state.total)} 
                    locale={locale} 
                    style={style}
                    onError={onError} 
                    onSuccess={onSuccess} 
                    onCancel={onCancel} />
            
            </div>
                
        );
    }
}

export default Checkout;