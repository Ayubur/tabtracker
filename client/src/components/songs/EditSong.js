import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import axios from 'axios';


class EditSongComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            song: null
        }
    }

    async componentDidMount(){
        this.shouldNavigateAway();
        const id= this.props.match.params.id;

        const response = await axios.get(`/api/song/${id}`);
            this.setState({
                song: response.data[0]
            })
    }

    componentDidUpdate(){
        this.shouldNavigateAway();
    }


    shouldNavigateAway(){
        if(! this.props.auth){
            return this.props.history.push('/')
        }

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
                               <input name="title" value={this.state.song.title} type="text" className="validate" placeholder="Enter Title"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="artist" value={this.state.song.artist} type="text" className="validate" placeholder="Enter Artist"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="genre" value={this.state.song.genre} type="text" className="validate" placeholder="Enter genre"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="album" value={this.state.song.album} type="text" className="validate" placeholder="Enter Album"/>
                                </div>
                            </div>
                    
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="albumImage" value={this.state.song.albumImage} type="text" className="validate" placeholder="Enter Album Image Url"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                               <input name="youtubeId" value={this.state.song.youtubeId} type="text" className="validate" placeholder="Enter Youtube Id"/>
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
                            <textarea name="lyrics" value={this.state.song.lyrics} className="materialize-textarea" placeholder="Enter Lyrics" rows="50"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <textarea name="tab" value={this.state.song.tab} className="materialize-textarea" placeholder="Enter Tab"></textarea>

                            </div>
                        </div>
                        <p style={successMsg}>{this.props.successMessage}</p>
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