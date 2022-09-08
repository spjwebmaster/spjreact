import React, { Component, useState, useEffect } from "react";
import Dates from "../Shared/Dates";

function FooterDates(props){

    const [news, setNews] = useState();
    const limit = props.limit;


    return (
        <div className="">
            
            <h3>SPJ Events and Deadlines</h3>
                <Dates limit="5" list="all" dateinttitle={true} />
                <a href="/events">See All Events</a>
            
        </div>
    )
}

export default FooterDates;