
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "../../Components/Shared/Sidebar"
  import List from "../../Components/Shared/List";
  import CodeList from "../../Components/Widgets/Ethics/CodeList";

function Codeofethics(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;
    const widgets = props.widget;
    const hideSidebar = (props.hideSidebar? true: false);
    console.log("hide sidebar", hideSidebar)


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

                    <hr />
                    <CodeList id="code_of_ethics_list" block="block_1" /><br />
                    <CodeList id="code_of_ethics_list" block="block_2" /><br />
                    <CodeList id="code_of_ethics_list" block="block_3" /><br />
                    <CodeList id="code_of_ethics_list" block="block_4" /><br />
                </div>

                {(hideSidebar==false? 
                <div className="col-md-3">
                    <Sidebar location={location} menu={props.menu} />
                </div>

                :"")}
            </div>
            

        </div>
    )
}

export default Codeofethics;