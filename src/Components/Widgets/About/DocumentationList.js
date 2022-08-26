
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";


function DocumentationList(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const [included, setIncluded] = useState();
    const pathname = location.pathname;
    let catList = [];
    
    useEffect(() => {
        // code to run on component mount

        fetch(`/jsonapi/views/bylaws_and_documentation/block_1?include=field_category`)
            .then(response=>response.json())
            .then(data => {

                    setData(data.data);
                    setIncluded(data.included)

               
                    
         })
        
      }, [pathname]);

      let breadData = [];

    return (
  
          <>

                {(data? <div>
                    <h2>Documentation</h2>

                    {data.map(item=> {

                        const catId = item.relationships.field_category.data.id;
                        const category = included.filter(t=>t.id==catId);
                        const thisCat = category[0].attributes.name.trim();
                        
                        let catHeading = "";
                        if(!catList.includes(thisCat)){
                            catList.push(thisCat);
                            catHeading = <h3>{thisCat}</h3>
                        }
                        

                        
                        return(<div key={item.id}>
                            {catHeading}
                            <a href={item.attributes.path.alias}>{item.attributes.title}</a>
                            
                        </div>)
                        
                        

                        //filter by due date

                       
                    })}

                </div>: (
                    <div>
                        Loading
                    </div>
                
                ))}

               
            </>    
    )
}

export default DocumentationList;