
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import Breadcrumb from "../../Components/Breadcrumb";

function About(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();



    console.log("news", params)
    useEffect(() => {
        // code to run on component mount
        

           let basicPath = "/about/spj";
            fetch(`/router/translate-path?path=${basicPath}`)
                .then(response=>response.json())
                .then(data => {
                    console.log("basic data",data);
                    let uuid = data.entity.uuid;
                    let newFetch = "/jsonapi/node/page/" + uuid;

                    fetch(newFetch).then(resp=>resp.json()).then(data=>{
                        console.log("article", data);
                        setData(data.data) 
                    })
                    
                })
        
      }, []);

      let breadData = [];

    return (
        <div>
            <Breadcrumb  />
            <h1>About</h1>
            

            <div className="row">
                <div className="col-md-9">

               
                    {(data? <div>
                    
                    
                        <br />
                        
                        <h2>{data.attributes.title}</h2>
                        
                        <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}}></div>

                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}
                </div>
                <div className="col-md-3">
                    
                </div>
            </div>
            

        </div>
    )
}

export default About;