import React, { Component, useState, useEffect } from "react";

function FAQ(props){

    const [data, setData] = useState();
    const view = props.view;


    useEffect(() => {
        // code to run on component mount

        
            fetch(`/jsonapi/views/faqs/block_1?views-argument%5B0%5D=${view}`)
                .then(response=>response.json())
                .then(data => {

                    setData(data.data); 
                })

        
      }, []);



    return (
        <div className="faq-list">
        
            
           
                {(data? data.map(item=> {

                    
                    return(
                        <div key={item.id}>
                           <h3>{item.attributes.title}</h3>
                            <div dangerouslySetInnerHTML={{__html: item.attributes.body.value}}></div>
                            <hr />
                        </div>
                    )
                }) : <div>loading</div>)} 
         </div>
    )
}

export default FAQ;