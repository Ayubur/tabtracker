import React, {Component} from 'react';
import Loader from 'react-loader';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import NetworkError from '../NetworkError';
import axiosConfig from '../../axiosConfig';


class ViewSongComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            song:null,
            error:'',
            isBookmarked:false,
            networkError:false
        }
    }

    async componentDidMount(){
        const id= this.props.match.params.id;
        
        try{
            const response = await axiosConfig.get(`/api/songs/${id}`);
       
            this.setState({
             song: response.data[0]
             })
        }catch(e){
            this.setState({
                networkError:true
            })
        }

       if(this.props.state.user){
        const song_id = this.props.match.params.id;
        const user_id= this.props.state.user._id;

        try{
            const isBookmarked = await axiosConfig.post('/api/song/bookmarks/check',{
                
                    user_id: user_id,
                    song_id:song_id
                },{
                    headers:{
                        authorization:this.props.state.user.token
                    },
                })

            
        this.setState({
            isBookmarked:isBookmarked.data.match
        })

        }catch(e){
           this.setState({
               networkError:true
           })
        }


     }
    }

    async componentDidUpdate(){
        if(this.props.state.user){
            const song_id = this.props.match.params.id;
            const user_id= this.props.state.user._id;

            try{
                    
            const response = await axiosConfig.put(`/api/songs/${song_id}/viewedSong`,{
                userId:user_id
            },{
                headers:{
                    authorization:this.props.state.user.token
                }
            });

            }catch(e){
               console.log(e);
            }

    }
        
    }

    deleteSong = async(e)=>{
        const id= this.props.match.params.id;
        try{
            const response = await axiosConfig.delete(`/api/songs/${id}`,{
                headers:{
                    authorization:this.props.state.user.token
                }
            });
            if(response.data.error){
                return this.setState({ error : response.data.error});
               }
          return this.props.history.push('/');

        }catch(e){
           console.log(e);
        }


    }

    bookmarkSong = async(e)=>{
        const song_id = this.props.match.params.id;
        const user_id= this.props.state.user._id;

        try{
            const response = await axiosConfig.put(`/api/songs/${song_id}/bookmark`,
            {
                userId:user_id
            },{
                headers:{
                    authorization:this.props.state.user.token
                }
            });

            
        if(!response.data.error){
            this.setState({
                isBookmarked:true
            })
        }

        }catch(e){
            console.log(e);
        }
    }

    unbookmarkSong = async(e)=>{
        const song_id = this.props.match.params.id;
        const user_id= this.props.state.user._id;

        try{
            const response = await axiosConfig.put(`/api/songs/${song_id}/unbookmark`,
            {
                userId:user_id
            },{
                headers:{
                    authorization:this.props.state.user.token
                }
               
            });


            
        if(!response.data.error){
            this.setState({
                isBookmarked:false
            })
        }

        }catch(e){
            console.log(e);
        }

    }

    displayingSongMeta() {
        if(this.props.state.user && this.state.song._creator === this.props.state.user._id && !this.state.isBookmarked){
            return (
                <div className="row valign-wrapper">
                    <div className="col s12 m12">
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
                    <button className="btn waves-effect waves-light" onClick={(e)=> this.bookmarkSong()} style={buttonMargin}>Bookmark</button>
                    </p>        
                </div>
                </div>
                </div>
            );

        }
        else if(this.props.state.user && this.state.song._creator === this.props.state.user._id && this.state.isBookmarked){
            return (
                <div className="row valign-wrapper">
                     <div className="col s12 m12">
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
                    <button className="btn waves-effect waves-light" onClick={(e)=> this.unbookmarkSong()} style={buttonMargin}>UnBookmark</button>
                    </p>        
                </div>
                </div>
                </div>
            );

        }
        else if(this.props.state.user && this.state.isBookmarked){
            return (
                <div className="row valign-wrapper">
                     <div className="col s12 m12">
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
                    <button className="btn waves-effect waves-light" onClick={(e)=> this.unbookmarkSong()} style={buttonMargin}>UnBookmark</button>
                    </p>        
                </div>
                </div>
                </div>
            );

        }
        else if(this.props.state.user && !this.state.isBookmarked){
            return (
                <div className="row valign-wrapper">
                  <div className="col s12 m12">

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
                    <button className="btn waves-effect waves-light" onClick={(e)=> this.bookmarkSong()} style={buttonMargin}>Bookmark</button>
                    </p>        
                </div>
                </div>
                </div>
            );

        }else{
            return (
                <div className="row valign-wrapper">
                  <div className="col s12 m12">

                <div className="col sm2 ">
                  <img src={this.state.song.albumImage} className="responsive-image" height="150px" width="150px" alt={ this.state.song.title}/>
                </div>
    
                <div className="col sm10">
                    <span style={{ fontSize:24}}>{ this.state.song.title}</span><br/> 
                    <p>
                       <span><b>artist: </b> {this.state.song.artist}</span> <br/>
                        <span><b>album: </b> {this.state.song.album}</span> <br/>
                        <span><b>genre: </b> {this.state.song.genre}</span> <br/>
                        
                    </p>      
                </div>
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
                     <div className="col s12 m12">

                       <div className="col s12 m6 ">
                        <div className="card-panel grey lighten-5 z-depth-1">
                           {this.displayingSongMeta()}
                       </div>
                      </div>
                      <div className="col s12 m6">
                          <div className="card-panel">
                              <iframe src={`https://www.youtube.com/embed/${this.state.song.youtubeId}` } frameBorder="0"></iframe>

                          </div>

                      </div>
                      </div>
                   </div>

                    <div className="row">
                    <div className="col s12 m12">

                    <div className="col s12 m6 ">
                    <div className="card grey lighten-5 z-depth-1" >
                        <div style={verticalSpace}></div>
                        <div className="card-title" style={titleMargin}>Lyrics</div>
                        <div className="card-content">
                              <pre> {this.state.song.lyrics}</pre>
                        </div>
                    </div>
                    </div>
                    <div className="col s12 m6">
                    <div className="card grey lighten-5 z-depth-1">
                    <div style={verticalSpace}></div>
                        <div className="card-title" style={titleMargin}>Guitar Tabs</div>
                        <div className="card-content">
                            <pre>{this.state.song.tab}</pre>
                        </div>
                        </div>
                    </div>
                        
                    </div>
                    </div>
                    </div>

                );

            }else if(this.state.networkError){
                return(
                   <NetworkError />
                )
                
            }
            else{
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
    },
    titleMargin:{
        marginLeft:28
    },
    verticalSpace:{
        height:10
    }
}

const {buttonMargin,titleMargin,verticalSpace} = styles;
