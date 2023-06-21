import React from "react";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default function Header (props){


    const menuOpen = (props.menuopen? "show": "");
   
    return (
        <header className="fixed-top mainHeader">
           <div className="bg-spjblue p-2 text-white topNav text-end">
                <div className="container">
                    Top 
                </div>
            </div>
           <nav className="navbar navbar-expand-lg navbar-light bg-white text-dark">
            
                <div className="container row mx-auto">

                    <div className="col-auto p-0">
                        <div className="navbar-brand d-flex align-items-center">
                            <a href="/">
                                <img src="https://drupal.spjnetwork.org/themes/custom/b4subtheme/logo.svg" height="60" />
                            </a>
                        </div>
                    </div>
                    <div className="col-3 col-md-auto p-0 text-right">
                        
                    <button onClick={props.menuclick}
                            className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    <div className={`collapse navbar-collapse col-12 col-md-auto p-0 ${menuOpen}`}>
                        <Navigation type="full" menu={props.menu} page={props.page} />
                        <div className="subMenu">

                            <ul className="nav navbar-nav">
                                <li className="nav-item">
                                    <button className="btn">Search <FontAwesomeIcon icon={faSearch} /></button>
                                </li>
                                <li className="nav-item donateBtn">
                                    <a className="btn btn-success text-white" href="/donate">Donate</a>
                                </li>
                            </ul>
                           
                        </div>
                    </div>
                  
                    
                </div>
                
            </nav>
           
        </header>
    );

}