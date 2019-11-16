import React from 'react';

import * as actions from '../../actions';
import { connect } from 'react-redux';

class Logout extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.signout();
        this.props.history.push('/');
    }

    render(){
        return (
            <p>Good Bye</p>
        );
    }


}

export default connect(null,actions)(Logout);