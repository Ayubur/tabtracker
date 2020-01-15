import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class LoginComponent extends Component{

    constructor(props){
        super(props);
    }

    onSubmit = formProps=>{
        this.props.signin(formProps, ()=>{
            this.props.history.push('/');
        });
    }

    componentDidMount(){
        this.props.removeError();
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
                        <span className="card-title">Login</span>
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
                        <button className="btn waves-effect waves-light" type="submit" name="action">Login
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
    reduxForm({ form: 'signin'})
)(LoginComponent);



/** Styles */

const styles ={
    errMsg:{
        color: 'red',
        fontSize:'1.2rem',
        marginBottom:22
    }
}

const { errMsg} = styles;