
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import Breadcrumb from "../../Components/Breadcrumb";
  import Sidebar from "../../Components/Shared/Sidebar"
  import Bio from "../../Components/Shared/Bio"

function Staff(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [included, setIncluded] = useState();

    useEffect(() => {
        // code to run on component mount
        
            fetch(`/jsonapi/node/bio?filter[field_role.meta.drupal_internal__target_id]=4&page[limit]=50&include=field_profile`)
                .then(response=>response.json())
                .then(data => {

                    setData(data.data);
                    setIncluded(data.included);
                    
                })
        
      }, []);

      let breadData = [];

    return (
        <div>
            
            <h1>SPJ Staff</h1>
            

            <div className="row">
                <div className="col-md-9">

               
                    {(data? <div>
                    
                        
                      {
                      data.map(item=>{

                        
                        let body = (item.attributes.body ? item.attributes.body.value: "");
                        let profileId = item.relationships.field_profile.data.id;
                        let profileImage =  included.filter(t=>t.id == profileId);
                        
                        return(

                        <div key={item.id}>

                            <Bio item={item} profile={profileImage} />

                            
                        </div>
                        )
                      }
                      )}
                      

                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}
                </div>
                <div className="col-md-3">
                <Sidebar location={location} />
                </div>
            </div>
            

        </div>
    )
}

export default Staff;