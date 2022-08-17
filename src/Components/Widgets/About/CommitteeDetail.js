import React, { Component, useState, useEffect } from "react";

import Bio from "../../Shared/Bio";

function CommitteeDetail(props){

    const [data, setData] = useState([]);
    const [committee, setCommittee] = useState([]);
    const [included, setIncluded] = useState([]);
    const term = props.term;
  
    useEffect(() => {
        // code to run on component mount
        
           const getDesc = `/jsonapi/taxonomy_term/bio_role_association?filter[drupal_internal__tid]=${props.term}`;
           fetch(getDesc)
            .then(response=>response.json())
            .then(data => {

                  setData(data.data);

                  fetch(`/jsonapi/node/bio?filter[field_role.meta.drupal_internal__target_id]=${term}&page[limit]=50&include=field_profile`)
                    .then(response=>response.json())
                    .then(data => {
                        
                        setCommittee(data.data);
                        setIncluded(data.included);
                        
                    });
            })
        
      }, []);

    return(
        <div>
        

           {(data? data.map(item=>{
                
                return(
                    <div key={item.id}>
                        <h1>{item.attributes.name}</h1>
                        <div dangerouslySetInnerHTML={{__html:item.attributes.description.processed }}></div>
                    </div>
                )
           }): "")}


           <hr />
        {(committee? committee.map(item=>{
                let profileId = (item.relationships.field_profile.data? item.relationships.field_profile.data.id: 0);

                let profileImage = (profileId!==0? included.filter(t=>t.id == profileId): []);
                
                console.log("item", item)
                return(
                    <div key={item.id}>
                        <Bio item={item} profile={profileImage} />
                        
                    </div>
                )
           }): "")}
            
        </div>
    )
}

export default CommitteeDetail;