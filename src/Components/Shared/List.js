import React, { Component, useState, useEffect } from "react";

function List(props){

    const [data, setData] = useState();
    const [included, setIncluded] = useState();

    let blockId = props.id;
    let blockNum = props.block;
    let includeField = (props.include? props.include: "");
    let ajaxUrl = `/jsonapi/views/${blockId}/${blockNum}`;
    if(includeField!==""){
        ajaxUrl += "?include=" + includeField;
    }

    useEffect(() => {
        // code to run on component mount
        
        
            
            fetch(ajaxUrl)
                .then(response=>response.json())
                .then(data => {
                    console.log(ajaxUrl,"list data", data)
                    setData(data.data); 
                    setIncluded(data.included)
                })

        
      }, []);



    return (
      
        <div>
        {(data? <div>

            {data.map(item=>{
                const mediaId = (includeField!=""? (item.relationships[includeField]? item.relationships[includeField].data.id: null): null);
                const mediaItem = (included? included.filter(t=>t.id==mediaId): null);
                
                const anchorLink = (item.attributes.path? item.attributes.path.alias: item.attributes.field_path);

                console.log("anchorLink", anchorLink);
                return(
                    <div key={item.id}>
                       
                        <div className="row">
                            <div className="col">
                            <h2><a href={anchorLink}>{item.attributes.title}</a></h2>
                                <div dangerouslySetInnerHTML={{__html: item.attributes.body.processed}}></div>
                            </div>
                            
                            {(mediaItem? <div className="col-sm-3">
                                
                                <img src={mediaItem[0].attributes.uri.url} style={{width:"100%"}} />
                            </div>: "")}
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div> :<div>Loading Block {blockId}</div>)}
        </div>
        
    )
}

export default List;