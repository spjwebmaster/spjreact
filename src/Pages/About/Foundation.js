
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import Breadcrumb from "../../Components/Breadcrumb";
  import Sidebar from "../../Components/Shared/Sidebar"

function Foundation(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;

    console.log("about", pathname)
    useEffect(() => {
        // code to run on component mount

        fetch(`/router/translate-path?path=${pathname}`)
            .then(response=>response.json())
            .then(data => {

                let uuid = data.entity.uuid;
                let newFetch = "/jsonapi/node/page/" + uuid;

                fetch(newFetch).then(resp=>resp.json()).then(data=>{

                    setData(data.data) 
                })
                    
         })
        
      }, [pathname]);

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
                    <Sidebar location={location} />
                </div>
            </div>
            

        </div>
    )
}

export default Foundation;