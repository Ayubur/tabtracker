import React, {Component} from 'react';
import NetworkError from '../NetworkError';
import Loader from 'react-loader';
import {connect } from 'react-redux';
import axiosConfig from '../../axiosConfig';
import DataTable from 'react-data-table-component';

class MySongs extends Component{
    constructor(props){
        super(props);

        this.state={
            mySongs:null,
            bookmarkedSong: null,
            viewedSongs:null,
            networkError:false
        }

    }

    async componentDidMount(){
        this.shouldNavigateAway();

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


    shouldNavigateAway(){
        if(! this.props.auth){
            return this.props.history.push('/');
        }

    }

    render(){

        if(this.state.bookmarkedSong && this.state.viewedSongs && this.state.mySongs){

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

        return (
         <div className="container">
             <div className="row">
                 <div className="col s12 m12">
                 <div className="card-panel grey lighten-5 z-depth-1">
                             <DataTable
                                 title="My Songs"
                                 columns={mysongcolumns}
                                 data={mySongsData}
                                 striped = {true}
                                 pagination={true}

                             />
                        </div>
                 </div>
             </div>
             <div className="row">
                 <div className="col s12 m12">
                 <div className="card-panel grey lighten-5 z-depth-1">
                             <DataTable
                                 title="Bookmarked Songs"
                                 columns={bookmarkcolumns}
                                 data={bookmarkedSongsData}
                                 striped = {true}
                                 pagination={true}

                             />
                        </div>
                 </div>
             </div>
             <div className="row">
                 <div className="col s12 m12">
                 <div className="card-panel grey lighten-5 z-depth-1">
                             <DataTable
                                 title="Reacently Viewd Songs"
                                 columns={viewSongcolumns}
                                 data={viewedSongsData}
                                 striped = {true}
                                 pagination={true}

                             />
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
    }
}

function mapStateToProps(state){
    return { auth: state.auth.user};
  }
  
  export default connect(mapStateToProps)(MySongs);