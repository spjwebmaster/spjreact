import React from "react";

export default function Navigation (props){

    const type = props.type;
    const menu = props.menu;
    let allLinks = [];
    
    if(menu){
        console.log("nav menu", menu)
        menu.forEach(function(m){
            console.log(m.attributes.title, m.attributes.url)
        })
    }

    return (
       
          
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
                <a href="/about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
                <a href="/membership" className="nav-link">Membership</a>
            </li>
            <li className="nav-item">
                <a href="/ethics" className="nav-link">Ethics</a>
            </li>
            <li className="nav-item">
                <a href="/resources" className="nav-link">Resources</a>
            </li>

            <li className="nav-item">
                <a href="/explore" className="nav-link">Explore SPJ</a>
            </li>
            <li className="nav-item">
                <a href="/news" className="nav-link">News &amp; Events</a>
            </li>
        </ul>
              
       
    );

}