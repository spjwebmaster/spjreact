
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import Breadcrumb from "../../Components/Breadcrumb";

  import CommitteeList from "../../Components/Widgets/About/CommitteeList";
  import CommitteeDetail from "../../Components/Widgets/About/CommitteeDetail";

function Committees(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [committee, setCommittee] = useState([])
    const [included, setIncluded] = useState([])
    const pathname = location.pathname;
    console.log("params",params, props)

    useEffect(() => {
        // code to run on component mount
        
            let basicPath = pathname;
            basicPath = "/about/committees/"
            if(params.term){
                console.log("term",params.term);

            } else {
            
            fetch(`/router/translate-path?path=${basicPath}`)
                .then(response=>response.json())
                .then(data => {

                    let uuid = data.entity.uuid;
                    let newFetch = "/jsonapi/node/page/" + uuid;

                    fetch(newFetch).then(resp=>resp.json()).then(data=>{

                        setData(data.data) 
                    })
                    
                })
            }
        
      }, []);

     
     

    return (
        <div>
      

            <div className="row">
                <div className="col">

               
                    {(data? <div>
                    
                    
                        <br />
                        
                        <h1>{data.attributes.title}</h1>
                        
                        <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}}></div>

                    </div>: (
                        ""
                    
                    ))}

                    
                    {(params.term ? <div>
                            <CommitteeDetail term={params.term} />
                        </div> : <CommitteeList />)}
                    
                </div>
                 

                <div className="col-md-3">
                    
                </div>
            </div>
            

        </div>
    )
}


export default Committees;