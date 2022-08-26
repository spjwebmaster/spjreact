import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCoffee, faFreeCodeCamp, faHandshake, faPersonBooth, faPenNib } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faPenNib} />
function CoreFour(){
    const [data, setData] = useState();


    useEffect(() => {
        // code to run on component mount

            fetch(`/jsonapi/node/what_we_do`)
                .then(response=>response.json())
                .then(data => {

                    setData(data.data)
                })
        
      }, []);

    const camelCase = function(input) { 
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    const faClassList = {
        "handshake": <FontAwesomeIcon className="fa-3x" icon={faHandshake} />,
        "person-booth": <FontAwesomeIcon  className="fa-3x" icon={faPersonBooth} />,
        "pen-nib": <FontAwesomeIcon className="fa-3x" icon={faPenNib} />,
        "free-code-camp": <FontAwesomeIcon className="fa-3x" icon={faCoffee} />


    }
    
     
    return (
        <div className="coreFour section">

            <h2>What We Do</h2>
            <div className="row">
                {(data? data.map(item=>{
                     let fas =  camelCase(item.attributes.field_font_awesome_icon.icon_name);
                     let faClass = "fa" + fas[0].toUpperCase() + fas.substring(1);
                     let retClass = faClassList[item.attributes.field_font_awesome_icon.icon_name];


                    return (
                        <div key={item.id} className="col-lg-3 col-md-6 mb-4">
                            <span className="coreFourIcon">
        
                               {retClass}

                            </span>
                            <h3 dangerouslySetInnerHTML={{__html: item.attributes.field_home_heading.value}}></h3>
                            <div dangerouslySetInnerHTML={{__html: item.attributes.body.summary}}></div>
                            
                        </div>
                    )
                }):<div>Loading</div>)}
            </div>
        </div>
    )
}

export default CoreFour;