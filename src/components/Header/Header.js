// import Link from "next/link";
import { Link } from 'react-router-dom';
import "./Header.css";
import React, { useState } from "react";

function Header() {
    const [ expanded, setExpanded ] = useState(false);
    
    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="header">
            {expanded && (
                <div className="expanded-menu">
                    <Link to="/search" className="menu-item">
                        <i className="fas fa-search"></i>
                    </Link>
                    <Link to="/profile" className="menu-item">
                        <i className="fas fa-user"></i>
                    </Link>
                </div>
            )}
            <button className="menu-button" onClick={toggleMenu}>
                <i  className="fas fa-bars"></i>
            </button>
        </div>
    );
}

export default Header;