import React, { Component, useState, useEffect } from "react";


function Feeds(props){

    const comm = props.community;
    const [data, setData] = useState([]);
    const path = (props.path? props.path: "/").replace("/","");
    const type = (props.type? props.type: "");

  
    useEffect(() => {
        // code to run on component mount
        
           
           
           fetch(`/api/feed/${type}?path=${path}`)
            .then(response=>response.json())
            .then(data => {
        
                setData(data.data)
            })
            
        
      }, []);

    return(
        <div className="spj_external_feed ">
   
           {(data.feed? <div className="card mb-4">
                
                <figure>
                    <img src={data.feed.data[0].featuredimage} width="100%" />
                </figure>
                <div className="card-body">
                <h3>{data.feed.description[0]}</h3>
                {data.feed.data.map(item=> {

                    return (
                        <li key={item.link}>
                            <a href={item.link} target="_blank">{item.title}</a>
                        </li>
                    )
                })}
                </div>
                {(props.showView? 
                <a href={data.url} target="_blank" className="btn btn-primary">View</a>
                :"")}
               
           </div> : "")}
          
        </div>
    )
}

export default Feeds;