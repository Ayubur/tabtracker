import React, {Component} from 'react';
import NetworkError from '../NetworkError';
import { Link} from 'react-router-dom'
import Loader from 'react-loader';
import {connect } from 'react-redux';
import * as actions from '../../actions';
import axiosConfig from '../../axiosConfig';
import DataTable from 'react-data-table-component';
import Collapsible from 'react-collapsible';
import MetaTags from 'react-meta-tags';


class SongsComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            songs:[],
            per:1000,
            page:1,
            totalPages: null,
            hasMore:null,
            mySongs:null,
            bookmarkedSong: null,
            viewedSongs:null,
            search:'',
            networkError:false        }
    }

    async componentDidMount(){
        this.loadSongs();

        if(this.props.auth){

            try{
                const viewedSongs = await axiosConfig.get(`/api/${this.props.auth._id}/songs/viewedSongs`,{
                    headers:{
                        authorization:this.props.auth.token
                    }
                });
                 const bookmarkedSongs = await axiosConfig.get(`/api/${this.props.auth._id}/songs/bookmark`,{
                    headers:{
                        authorization:this.props.auth.token
                    }
                 });

                 const mySongs = await axiosConfig.get(`/api/${this.props.auth._id}/mysongs`,{
                    headers:{
                        authorization:this.props.auth.token
                    }
                 });

           if(!mySongs.data.error){
                    this.setState({
                        mySongs:mySongs.data
                    })
             }
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

            }catch(e){
                this.setState({
                    networkError:true
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
            this.setState({
                networkError:true
            })
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
                         <div className="block">
                             <img src={song.albumImage} className="responsive-image" alt={song.title} />

                             <div>
                                <h2>{song.title}</h2>
                                <p>{song.artist}
                                </p>
                                <p>
                                <Link className="waves-effect waves-light btn" to={`/songs/${song._id}`}>View</Link>

                                </p>
                             </div>
                         </div>
                         </div>
                
                 );
            })

    }

    loadMoreButton(){
        if(this.state.hasMore){
            return(
             <button className="btn hasMoreButton" onClick={this.loadMore}>Load More</button>
            )
        }
        
    }

    render(){

        if(this.state.bookmarkedSong && this.state.viewedSongs){
          
            if(this.state.songs.length !==0){


                const bookmarkedSongsData = this.state.bookmarkedSong;
                const viewedSongsData = this.state.viewedSongs;
                const mySongsData = this.state.mySongs;

                const mysongcolumns = [
                    {
                        name: 'Title',
                        selector: 'title',
                        sortable: true,
                        cell: row => <a target="_blank" href={"/songs/"+row._id}>{row.title}</a>,
                    },
                    {
                        name: 'Artist',
                        selector: 'artist',
                        sortable: true,
                        right: true,
                    },
                    ];
                    const bookmarkcolumns = [
                    {
                        name: 'Title',
                        selector: 'title',
                        sortable: true,
                        cell: row => <a target="_blank" href={"/songs/"+row._id}>{row.title}</a>,
                    },
                    {
                        name: 'Artist',
                        selector: 'artist',
                        sortable: true,
                        right: true,
                    },
                    ];

                    const viewSongcolumns = [
                        {
                            name: 'Title',
                            selector: 'title',
                            sortable: true,
                            cell: row => <a target="_blank" href={"/songs/"+row._id}>{row.title}</a>,

                        },
                        {
                            name: 'Artist',
                            selector: 'artist',
                            sortable: true,
                            right: true,
                        },
                        ];
    
                return(
                    <div className="container">
                    <MetaTags>
                         <title>Tabtracker</title>
                         <meta property="og:title" content="Tabtracker" />
                         <meta property="og:description" content="Crazy about guitar ? Track guitar tab of your most favourite songs" />
                        <meta property="og:image" content={window.location.href+"guitar.jpg"} />
                    </MetaTags>
                        <div>
                                                        
                        <div className="col s12 m12">
                            <div className="card-body grey lighten-5 z-depth-1">
                            <div className="row">
                                <div className="input-field col s12 m12">
                                <input name="serach" type="search" onChange={e =>this.updateSearch(e)} placeholder="search songs"/>
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                                </div>
                            </div>
                            </div>

                        </div>

                        </div>
                        <div className="row" id="custom-scroll">
                            <div className="col s12 m4">
                            <div>
                              <Collapsible trigger="My Songs">
                              <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        columns={mysongcolumns}
                                        data={mySongsData}
                                        striped = {true}
                                        pagination={true}

                                    />
                               </div>
                              </Collapsible>
                            </div>
                        <div>
                              <Collapsible trigger="Bookmarked Songs">
                              <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        columns={bookmarkcolumns}
                                        data={bookmarkedSongsData}
                                        striped = {true}
                                        pagination={true}

                                    />
                               </div>
                              </Collapsible>
                            </div>     
                          <div>
                            <Collapsible trigger="Recently Viewed Songs">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                    <DataTable
                                        columns={viewSongcolumns}
                                        data={viewedSongsData}
                                        striped = {true}
                                        pagination={true}
                                       
                                    />
                             </div>
                            </Collapsible>
                          </div>

                            </div>
                            
                            <div className="col s12 m8">
                                <div className="card-panel grey lighten-5 z-depth-1">
                                {this.displayingSongs()}
                                {this.loadMoreButton()}
                            </div>

                            </div>
                        </div>
                    </div>
    
                );
           
       
             }else if(this.state.networkError){
                return(
                      <NetworkError />
                )   
              
           }else{
                return(
                    <Loader />
                );
             }
             
        }else{
            if(this.state.songs.length !==0){
    
                return(
                    <div className="container">
                    <MetaTags>
                         <title>Tabtracker</title>
                         <meta property="og:title" content="Tabtracker" />
                         <meta property="og:description" content="Crazy about guitar ? Track guitar tab of your most favourite songs" />
                        <meta property="og:image" content={window.location.href+"guitar.jpg"} />
                    </MetaTags>
                    
                    <div>
                                                    
                    <div className="col s12 m12">
                        <div className="card-body grey lighten-5 z-depth-1">
                        <div className="row">
                            <div className="input-field col s12 m12">
                            <input name="serach" type="search" onChange={e =>this.updateSearch(e)} placeholder="search songs"/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                            </div>
                        </div>
                        </div>

                    </div>

                    </div>
                    <div className="row" id="custom-scroll">
                        <div className="col s12 m12">
                            <div className="card-panel grey lighten-5 z-depth-1">
                            {this.displayingSongs()}
                            {this.loadMoreButton()}
                        </div>

                        </div>
                    </div>
                </div>

    
                );
           
       
             }else if(this.state.networkError){
                  return(
                      <div>
                    <MetaTags>
                         <title>Tabtracker</title>
                         <meta property="og:title" content="Tabtracker" />
                         <meta property="og:description" content="Crazy about guitar ? Track guitar tab of your most favourite songs" />
                        <meta property="og:image" content={window.location.href+"guitar.jpg"} />
                    </MetaTags>
                    <NetworkError />

                      </div>
                      
                  )   
                
             }else{
                return(
                    <div>
                     <MetaTags>
                         <title>Tabtracker</title>
                         <meta property="og:title" content="Tabtracker" />
                         <meta property="og:description" content="Crazy about guitar ? Track guitar tab of your most favourite songs" />
                        <meta property="og:image" content={window.location.href+"guitar.jpg"} />
                    </MetaTags>
                    <Loader />
                    </div>

                );
             }
             
        }
        
      
    }
}

function mapStateToProps(state){
    return {auth:state.auth.user };
}

export default connect(mapStateToProps,actions)(SongsComponent);