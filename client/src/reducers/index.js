import {combineReducers} from 'redux';
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import songs from "./songs";

export default combineReducers({

    auth:auth,
    songs: songs,
    form:formReducer

});