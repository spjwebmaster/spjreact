import React from "react";
import Navigation from "./Navigation";

export default function Footer (props){
    return (
        <footer className="bg-light">
            <hr />
            <nav>
            <div className="container"> 
                Footer
                <br />
                <Navigation />
            </div>
            </nav>
        </footer>
    );

}