import React from 'react';

export default function Footer(){

    return(
        <div className="footer" style={{fontWeight:'bold'}}>

            <div>
            Developed by <a href="https://web.facebook.com/tameem.rahman1">Ayubur</a>
            <div style={{marginLeft:5}} className="fb-like" data-href="https://tabtracker.herokuapp.com" data-width="" data-layout="button_count" data-action="like" data-size="large" data-share="false"></div>
            </div>
        </div>
    )
}