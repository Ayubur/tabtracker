import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class RegisterComponent extends Component{

    constructor(props){
        super(props);
    }

    onSubmit = formProps=>{
        this.props.signup(formProps, ()=>{
            this.props.history.push('/');
        });
    }

    render(){
        const {handleSubmit} = this.props;
        return(
            <div className="container mt2">
                <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="row">
                    <div className="col s12 m12">
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Register</span>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="name" component="input" type="text" className="validate" placeholder="Enter Name"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="email" component="input" type="text" className="validate" placeholder="Enter Email"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="password" component="input" type="password" className="validate" placeholder="Enter password"/>
                            </div>
                        </div>
                        <p style={errMsg}>{ this.props.errorMessage}</p>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        </button>
                            
                        </div>
                    </div>
                    </div>
              </div>
              </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.errorMessage};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup'})
)(RegisterComponent);



/** Styles */

const styles ={
    errMsg:{
        color: 'red',
        fontSize: 21
    }
}

const { errMsg} = styles;