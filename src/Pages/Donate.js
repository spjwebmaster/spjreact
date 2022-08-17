
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "../Components/Shared/Sidebar"
  import Block from "../Components/Shared/Block";
  import List from "../Components/Shared/List";

function Donate(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;


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
                <div className="col">

               
                    {(data? <div>
                    
                    
                        <br />
                        
                        <h1>{data.attributes.title}</h1>
                        
                        <div dangerouslySetInnerHTML={{__html: (data.attributes.body? data.attributes.body.value: "")}}></div>

                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}
                
                
                    <Block id="10" />
                    <hr />
                    <List id="donation_funds" block="block_1" include="field_donation_logo" />

                </div>

                
                
            </div>
            

        </div>
    )
}

export default Donate;