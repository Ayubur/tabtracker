import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import axios from 'axios';
import axiosConfig from '../../axiosConfig';


class EditSongComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            song: null,
            error:''
        }
    }

    async componentDidMount(){
        this.shouldNavigateAway();
        const id= this.props.match.params.id;

        const response = await axiosConfig.get(`/api/songs/${id}`);

        if(response.data.error){
            return this.setState({ error :'Something went wrong...please try aganin'});
        }
        this.setState({
                song: response.data[0]
            })
    }

    componentDidUpdate(){
        this.shouldNavigateAway();

            if(this.props.auth._id !== this.state.song._creator){
                return this.props.history.push('/');
            }

    }


    shouldNavigateAway(){
        if(! this.props.auth){
            return this.props.history.push('/');
        }

    }

    
    handleChange = (e) => {
        this.setState({
            song:{
                ...this.state.song,
                [e.target.name]: e.target.value,

            }

        })
    }

   onSubmit = async (e) => {
       e.preventDefault();
       const id= this.props.match.params.id;
       const response = await axiosConfig.put(`/api/songs/${id}`,this.state.song,{
            headers:{
                authorization: this.props.auth.token
            }
       });
       if(response.data.error){
        return this.setState({ error : response.data.error});
       }

       return this.props.history.push(`/songs/${id}`);

    }

    render(){
        if(this.state.song !== null){
        return(
            <div>
                <form>
                    <div className="row">
                        <div className="col s12 m5">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-title">Song Metadata</div>
                                <div className="row">
                            <div className="input-field col s12">
                               <input name="title" value={this.state.song.title} type="text" onChange={e => this.handleChange(e)} className="validate" placeholder="Enter Title"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="artist" value={this.state.song.artist} type="text" onChange={e => this.handleChange(e)} className="validate" placeholder="Enter Artist"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="genre" value={this.state.song.genre} type="text" onChange={e => this.handleChange(e)} className="validate" placeholder="Enter genre"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="album" value={this.state.song.album} type="text" onChange={e => this.handleChange(e)} className="validate" placeholder="Enter Album"/>
                                </div>
                            </div>
                    
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="albumImage" value={this.state.song.albumImage} type="text" onChange={e => this.handleChange(e)} className="validate" placeholder="Enter Album Image Url"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="youtubeId" value={this.state.song.youtubeId} type="text" onChange={e => this.handleChange(e)} className="validate" placeholder="Enter Youtube Id"/>
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
                            <textarea name="lyrics" value={this.state.song.lyrics} className="materialize-textarea" onChange={e => this.handleChange(e)} placeholder="Enter Lyrics" rows="50"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <textarea name="tab" value={this.state.song.tab} className="materialize-textarea" onChange={e => this.handleChange(e)} placeholder="Enter Tab"></textarea>

                            </div>
                        </div>
                      <p style={errMsg}>{this.state.error}</p>
                        <p style={successMsg}>{this.props.successMessage}</p>
                        <p style={errMsg}>{ this.props.errorMessage}</p>
                        <button className="btn waves-effect waves-light" type="submit" onClick={(e) => this.onSubmit(e)} name="action">Save Song
                        </button>
                                    
                                </div>
                            </div>

                        </div>
                    </div>
              </form>
            </div>
        );
    }else{
        return(
            <Loader />
        );
    }
  }
}
function mapStateToProps(state){
    //console.log(state);
  return {successMessage: state.songs.successMsg,errorMessage: state.songs.errorMsg, auth:state.auth.user};
}

export default connect(mapStateToProps)(EditSongComponent);



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