import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Feeds from "./Feeds";

function Related(props){


    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const pageID = props.pageID;


    let path = location.pathname;
    if(path=="/"){
        path = "<front>";
    }



    useEffect(() => {
        // code to run on component mount
        
           

            fetch(`/jsonapi/views/related_content/block_11?views-argument%5B0%5D=${path}&include=field_thumb`)
                .then(response=>response.json())
                .then(data => {

   
                    setData(data.data)
                    setIncluded(data.included);
                    
                    
                })
        
      }, []);


    return (
        <div>
            <h2>Related Content</h2>
            <div className="row relatedContentRow">
            {(data?  data.map(item=>{

                const type = (item.relationships.node_type? item.relationships.node_type.data.meta.drupal_internal__target_id: "");
                const body = (item.attributes.body?
                        (item.attributes.body.summary? item.attributes.body.summary: item.attributes.body.processed)
                         :  "");
                const thumbID = (item.relationships.field_thumb.data? item.relationships.field_thumb.data.id: 0);
                const media = (thumbID!=0? included.filter(t=>t.id == thumbID): []);


                const featured = (media.length? media[0].attributes.uri.url : "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg");


                const thisID = item.id;
               
                let hideThis = false;
                if(pageID==item.id){
                    hideThis = true;
                }

                if(item.id =="44b66572-c10d-4ce5-a621-8d16f852e506"){
                    console.log("race no path alias", item)
                }

                if(!hideThis){
                    return(
                    
                    
                        <div key={item.id} className="col-lg-3 col-md-6 relatedCard">
                            <div className="card mb-4">
                               
                                <figure>
                                    <img src={featured} style={{width: "100%"}} />
                                </figure>
                               
                                <div className="card-body">
                                <h3>{item.attributes.title}</h3>
                                    <div dangerouslySetInnerHTML={{__html: body}}></div>
                                </div>
                                {(item.attributes.path? 
                                <a href={item.attributes.path.alias} className="btn btn-primary">
                                    View
                                </a>
                                 : "get other link" )}
                            </div>
                        </div>
                        
                    )
                } else {
                    return "";
                }
                
            }): <div></div>)}

                <div className="col-lg-3 col-md-6 relatedCard">

                    
                    <Feeds type="JT" path={location.pathname} showView={true} />
                    
                </div>
                <div className="col-lg-3 col-md-6 relatedCard">
                   
                    <Feeds type="Quill"  path={location.pathname} showView={true} />
                    
                </div>
            </div>
        </div>
    )
}

export default Related;