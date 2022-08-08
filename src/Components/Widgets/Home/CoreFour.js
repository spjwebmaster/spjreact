import React, { Component, useState, useEffect } from "react";

function CoreFour(){
    const [data, setData] = useState();


    useEffect(() => {
        // code to run on component mount

            fetch(`/jsonapi/node/what_we_do`)
                .then(response=>response.json())
                .then(data => {
                    console.log("basic data",data.data);
                    setData(data.data)
                })
        
      }, []);


    return (
        <div className="coreFour">
            <div className="row">
                {(data? data.map(item=>{
                    return (
                        <div key={item.id} className="col-sm-3">
                            <span className={`${item.attributes.field_font_awesome_icon.icon_name} ${item.attributes.field_font_awesome_icon.style}`}>Icon</span>
                            <h3 dangerouslySetInnerHTML={{__html: item.attributes.field_home_heading.value}}></h3>
                            <div dangerouslySetInnerHTML={{__html: item.attributes.body.summary}}></div>
                            
                        </div>
                    )
                }):<div>Loading</div>)}
            </div>
        </div>
    )
}

export default CoreFour;