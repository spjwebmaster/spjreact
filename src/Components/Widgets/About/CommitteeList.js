import React, { Component, useState, useEffect } from "react";

function CommitteeList(props){

    const [data, setData] = useState([]);
    useEffect(() => {
        // code to run on component mount
        
            fetch(`/jsonapi/views/committees_taxonomy/block_2`)
                .then(response=>response.json())
                .then(data => {

                  console.log("committee", data)
                  setData(data.data);

                  
                })
        
      }, []);

    return(
        <div>
            
            
            {data && data.map(item=> {

                return(
                    <div key={item.id}>
                        <h3>
                            <a href={`/about/committees/${item.attributes.drupal_internal__tid}`}>
                            {item.attributes.name}
                            </a>
                        </h3> 
                        <span className="badge bg-info">{item.attributes.drupal_internal__tid}</span>
                        <div dangerouslySetInnerHTML={{__html: (item.attributes.description? item.attributes.description.processed: "")}}></div>
                        <hr />
                    </div>
                )
            })}
            
        </div>
    )
}

export default CommitteeList;