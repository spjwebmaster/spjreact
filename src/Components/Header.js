import React from "react";
import Navigation from "./Navigation";

export default function Header (props){
    return (
        <header>
           <div className="bg-primary p-2 text-right text-white">Top</div>
           <nav className="navbar navbar-expand-lg navbar-light text-dark">
            
                <div className="container row mx-auto">

                    <div className="col-auto p-0">
                        <div className="navbar-brand d-flex align-items-center">
                            <a href="/">
                                <img src="http://drupal/themes/custom/b4subtheme/logo.svg" height="60" />
                            </a>
                        </div>
                    </div>
                    <div className="col-3 col-md-auto p-0 text-right">

                    </div>
                    <div className="collapse navbar-collapse col-12 col-md-auto p-0">
                        <Navigation />
                    </div>
                  
                    
                </div>
                
            </nav>
           
        </header>
    );

}