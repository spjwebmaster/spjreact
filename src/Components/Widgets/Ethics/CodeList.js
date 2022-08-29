import React, { Component, useState, useEffect } from "react";

function CodeList(props){

    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const [term, setTerm] = useState();

    let blockId = props.id;
    let blockNum = props.block;
    let includeField = (props.include? props.include: "");
    let ajaxUrl = `/jsonapi/views/${blockId}/${blockNum}`;
        ajaxUrl += "?include=field_code_of_ethics_category";
    

    useEffect(() => {
        // code to run on component mount
        
        
            
            fetch(ajaxUrl)
                .then(response=>response.json())
                .then(data => {
                    console.log("codelist data", data)
                    setData(data.data); 
                    setIncluded(data.included);

                    let temp = {
                        "name": data.included[0].attributes.name,
                        "desc": data.included[0].attributes.description.value,
                    }
                    setTerm(temp);
                    
                })

        
      }, []);



    return (
      
        <div>
        {(data? <div className="card"><div className="card-header">
            {(term? <div>
                <h2>{term.name}</h2>
                <div dangerouslySetInnerHTML={{__html: term.desc}}></div>
                </div>: "")}
                </div>
                <div className="card-body">
            {data.map(item=>{
                

                const body = (props.summaryOnly? item.attributes.body.summary: item.attributes.body.processed);
                return(
                    <div key={item.id}>
                        <a href={item.attributes.path.alias}>{item.attributes.title}</a>
                        <hr />

                    </div>
                )
            })}
        </div></div> :<div>Loading Block {blockId}</div>)}
        </div>
        
    )
}

export default CodeList;