

import React, { Component, useState, useEffect } from "react";


export default function Conferences(props){
    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const path = "all"
    useEffect(() => {
        // code to run on component mount

            fetch(`/jsonapi/node/regional_conference?include=field_contact_person`)
                .then(response=>response.json())
                .then(data => {
                    console.log("conferences", data)
                    setData(data.data)
                    setIncluded(data.included)
                })
        
      }, []);


    return(
        <div>
   
           <h1>Regional Conferences</h1>
           {(data? <div>
                    <ul className="widget-list">
                    {data.map(cal=>{

                        let title = (cal.attributes.title);
                        let bioID = cal.relationships.field_contact_person.data[0].id;
                        let bio = included.filter(t=>t.id==bioID);

                        return(
                            <li key={cal.id}>
                                
                                <h3>
                                    {title}
                                 
                                </h3>
                                <p><strong>{cal.attributes.field_start_date} - {cal.attributes.field_end_date}</strong></p>
                                <div dangerouslySetInnerHTML={{__html: cal.attributes.body.value}} ></div>
                                <div dangerouslySetInnerHTML={{__html: cal.attributes.field_location.value}} ></div>

                                <br />
                                <p><strong>Contact:</strong><br />
                                {bio[0].attributes.title} <br />
                                {bio[0].attributes.field_title}<br />
                                <a href={`mailto:${bio[0].attributes.field_email}`}>Email</a>
                                </p>
                                    <hr />
                            </li>
                        )
                    })}
                    </ul>


                </div> : <div>Loading</div>)}
        </div>
    )
}