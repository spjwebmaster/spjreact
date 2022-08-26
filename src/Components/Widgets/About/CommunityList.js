


import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";


function CommunityList(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const pathname = location.pathname;
    let catList = [];
    
    useEffect(() => {
        // code to run on component mount

        fetch(`/jsonapi/views/communities/block_1?include=field_community_image`)
            .then(response=>response.json())
            .then(data => {

                    setData(data.data);
                    setIncluded(data.included)
                    console.log("community", data)
               
                    
         })
        
      }, [pathname]);

      let breadData = [];

    return (
  
          <>

                {(data? <div>
                

                    {data.map(item=> {

                        const mediaId= item.relationships.field_community_image.data.id;
                        const media = included.filter(t=>t.id==mediaId);
                        console.log("mdia", media)

                        
                        return(<div key={item.id} className="mb-4 mt-4  pt-4">
                           
                            <h2 className="pb-2"><a href={item.attributes.field_path}>{item.attributes.label}</a></h2>
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src={media[0].attributes.uri.url} alt={item.attributes.label} width="100%" className="block" />
                                </div>
                                <div className="col">
                                    <div dangerouslySetInnerHTML={{__html: item.attributes.field_about_te.value}}></div>
                                    <a href={item.attributes.field_join_link.uri} className="btn btn-primary">
                                        {item.attributes.field_join_link.title}
                                    </a>
                                </div>
                            </div>
                            
                            <hr />
                        </div>)
                        
                        

                        //filter by due date

                       
                    })}

                </div>: (
                    <div>
                        Loading
                    </div>
                
                ))}

               
            </>    
    )
}

export default CommunityList;