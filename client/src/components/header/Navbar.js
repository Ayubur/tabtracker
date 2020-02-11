import React from "react";
import { connect } from 'react-redux';

class Navbar extends React.Component {

  render(){
    if(!this.props.auth){
      return (
        <div className="navbar-fixed">
        <nav className="nav-extended">
        <div className="nav-wrapper">
        <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only"><i className="material-icons">menu</i></a>
        <div className="container">
      <a href="/" className="brand-logo">tabtracker</a>
 
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>

      </ul>
      <ul id="slide-out" className="side-nav">
      <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
      </ul>
    </div>
    </div>
  </nav>
  </div>

      );
    }else{
      return (
        <div className="navbar-fixed">
        <nav>
        <div className="nav-wrapper">
 
              <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only"><i className="material-icons">menu</i></a>
           <div className="container">
           <a href="/" className="brand-logo">tabtracker</a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/song/create">Add Song</a></li>
             <li><a href="/logout">logout</a></li>

            </ul>

            <ul id="slide-out" className="side-nav">
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
  return { auth: state.auth.user};
}

export default connect(mapStateToProps)(Navbar);
