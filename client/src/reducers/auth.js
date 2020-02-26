import { AUTH_USER, AUTH_ERROR,AUTH_LOGOUT,REMOVE_ERROR } from '../actions/types';

const INITIAL_STATE ={
     user: null,
    errorMessage:''
};

const auth = (state=INITIAL_STATE, actions)=>{
  switch(actions.type){
    case AUTH_USER:
      return{ ...state, user:actions.payload.user,errorMessage:''};
    case AUTH_ERROR:
      return {...state, errorMessage: actions.payload};
    case AUTH_LOGOUT:
      return {...state,user:actions.payload,errorMessage:''}
    case REMOVE_ERROR:
      return {...state, errorMessage:actions.payload}
    default:
        return state;
  }
}

export default auth;