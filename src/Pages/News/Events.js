
import Dates from "../../Components/Shared/Dates";
import React, { Component, useState, useEffect } from "react";


export default function Events(props){
    const [data, setData] = useState();
    const path = "all"
    useEffect(() => {
        // code to run on component mount

            fetch(`/calendarjson/${path}`)
                .then(response=>response.json())
                .then(data => {
                    console.log("events", data)
                    setData(data.data)
                })
        
      }, []);


    return(
        <div>
           
           <h1>Let's do this together</h1>
           {(data? <div>
                    <ul className="widget-list">
                    {data.map(cal=>{

                        let title = (cal.title);
                        

                        return(
                            <li key={cal.link}>
                                <h4>{cal.eventstart}</h4>
                                <h3><a href={cal.link} target="_blank">
                                    {title}
                                    </a>
                                    </h3>
                                    <div dangerouslySetInnerHTML={{__html: cal.description}} ></div>
                                    <hr />
                            </li>
                        )
                    })}
                    </ul>


                </div> : <div>Loading</div>)}
        </div>
    )
}