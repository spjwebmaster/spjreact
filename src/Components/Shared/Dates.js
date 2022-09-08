import React, { Component, useState, useEffect } from "react";

function Dates(props){
    const [data, setData] = useState();

    const path = props.list;

    const dateinttitle = (props.dateinttitle? props.dateinttitle: false);

    useEffect(() => {
        // code to run on component mount

            fetch(`/calendarjson/${path}`)
                .then(response=>response.json())
                .then(data => {
                    console.log("events", data.data)
                    setData(data.data)
                })
        
      }, []);


    return (
        <div className="">


              
                {(data? <div>
                    <ul className="widget-list">
                    {data.map(cal=>{

                        let title = (dateinttitle? cal.eventstart + " - " +cal.title: cal.title);
                        let key = cal.link+"|"+title;

                        return(
                            <li key={key}>
                                -<a href={cal.link} target="_blank">
                                    {title} 
                                </a>
                            </li>
                        )
                    })}
                    </ul>


                </div> : <div>Loading</div>)}
        </div>
          
    )
}

export default Dates;