import {CREATE_SONG, SONG_ERROR,FETCH_SONG } from '../actions/types';

const INITIAL_STATE={
    songs: null,
    successMsg:"",
    errorMsg: ""
}

const songs = (state=INITIAL_STATE, actions)=>{
    switch(actions.type){
        case FETCH_SONG:
            return {...state, songs:actions.payload};
        case CREATE_SONG:
            return {...state, successMsg:actions.payload.success};
        case SONG_ERROR:
            return {...state, errorMsg:actions.payload};
        default:
            return{...state};
    }

}

export default songs;