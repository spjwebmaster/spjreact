import React, { Component, useState, useEffect } from "react";

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
        <div className="coreFour">
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
                    
                
               

              
                {(data? <div>
                    <h4>Upcoming SPJ events</h4>
                    <ul className="item-list">
                    {data.cal.map(cal=>{

                        return(
                            <li key={cal.link}>
                                <a href={cal.link} target="_blank">{cal.title}</a>
                            </li>
                        )
                    })}
                    </ul>

                    <h4>General events</h4>
                    <ul className="item-list">
                    {data.gen.map(gen=>{

                        return(
                            <li key={gen.link}>
                                <a href={gen.link} target="_blank">{gen.title}</a>
                            </li>
                        )
                    })}
                    </ul>

     



                </div> : <div>Loading</div>)}
                </div>
            </div>
            
        </div>
    )
}

export default HomeCalendar;