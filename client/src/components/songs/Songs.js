import React, {Component} from 'react';
import NetworkError from '../NetworkError';
import { Link} from 'react-router-dom'
import Loader from 'react-loader';
import {connect } from 'react-redux';
import * as actions from '../../actions';
import axiosConfig from '../../axiosConfig';
import MetaTags from 'react-meta-tags';


class SongsComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            songs:[],
            per:3000,
            page:1,
            totalPages: null,
            hasMore:null,
            search:'',
            networkError:false        }
    }

    async componentDidMount(){
        this.loadSongs();
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
            if(this.state.songs.length !==0){
    
                return(
                    <div className="container">
                    <MetaTags>
                         <title>Tabtracker</title>
                         <meta property="og:title" content="Tabtracker" />
                         <meta property="og:description" content="Crazy about guitar ? Track guitar tab of your most favourite songs" />
                        <meta property="og:image" content={window.location.href+"guitar.jpg"} />
                    </MetaTags>
                    
                    <div className="searchContainer">
                                                    
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
                    <div className="row">
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

function mapStateToProps(state){
    return {auth:state.auth.user };
}

export default connect(mapStateToProps,actions)(SongsComponent);