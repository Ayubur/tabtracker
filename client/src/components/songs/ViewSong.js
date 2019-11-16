import React, {Component} from 'react';
import axios from 'axios';
import Loader from 'react-loader';
import Youtube from 'react-youtube';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


class ViewSongComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            song:null,
            error:''
        }
    }

    async componentDidMount(){
        const id= this.props.match.params.id;
       const response = await axios.get(`/api/songs/${id}`);

       this.setState({
           song: response.data[0]
       })
    }

    deleteSong = async(e)=>{
        const id= this.props.match.params.id;
        const response = await axios.delete(`/api/songs/${id}`);
        if(response.data.error){
            return this.setState({ error : response.data.error});
           }
      return this.props.history.push('/');

    }

    displayingSongMeta() {
        if(this.props.state.user && this.state.song._creator === this.props.state.user._id){
            return (
                <div className="row valign-wrapper">
                <div className="col sm2 ">
                  <img src={this.state.song.albumImage} className="responsive-image" height="150px" width="150px" alt="Album Image"/>
                </div>
    
                <div className="col sm10">
                    <span style={{ fontSize:24}}>{ this.state.song.title}</span><br/> 
                    <p>
                       <span><b>artist: </b> {this.state.song.artist}</span> <br/>
                        <span><b>album: </b> {this.state.song.album}</span> <br/>
                        <span><b>genre: </b> {this.state.song.genre}</span> <br/>
                        
                    </p>    
                    <p>
                    <Link className="btn waves-effect waves-light" to={`/songs/${this.props.match.params.id}/edit`}>Edit</Link>
                    <button className="btn waves-effect waves-light" onClick={(e)=> this.deleteSong()} style={buttonMargin}>Delete</button>
                    <button className="btn waves-effect waves-light" style={buttonMargin}>Bookmarks</button>
                    </p>        
                </div>
                </div>
            );

        }else{
            return (
                <div className="row valign-wrapper">
                <div className="col sm2 ">
                  <img src={this.state.song.albumImage} className="responsive-image" height="150px" width="150px" alt="Album Image"/>
                </div>
    
                <div className="col sm10">
                    <span style={{ fontSize:24}}>{ this.state.song.title}</span><br/> 
                    <p>
                       <span><b>artist: </b> {this.state.song.artist}</span> <br/>
                        <span><b>album: </b> {this.state.song.album}</span> <br/>
                        <span><b>genre: </b> {this.state.song.genre}</span> <br/>
                        
                    </p>    
                    <p>
                    <button className="btn waves-effect waves-light">Bookmarks</button>
                    </p>        
                </div>
                </div>
            );
        }
 
        
    }


    render(){
            if(this.state.song !=null){
                return(
                    <div >
                     <div className="row">
                       <div className="col s12 m6 ">
                        <div className="card-panel grey lighten-5 z-depth-1">
                           {this.displayingSongMeta()}
                       </div>
                      </div>
                      <div className="col sm12 m6">
                          <div className="card-panel">
                              {/* <Youtube
                                  videoId={this.state.song.youtubeId}
                                  opts={
                                      {
                                          height:'250',
                                          width:'480'
                                      }
                                  }
                              /> */}

                              <iframe src={`https://www.youtube.com/embed/${this.state.song.youtubeId}` } frameBorder="0"></iframe>

                          </div>

                      </div>
                   </div>

                    <div className="row">
                    <div className="col s12 m6 ">
                    <div className="card grey lighten-5 z-depth-1">
                        <div className="card-title">Lyrics</div>
                        <div className="card-content">
                           <span className="pre">
                           {this.state.song.lyrics}
                           </span>
                        </div>
                    </div>
                    </div>
                    <div className="col sm12 m6">
                    <div className="card grey lighten-5 z-depth-1">
                        <div className="card-title">Guitar Tabs</div>
                        <div className="card-content">
                            <span className="pre">
                            {this.state.song.tab}
                            </span>
                        </div>
                    </div>
                        
                    </div>
                    </div>
                    </div>

                );

            }else{
                return(
                    <Loader />
                );
            }

         }
}

function mapStatetoProps(state){
    return { state: state.auth}
}

export default connect(mapStatetoProps)(ViewSongComponent);


const styles ={
    buttonMargin:{
        marginLeft: 6
    }
}

const {buttonMargin} = styles;
