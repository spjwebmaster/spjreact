
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import Block from "../../Shared/Block";

function Spjjobs(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;

    
    useEffect(() => {
        // code to run on component mount

        fetch(`/jsonapi/node/employment_opportunity`)
            .then(response=>response.json())
            .then(data => {

                    setData(data.data);
               
                    
         })
        
      }, [pathname]);

      let breadData = [];

    return (
  
          <>

                {(data? <div>
                    <h2>SPJ Jobs</h2>
                    {data.map(item=> {

                        //filter by due date

                        return(<div key={item.id}>
                            <h3>{item.attributes.title}</h3>
                            <div dangerouslySetInnerHTML={{__html: item.attributes.body.value}}></div>
                        </div>)
                    })}

                </div>: (
                    <div>
                        Loading
                    </div>
                
                ))}

                <Block id="3" />
            </>    
    )
}

export default Spjjobs;