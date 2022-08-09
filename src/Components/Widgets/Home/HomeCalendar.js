import React, { Component, useState, useEffect } from "react";
import Dates from "../../Shared/Dates"

function HomeCalendar(){
    const [data, setData] = useState();


    useEffect(() => {
        // code to run on component mount

            fetch(`/calendarjson/home`)
                .then(response=>response.json())
                .then(data => {
                    console.log("info",data.data);
                    setData(data.data)
                })
        
      }, []);


    return (
        <div className="calendarHome section">
            <h2>Let's Do This Together</h2>
            <p>
            Is your organization hosting an event you think would be of interest to journalists? 
                Add it to our calendar!
            </p>
            <div className="row">
                <div className="col-sm-2">
                    <img src="https://drupal.spjnetwork.org/sites/default/files/2022-04/t-spjheart-teal.jpg" width="100%" />

                </div>
                <div className="col-sm-10">
                    
                <h4>Upcoming SPJ events</h4>
                <Dates limit="5" list="home" />

                <h4>General events</h4>
                <Dates limit="5" list="homegen" />
                         

                </div>
            </div>
            
        </div>
    )
}

export default HomeCalendar;