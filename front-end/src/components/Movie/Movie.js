import React from 'react';
import "./Movie.css"

export default function Movie({title, cover, id}) {
    return (
        <div className="container">
            <img src={cover} className="poster"/>  
            <p>{id}</p>  
        </div>
    );
}

// hover to reveal title and darken