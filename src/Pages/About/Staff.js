
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import Breadcrumb from "../../Components/Breadcrumb";
  import Sidebar from "../../Components/Shared/Sidebar"

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
                    console.log("staff", data)
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
                        console.log("profile", profileImage)
                        return(

                        <div key={item.id}>

                            <div className="row">
                                <div className="col-md-9">

                                    
                                    <h2>{item.attributes.title}</h2>
                                    <strong>{item.attributes.field_title}</strong>
                                    <div>
                                        
                                        {item.relationships.field_role.data.map(role=>{
                                            return(
                                                <span key={role.id} className="badge bg-info">
                                                    Role id: {role.meta.drupal_internal__target_id}
                                                </span> 
                                                
                                            )
                                        })}
                                        <span>&nbsp;</span>

                                        {item.attributes.field_email? 
                                            <span className="badge bg-dark">
                                                <a href={`mailto:${item.attributes.field_email}`} className="text-white">
                                                    {item.attributes.field_email}
                                                </a>
                                            </span>: ""}

                                    <span>&nbsp;</span>
                                        {item.attributes.field_phone_number? 
                                        <span className="badge bg-warning">
                                            {item.attributes.field_phone_number}
                                            </span>: ""}
                                    </div>

                                    <div dangerouslySetInnerHTML={{__html: body}}></div>
                                </div>
                                <div className="col-md-3">
                                
                                    <img src={`/sites/default/files/styles/media_library/public/${profileImage[0].attributes.name}`} className="bio-profile" width="100%" />
                                            <br />
                                    {profileImage[0].attributes.name}
                                 </div>
                            </div>
                            <hr />
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