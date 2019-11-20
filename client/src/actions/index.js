import {
     AUTH_USER, AUTH_ERROR,AUTH_LOGOUT,
     CREATE_SONG, SONG_ERROR, FETCH_SONG} from './types';
     
import axios from 'axios';

import axiosConfig from '../axiosConfig';

export const signup =(formProps,callback)=> async dispatch =>{

    try{
        
        const response = await axiosConfig.post('/api/signup',formProps);

        if(response.data.error){
            dispatch({ type: AUTH_ERROR, payload:response.data.error});
        }else{
            
        dispatch({
            type: AUTH_USER,
            payload: response.data
        });

        const state ={
            user: response.data.user.token,
            errorMessage:''
          };
        localStorage.removeItem('state');
        localStorage.setItem('state',state);

        callback();

        }

    
    }catch(e){
        dispatch({ type: AUTH_ERROR, payload:"**Oopps..something went wrong, please try again"});

    }

};

export const signin =(formProps,callback)=> async dispatch =>{

    try{
        const response = await axiosConfig.post("/api/signin",formProps);

        dispatch({
            type: AUTH_USER,
            payload: response.data
        });

        const state ={
            user: response.data.user.token,
            errorMessage:''
          };
        localStorage.removeItem('state');
        localStorage.setItem('state',state);
        callback();

    }catch(e){
        dispatch({ type: AUTH_ERROR, payload:"**Oopps..something went wrong, please try again"});

    }

};

export const signout = ()=> dispatch=>{

    localStorage.removeItem('state');
    dispatch({
        type: AUTH_LOGOUT,
        payload:null
    })
}


export const createSong = (formProps,callback)=> async dispatch=>{
    try{

        const token = JSON.parse(localStorage.getItem("state")).auth.user.token;

        const response = await axiosConfig.post('/api/songs/create',formProps,{
            headers:{
                authorization: token
            }
        });
        
        if(response.data.error){
            dispatch({
                type:SONG_ERROR,
                payload:response.data.error
            })
        }else{
            dispatch({
                type:CREATE_SONG,
                payload:response.data
            })
                callback();
        
        }
        
    }catch(e){
        dispatch({
            type:SONG_ERROR,
            payload:"Error in saving songs, please try again..."
        })

    }
}

// export const fetchSongs = ()=> async dispatch=>{
//     try{
//         const response = await axiosConfig.get('/api/songs');
//          dispatch({
//             type: FETCH_SONG,
//             payload:response.data
//         })
//     }catch(e){
//         dispatch({
//             type: SONG_ERROR,
//             payload: "ERROR in fetching songs...."
//         })
//     }

// }