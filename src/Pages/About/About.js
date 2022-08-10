
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import Breadcrumb from "../../Components/Breadcrumb";
  import Sidebar from "../../Components/Shared/Sidebar"
  import Committees from "../../Components/Widgets/About/Committees";

function About(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;

    
    console.log("about path", pathname)
    useEffect(() => {
        // code to run on component mount
        
            let basicPath = pathname;
            if(basicPath=="/about/" || basicPath=="/about"){
                basicPath = "/about/spj";
            }

            fetch(`/router/translate-path?path=${basicPath}`)
                .then(response=>response.json())
                .then(data => {

                    let uuid = data.entity.uuid;
                    let newFetch = "/jsonapi/node/page/" + uuid;

                    fetch(newFetch).then(resp=>resp.json()).then(data=>{

                        setData(data.data) 
                    })
                    
                })
        
      }, []);

     
     

    return (
        <div>
      

            

            <div className="row">
                <div className="col-md-9">

               
                    {(data? <div>
                    
                    
                        <br />
                        
                        <h1>{data.attributes.title}</h1>
                        
                        <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}}></div>

                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}

                    
                    <Widget pathname={pathname}/>
                </div>
                 

                <div className="col-md-3">
                    <Sidebar location={location} menu={props.menu} />
                </div>
            </div>
            

        </div>
    )
}

const Widget = function(pathname){


    console.log("pathname",pathname.pathname)
    const widgetList = {
        "/about/committees": <Committees />,
    }


    return widgetList[pathname.pathname];
    
    
  }

export default About;