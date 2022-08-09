import React, { Component, useState, useEffect } from "react";
import CoreFour from "../Components/Widgets/Home/CoreFour";
import HomeCalendar from "../Components/Widgets/Home/HomeCalendar";
import NewsHome from "../Components/Widgets/Home/NewsHome"

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import News from "./News/News";

function Home(){
    const [data, setData] = useState();


    useEffect(() => {
        // code to run on component mount
        

           let basicPath = "/";
            fetch(`/router/translate-path?path=${basicPath}`)
                .then(response=>response.json())
                .then(data => {
                    console.log("basic data",data);
                    let uuid = data.entity.uuid;
                    let newFetch = "/jsonapi/node/page/" + uuid;

                    fetch(newFetch).then(resp=>resp.json()).then(data=>{
                        console.log("article", data);
                        setData(data.data) 
                    })
                    
                })
        
      }, []);

    return(
        <div>
            
            <CoreFour />
            <hr />
            <div className="page_content section">
                {(data? <div>
                    <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}} ></div> 
                </div> : <div>Loading</div>)}
            </div>
            <hr />
            <HomeCalendar />
            <hr />
            <div className="section newsHome">
            <NewsHome limit="3" />
            </div>
        </div>
    )
}

export default Home;