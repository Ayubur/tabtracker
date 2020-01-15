import {CREATE_SONG, SONG_ERROR} from '../actions/types';

const INITIAL_STATE={
    songs: null,
    successMsg:"",
    errorMsg: ""
}

const songs = (state=INITIAL_STATE, actions)=>{
    switch(actions.type){
        case CREATE_SONG:
            return {...state, successMsg:actions.payload.success, songs:actions.payload.song};
        case SONG_ERROR:
            return {...state, errorMsg:actions.payload};
        default:
            return{...state};
    }

}

export default songs;