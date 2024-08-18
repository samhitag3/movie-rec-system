import React from 'react';
import "./Movie.css"

export default function Movie({title, cover}) {
    return (
        <div className="container">
            <img src={cover} className="poster"/>  
        </div>
    );
}

//hover to reveal title and darken