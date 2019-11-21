import React, {Component} from 'react';
import { Link} from 'react-router-dom'
import Loader from 'react-loader';
import {connect } from 'react-redux';
import * as actions from '../../actions';
import axiosConfig from '../../axiosConfig';
import _ from 'lodash';
import DataTable from 'react-data-table-component';

class SongsComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            songs:[],
            per:10,
            page:1,
            totalPages: null,
            hasMore:null,
            bookmarkedSong: null,
            viewedSongs:null,
            search:''
        }
    }

    async componentDidMount(){
        this.loadSongs();

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
    }

      updateSearch(e){
          this.setState({
              search: e.target.value.substr(0,20)
          });
      }

     loadSongs = async(search)=>{
        const {per,page,songs} = this.state;
            var url = `/api/songs?pageNo=${page}&size=${per}`;
        try{
            const songresponse= await axiosConfig(url);
            if(! songresponse.data.error){
                this.setState({
                    songs:[...songs,...songresponse.data.songs],
                    hasMore:songresponse.data.has_more
                })
            }

        }catch(e){
            console.log(e);
        }
       
    }
    loadMore=()=>{
        this.setState(prevState=>({
            page:prevState.page+1
        }),this.loadSongs)
    }

    displayingSongs(){

        let filteredsongs = this.state.songs.filter(
                (song)=>{
                    return song.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
        );
 
             return filteredsongs.map((song,id)=>{
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

    loadMoreButton(){
        if(this.state.hasMore){
            return(
             <button style={{float:'right'}} className="btn waves-effect waves-light" onClick={this.loadMore}>Load More</button>
            )
        }
        
    }

    render(){

        if(this.state.bookmarkedSong && this.state.viewedSongs){
          
            if(this.state.songs.length !=0){

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
                            name: 'Artist',
                            selector: 'artist',
                            sortable: true,
                            right: true,
                        },
                        ];

                        const handleChange = (state) => {
                            // You can use setState or dispatch with something like Redux so we can use the retrieved data
                            console.log('Selected Rows: ', state.selectedRows);
                          };
    
                return(
                    <div className="row">
                        <div className="col s12 m5">
                        <div className="row searchMargin">
                            <div className="col s12 m12">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        title="Recently viewed Songs"
                                        columns={viewSongcolumns}
                                        data={viewedSongsData}
                                        striped = {true}
                                        pagination={true}
                                        Clicked
                                        Selected={this.handleChange}
                                       
                                    />
                        </div>
                            </div>

                       <div className="col s12 m12">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        title="Bookmarked Songs"
                                        columns={bookmarkcolumns}
                                        data={bookmarkedSongsData}
                                        striped = {true}
                                        pagination={true}
                                        Clicked
                                        Selected={this.handleChange}
                                    />
                        </div>
                            </div>
                        </div>

                        </div>
                     <div className="col s12 m7">
                         <div className="card-body grey lighten-5 z-depth-1">
                         <div className="row searchMargin">
                            <div className="input-field col s12 m12 ">
                               <input name="serach" type="text" onChange={e =>this.updateSearch(e)} className="validate" placeholder="Search Song"/>
                            </div>
                        </div>
                         </div>
                        <div className="card-panel grey lighten-5 z-depth-1">
                            {this.displayingSongs()}
                             {this.loadMoreButton()}
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
            if(this.state.songs.length !=0){
    
                return(
                    <div className="row">
                     <div className="col s12 m8 offset-m2">
                     <div className="card-body grey lighten-5 z-depth-1">
                         <div className="row searchMargin">
                            <div className="input-field col s12 m12">
                               <input name="serach" type="text" onChange={e => this.updateSearch(e)} className="validate" placeholder="Search Song"/>
                            </div>
                        </div>
                         </div>
                        <div className="card-panel grey lighten-5 z-depth-1">
                            {this.displayingSongs()}
                            {this.loadMoreButton()}
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
    return {auth:state.auth.user };
}

export default connect(mapStateToProps,actions)(SongsComponent);