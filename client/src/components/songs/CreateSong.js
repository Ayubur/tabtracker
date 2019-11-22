import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class CreateSongComponent extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.shouldNavigateAway();
    }

    componentDidUpdate(){
        this.shouldNavigateAway();
    }


    shouldNavigateAway(){
        if(! this.props.auth){
            return this.props.history.push('/')
        }

    }

    onSubmit = formProps=>{
        formProps.creator = this.props.auth._id;
        this.props.createSong(formProps, ()=>{
            this.props.history.push('/');
        });

    }

    render(){
        const {handleSubmit} = this.props;
        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="row">
                        <div className="col s12 m5">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-title">Song Metadata</div>
                                <div className="row">
                            <div className="input-field col s12">
                               <Field name="title" component="input" type="text" className="validate" placeholder="Enter Title"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="artist" component="input" type="text" className="validate" placeholder="Enter Artist"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="genre" component="input" type="text" className="validate" placeholder="Enter genre"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <Field name="album" component="input" type="text" className="validate" placeholder="Enter Album"/>
                                </div>
                            </div>
                    
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="albumImage" component="input" type="text" className="validate" placeholder="Enter Album Image Url"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="youtubeId" component="input" type="text" className="validate" placeholder="Enter Youtube Id"/>
                            </div>
                        </div>

                                </div>
                            </div>

                        </div>
                        <div className="col s12 m7">
                        <div className="card">
                                <div className="card-content">
                                <div className="card-title">Song Lyrics & Tabs</div>
                                <div className="row">
                            <div className="input-field col s12">
                            <Field name="lyrics" component="textarea" className="materialize-textarea" placeholder="Enter Lyrics" rows="50"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <Field name="tab" component="textarea" className="materialize-textarea" placeholder="Enter Tab"/>

                            </div>
                        </div>
                        <p style={errMsg}>{ this.props.errorMessage}</p>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Save Song
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
  return {successMessage: state.songs.successMsg,errorMessage: state.songs.errorMsg, auth:state.auth.user};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'createSong'})
)(CreateSongComponent);



/** Styles */

const styles ={
    errMsg:{
        color: 'red',
        fontSize: 21
    },
    successMsg:{
        color: 'green',
        fontSize:21
    }
}

const { errMsg, successMsg} = styles;