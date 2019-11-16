import React from "react";
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.auth == null){
      return (
        <div className="navbar-fixed">
        <nav>
        <div className="nav-wrapper">
            <a href="/" className="brand-logo">tabtracker</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
      </nav>
      </div>

      );
    }else{
      return (
        <div className="navbar-fixed">
              <nav >
        <div className="nav-wrapper">
            <div className="container">
            <a href="/" className="brand-logo">tabtracker</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/song/create">Add Song</a></li>
            <li><a href="/logout">logout</a></li>
          </ul>
            </div>
        </div>
      </nav>
        </div>
      );
    }
  }
 

};

function mapStateToProps(state){
  //console.log(state.auth.user);
  return { auth: state.auth.user};
}

export default connect(mapStateToProps)(Navbar);
