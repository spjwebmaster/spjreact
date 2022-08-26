
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "../Shared/Sidebar"

function Webinar(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const [video, setVideo] = useState();
    const [instructor, setInstructor] = useState();
    const [thumb, setThumb] = useState();
    const pathname = location.pathname;
   
    const hideSidebar = (props.hideSidebar? true: false);


    useEffect(() => {
        // code to run on component mount

        fetch(`/router/translate-path?path=${pathname}`)
            .then(response=>response.json())
            .then(data => {

                let uuid = data.entity.uuid;
                let newFetch = "/jsonapi/node/page/" + uuid + "?include=field_thumb,field_instructor";

                fetch(newFetch).then(resp=>resp.json()).then(dat=>{

                   
                    if(dat.data.attributes.field_youtube_embed){
                        let full = dat.data.attributes.field_youtube_embed;
                        let id = full.substring(full.indexOf("?v=")+3, full.length);
                        setVideo("https://www.youtube.com/embed/" + id);
                    }
                    setData(dat.data) 
                    setIncluded(dat.included)

                    const instructorObj = dat.included.filter(t=>t.type=="node--bio");
                    if(instructorObj){
                        setInstructor(instructorObj);
                    }
                    console.log("webinar", dat, "inst", instructorObj);
                    
                    
                })
                    
         })
        
      }, [pathname]);

      let breadData = [];

      

    return (
        <div>
          
            <div className="row">
                <div className={(hideSidebar? "col-sm-12": "col-md-9")}>

               
                    {(data? <div>
                        
                        <h1>{data.attributes.title}</h1>
                        
                        <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}}></div>
                        <div>field_video_url: {data.attributes.field_video_url}</div>
                        
                        {(video? <div>field_youtube_embed:
                            <iframe src={video} width="100%" height="450"></iframe>
                        </div>: "")}
                           
                        <div>
                            {(data.relationships.field_instructor.data? data.relationships.field_instructor.data.id: "")}

                            {(instructor? 
                                <div>
                                    {instructor.map(item=>{
                                        return(
                                            <div key={item.id}>
                                                <h4>{item.attributes.title}</h4>
                                            </div>
                                        )
                                    })}
                                </div>: ""
                            )}
                        </div>
                        <div>field_thumb: {data.relationships.field_thumb.data.id}</div>

                        
                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}

                    
                </div>

                {(hideSidebar? 
                <div className="col-md-3">
                    <Sidebar location={location} menu={props.menu} />
                </div>

                :"")}
            </div>
            

        </div>
    )
}

export default Webinar;