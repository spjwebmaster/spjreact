import React, { Component, useState, useEffect } from "react";

function Block(props){

    const [data, setData] = useState();

    let blockId = props.id;

    let title = props.title;

    useEffect(() => {
        // code to run on component mount

            
            fetch(`/block/${blockId}?_format=json`)
                .then(response=>response.json())
                .then(data => {
                    console.log("block data", data)
                    setData(data); 
                })

        
      }, []);

    



    return (
        <div className={`block block_${blockId}`}>
        {(data? <div>
            <h2>{(title? title: data.info[0].value)}</h2>
            <div dangerouslySetInnerHTML={{__html: data.body[0].value}}></div>
        </div> :<div>Loading Block {blockId}</div>)}
        </div>
    )
}

export default Block;