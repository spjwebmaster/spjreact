
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "../../../Components/Shared/Sidebar"
  import AwardList from "../../../Components/Widgets/Awards/AwardList";

function Awards(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;
    const widgets = props.widget;

    console.log("props", props, params)

    useEffect(() => {
        // code to run on component mount

        if(params.category){
 
            // get list of all and filter by category
            if(params.code){
                // show body of filter from the below fetch
            }
        } else {
            fetch(`/router/translate-path?path=${pathname}`)
                .then(response=>response.json())
                .then(data => {

                    let uuid = data.entity.uuid;
                    let newFetch = "/jsonapi/node/page/" + uuid;

                    fetch(newFetch).then(resp=>resp.json()).then(data=>{
                    
                        setData(data.data) 
                    })
                        
            })
        }
        
      }, [pathname]);

      let breadData = [];

    return (
        <div>
          
            <div className="row">
                <div className="col-md-9">

               
                    {(data? <div>
                    
                    
                        <br />
                        
                        <h1>{data.attributes.title}</h1>
                        
                        <div dangerouslySetInnerHTML={{__html: (data.attributes.body? data.attributes.body.value: "")}}></div>

                    </div>: (
                        <div>
                            
                        </div>
                    
                    ))}

                    {(widgets? widgets: "")}

                    {(params.category? <div>Show cat: {params.category}</div>: <AwardList />)}
                </div>
                <div className="col-md-3">
                    {(params.category? "": <Sidebar location={location} menu={props.menu}  />)}
                </div>
            </div>
            

        </div>
    )
}

export default Awards;