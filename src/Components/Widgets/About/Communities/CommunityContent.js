import React, { Component, useState, useEffect } from "react";


function CommunityContent(props){

    const comm = props.community;
    const [data, setData] = useState([]);
    const [committee, setCommittee] = useState([]);
    const [included, setIncluded] = useState([]);

  
    useEffect(() => {
        // code to run on component mount
        
           
           
           fetch(`/jsonapi/group_content/community-group_node-article`)
            .then(response=>response.json())
            .then(data => {
                console.log("comm content",data)
                 
            })
            
        
      }, []);

    return(
        <div>
            Content <code>TBD</code>
            <hr />

          
        </div>
    )
}

export default CommunityContent;