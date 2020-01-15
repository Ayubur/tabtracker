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
            this.props.history.push(`/songs/${this.props.createdSong._id}`);
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
                               <Field name="title" component="input" id="title" type="text" className="validate" placeholder="Enter Title"/>
                            <label for="title">Title*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="artist" id="artist" component="input" type="text" className="validate" placeholder="Enter Artist"/>
                               <label for="artist">Artist*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="genre" id="genre" component="input" type="text" className="validate" placeholder="Enter genre"/>
                               <label for="genre">Genre*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <Field name="album" id="album" component="input" type="text" className="validate" placeholder="Enter Album"/>
                                <label for="album">Album*</label>
                                </div>
                            </div>
                    
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="albumImage" id="albumImage" component="input" type="text" className="validate" placeholder="Enter Album Image Url"/>
                               <label for="albumImage">Album Image*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <Field name="youtubeId" id="youtubeId" component="input" type="text" className="validate" placeholder="Enter Youtube Id"/>
                               <label for="youtubeId">Youtube Id*</label>
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
                            <Field name="lyrics" id="lyrics" component="textarea" className="materialize-textarea" placeholder="Enter Lyrics" rows="50"/>
                            <label for="lyrics">Lyrics*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <Field name="tab" id="tab" component="textarea" className="materialize-textarea" placeholder="Enter Tab"/>
                            <label for="tab">Guitar Tab*</label>
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
  return {successMessage: state.songs.successMsg,
    errorMessage: state.songs.errorMsg,
     auth:state.auth.user,
    createdSong: state.songs.songs};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'createSong'})
)(CreateSongComponent);



/** Styles */

const styles ={
    errMsg:{
        color: 'red',
        fontSize: 21,
        marginBottom:22
    },
    successMsg:{
        color: 'green',
        fontSize:21,
        marginBottom:22
    }
}

const { errMsg, successMsg} = styles;