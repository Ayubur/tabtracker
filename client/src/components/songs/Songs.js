import React, {Component} from 'react';
import { Link} from 'react-router-dom'
import Loader from 'react-loader';
import {connect } from 'react-redux';
import * as actions from '../../actions';



class SongsComponent extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchSongs();
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
        
        if(this.props.songs !=null){
    
            return(
                <div className="row">
                 <div className="col s12 m8  offset-m2">
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

function mapStateToProps(state){
    return { songs: state.songs.songs };
}

export default connect(mapStateToProps,actions)(SongsComponent);