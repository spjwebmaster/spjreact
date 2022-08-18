import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

export default function Navigation (props){

    const type = props.type;
    const menu = props.menu;
    const [thisPage, setThisPage] = useState();

    const mainPages = [
        "/about",
        "/membership",
        "/ethics",
        "/resources",
        "/explore",
        "/news",

    ]
    
    let location = useLocation();
    const pathname = location.pathname;
    useEffect(() => {
        // code to run on component mount
            const thisPageItem = (menu? menu.filter(t=>t.attributes.url==location.pathname): []);
            setThisPage(thisPageItem);
            
    }, [menu]);


    return (
       
          
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            <li className="nav-item">
                <a href="/about" className={`nav-link ${(pathname.indexOf("/about")>-1? "active": "")}`} >About</a>
            </li>
            <li className="nav-item">
                <a href="/membership" className={`nav-link ${(pathname.indexOf("/membership")>-1? "active": "")}`}>Membership</a>
            </li>
            <li className="nav-item">
                <a href="/ethics" className={`nav-link ${(pathname.indexOf("/ethics")>-1? "active": "")}`}>Ethics</a>
            </li>
            <li className="nav-item">
                <a href="/resources" className={`nav-link ${(pathname.indexOf("/resources")>-1? "active": "")}`}>Resources</a>
            </li>

            <li className="nav-item">
                <a href="/explore" className="nav-link">Explore SPJ</a>
            </li>
            <li className="nav-item">
                <a href="/news-events" className="nav-link">News &amp; Events</a>
            </li>
        </ul>
              
       
    );

}