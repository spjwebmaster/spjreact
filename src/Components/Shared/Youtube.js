import React, { Component, useState, useEffect } from "react";


function Youtube(props){

    const comm = props.community;
    const [data, setData] = useState([]);
    const path = (props.path? props.path: "/").replace("/","");
  
    useEffect(() => {
        // code to run on component mount
        
           
           
           fetch(`/api/spjyoutube?path=${path}`)
            .then(response=>response.json())
            .then(data => {
                console.log("youtube content",data)
                setData(data.data)
            })
            
        
      }, []);

    return(
        <div className="spjyoutube">
   
            {(data.feed? <div>
                <h3>{data.feed.author.name}</h3>
                {data.feed.message}
                <figure>
                <a href={data.feed.author.uri[0]} target="_blank">
                    <img src={data.feed.thumb} width="200" />
                    </a>
                </figure>
                <ul>
                    {data.feed.entries.map(item=>{

                        return (
                            <li key={item.url}>
                                <a href={item.url} target="blank">{item.title[0]}</a>
                            </li>
                        )
                    })}
                </ul>
                <a href={data.feed.author.uri[0]} target="_blank">View Channel</a>
            </div>: "")}
          
        </div>
    )
}

export default Youtube;