
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "./Sidebar"

function BasicPage(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;
    const widgets = props.widget;
    const hideSidebar = (props.hideSidebar? true: false);


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
          
            <div className="row">
                <div className={(hideSidebar? "col-sm-12": "col-md-9")}>

               
                    {(data? <div>
                    
                        <h1>{data.attributes.title}</h1>
                        
                        <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}}></div>

                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}

                    {(widgets? widgets: "")}
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

export default BasicPage;