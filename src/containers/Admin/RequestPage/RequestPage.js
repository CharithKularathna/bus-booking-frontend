import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialTable from "material-table";
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelIcon from '@material-ui/icons/Cancel';
import  { connect } from 'react-redux'
import axiosInstance from '../../../axiosAuth'
import { secondsToDate, updateObject, phoneNumberFormatter } from '../../../store/utility'
import ConfirmDialog from '../../../components/UI/Dialog/ConfirmDialog/ConfirmDialog'
import FormDialog from '../../../components/UI/Dialog/FormDialog/FormDialog'
import Spinner from '../../../components/UI/Spinner/Spinner';

const styles = theme => (
    {
    
        table:{
            marginTop: '25px',
            maxWidth: '100%',
            height: '419px',
            minWidth: '85%',
        }
    }
)

class RequestPage extends Component {
    state = {
        loading: true,
        accepting: false,
        rejecting: false,
        adminID:this.props.uid,
        token:this.props.token,
        error:null,
        requestArray: null,
        user:{
            id:"",
            firstName:"",
            secondName:"",
            email:"",
            phoneNumber:"",
            address:"",
            nic:""
        }
    }

    componentDidMount () {
        this.fetchData()
    }

    fetchData = () => {
        axiosInstance.get( 'newrequests/' + this.props.uid, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }})
            .then( response => {
                //console.log(response)
                this.setState({requestArray:response.data.newOwners, loading:false})
            } )
            .catch( error => {
                //console.log('error')
                //console.log(error)
            } );
    }

    resetState = () => {
        const newState = updateObject(this.state.user,{
            id:"",
            firstName:"",
            secondName:"",
            email:"",
            phoneNumber:"",
            address:"",
            nic:""
        })
        this.setState({rejecting:false,accepting:false,user:newState})
    }

    rejectNoHandler = () => {
        this.resetState()
    }

    rejectYesHandler = () => {
        axiosInstance.post('rejectowner/' + this.props.uid,{
            uid:this.state.user.id
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            //console.log(response)
            this.resetState()
            //console.log(this.state)
            //console.log(this.props)
            //this.props.history.push('/admin/dashboard/requests')
            this.fetchData()
            
        }).catch( error => {
            console.log(error)
            this.resetState()
            this.fetchData()
        })
    
        
    }
    acceptHandler = () => {
        console.log(this.state.user)
        axiosInstance.post('acceptowner/' + this.props.uid,{
            uid:this.state.user.id,
            firstName:this.state.user.firstName,
            secondName:this.state.user.secondName,
            email:this.state.user.email,
            phoneNumber:phoneNumberFormatter(this.state.user.phoneNumber),
            phone_verified:true,
            address:this.state.user.address,
            nic:this.state.user.nic
        },
        {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        }).then( response => {
            //console.log(response)
            this.resetState()
            //console.log(this.state)
            //console.log(this.props)
            //this.props.history.push('/admin/dashboard/requests')
            this.fetchData()
            
        }).catch( error => {
            console.log(error)
            this.resetState()
        })
            
    }

    acceptCloseHandler = () => {
        this.resetState()
    }

    formDataHandler = (event,field) => {
        const updatedForm = {
            ...this.state.user
        };
        updatedForm[field] = event.target.value
        this.setState({user:updatedForm})
    }

    render(){
        const {classes} = this.props
        //console.log(this.props.uid)
        //console.log(this.props.token)
        let tabledata = []
        if (this.state.requestArray !== null){
            tabledata = this.state.requestArray.map(entry => (
                {
                    userID:entry.id,
                    name:entry.name,
                    address:entry.address,
                    mobileNumber:entry.phoneNumber,
                    date: secondsToDate(entry.date._seconds*1000)
                }
            ))
        }
        let table = <div style={{marginTop:'150px'}}><Spinner /></div>
        if (this.state.loading == false){
            table = (
                <Paper className={classes.table}>
                    <MaterialTable
                        style={{overflowY: 'scroll', maxHeight: '90vh'}}
                        title="Bus Owner Requests"
                        columns={[
                            { title: 'User ID', field: 'userID' },
                            { title: 'Name', field: 'name' },
                            { title: 'Address', field: 'address' },
                            { title: 'Mobile Number', field: 'mobileNumber', type: 'numeric' },
                            { title: 'Date', field: 'date', type: 'date' }
                        ]}
                        data={tabledata}
                        actions={[
                            {
                                icon:()=><VerifiedUserIcon color='primary'/>,
                                tooltip: 'Accept Request',
                                onClick: (event, rowData) => {
                                    const newState = updateObject(this.state.user,{
                                        id:rowData.userID,
                                        address: rowData.address,
                                        phoneNumber:rowData.mobileNumber,
                                    })
                                    this.setState({user:newState, accepting:true})
                                }
                            },
                            {
                                icon:()=><CancelIcon color='error' />,
                                tooltip: 'Decline Request',
                                onClick: (event, rowData) => {
                                    const newState = updateObject(this.state.user,{
                                        id:rowData.userID
                                    })
                                    this.setState({user:newState, rejecting:true})
                                }
                            }

                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </Paper>
            )
        }
        return (
            <React.Fragment>
                {table}
                <ConfirmDialog 
                    title={"Are you sure that you want to reject the request?"}
                    description={"Note that this will permanenlty remove the Owner Request from the System."}
                    clicked={this.state.rejecting}
                    handleClose={this.rejectNoHandler}
                    handleConfirm={this.rejectYesHandler}
                />
                <FormDialog 
                    title={"Please Confirm and Fill the Data to Proceed"}
                    clicked={this.state.accepting}
                    handleClose={this.acceptCloseHandler}
                    handleSubmit={this.acceptHandler}
                    data={this.state.user}
                    formChanged={this.formDataHandler}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.signin.userID,
        token: state.signin.token
    }
}

export default connect(mapStateToProps)(withStyles(styles)(RequestPage));