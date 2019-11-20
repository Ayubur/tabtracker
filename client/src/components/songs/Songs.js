import React, {Component} from 'react';
import { Link} from 'react-router-dom'
import Loader from 'react-loader';
import {connect } from 'react-redux';
import * as actions from '../../actions';
import axiosConfig from '../../axiosConfig';

import DataTable from 'react-data-table-component';

class SongsComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            bookmarkedSong: null,
            viewedSongs:null
        }
    }

    async componentDidMount(){
        this.props.fetchSongs();
        if(this.props.auth){
            const viewedSongs = await axiosConfig.get(`/api/${this.props.auth._id}/songs/viewedSongs`);
            const bookmarkedSongs = await axiosConfig.get(`/api/${this.props.auth._id}/songs/bookmark`);
    
            if(!bookmarkedSongs.data.error){
                this.setState({
                    bookmarkedSong:bookmarkedSongs.data
                })
            }
            if(!viewedSongs.data.error){
                this.setState({
                    viewedSongs:viewedSongs.data
                })
            }
        }

        console.log(this.state);

    }

    displayingSongs(){
 
             return this.props.songs.map((song,id)=>{
               return (
                         <div key={id} className="row valign-wrapper">
                         <div className="col sm2 ">
                           <img src={song.albumImage} className="responsive-image" height="100px" width="130px" alt="Album Image"/>
                         </div>

                         <div className="col sm10">
                         <span style={{ fontSize:24}}>{song.title}</span><br/> 
                                <p>
                                <span><b>artist: </b> {song.artist}</span> <br/>
                                    
                                </p>  
                             <p>
                             <Link className="btn waves-effect waves-light" to={`/songs/${song._id}`}>View</Link>
                             </p>
                             
                         </div>
                         </div>
                
                 );
            })

    }

    render(){

        if(this.state.bookmarkedSong && this.state.viewedSongs){
          
            if(this.props.songs !=null){

                const bookmarkedSongsData = this.state.bookmarkedSong;
                const viewedSongsData = this.state.viewedSongs;
                    const bookmarkcolumns = [
                    {
                        name: 'Title',
                        selector: 'title',
                        sortable: true,
                    },
                    {
                        name: 'Album',
                        selector: 'album',
                        sortable: true,
                        right: true,
                    },
                    ];

                    const viewSongcolumns = [
                        {
                            name: 'Title',
                            selector: 'title',
                            sortable: true,
                        },
                        {
                            name: 'Album',
                            selector: 'album',
                            sortable: true,
                            right: true,
                        },
                        ];
    
                return(
                    <div className="row">
                        <div className="col s12 m5">
                        <div className="row">
                            <div className="col s12 m12">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        title="Recently viewed Songs"
                                        columns={viewSongcolumns}
                                        data={viewedSongsData}
                                       
                                    />
                        </div>
                            </div>

                       <div className="col s12 m12">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        title="Bookmarked Songs"
                                        columns={bookmarkcolumns}
                                        data={bookmarkedSongsData}
                                    />
                        </div>
                            </div>
                        </div>

                        </div>
                     <div className="col s12 m7">
                        <div className="card-panel grey lighten-5 z-depth-1">
                            {this.displayingSongs()}
                        </div>
                    </div>
                    </div>
    
                );
           
       
             }else{
                return(
                    <Loader />
                );
             }
             
        }else{
            if(this.props.songs !=null){
    
                return(
                    <div className="row">
                     <div className="col s12 m12">
                        <div className="card-panel grey lighten-5 z-depth-1">
                            {this.displayingSongs()}
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
}

function mapStateToProps(state){
    return { songs: state.songs.songs,auth:state.auth.user };
}

export default connect(mapStateToProps,actions)(SongsComponent);