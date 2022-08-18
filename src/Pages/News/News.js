
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";


function News(props){

    let params = useParams();
    let location = useLocation();
    const [news, setNews] = useState();
    const [newsData, setNewsData] = useState();

    
    const handleNewsClick = function(content, e){
        console.log("click",content);
        e.preventDefault();
        setNewsData(content);
        window.history.replaceState(null, "News Item", content.attributes.path.alias)
    }
    const handleNewsReturnClick = function(text,e){
        
        console.log("back button", text,e)
        e.preventDefault();
        setNewsData(null);
        window.history.replaceState(null, "News Item", '/news')
        
       
        
    }

    console.log("news", params)
    useEffect(() => {
        // code to run on component mount
        if(params.title && newsData==null){
            
            let basicPath = "/news/" + params.title;
            console.log("has title, no news set", basicPath)
            fetch(`/router/translate-path?path=${basicPath}`)
                .then(response=>response.json())
                .then(data => {
                    console.log("basic data",data);
                    let uuid = data.entity.uuid;
                    let newFetch = "/jsonapi/node/news_item/" + uuid;

                    fetch(newFetch).then(resp=>resp.json()).then(data=>{
                        console.log("article", data);
                        setNewsData(data.data) 
                    })
                    
                })
        } else {
            console.log("else")
            fetch(`/jsonapi/node/news_item?sort=-field_active_date`)
                .then(response=>response.json())
                .then(data => {
                    console.log("basic data",data.data);
                    setNews(data.data); 
                })

        }
      }, [params.title, newsData]);

      let breadData = [];

    return (
        <div>
  
            <h1>News</h1>
            

            <div className="row">
                <div className="col-md-9">

            {(newsData? <div>
               
               
                <br />
                
                <h2>{newsData.attributes.title}</h2>
                <h3>{newsData.attributes.field_active_date}</h3>
                <a href="#" onClick={handleNewsReturnClick.bind(this,"back")}>Back</a>
                <hr />
                <div dangerouslySetInnerHTML={{__html: newsData.attributes.body.value}}></div>

             </div>: (
                <div>
                {(news? news.map(item=> {

                    let summary = item.attributes.body.value;
                    summary = summary.substring(0, 500);
                    return(
                        <div key={item.id}>
                            <h3>{item.attributes.field_active_date}</h3>
                            <h2><a href="#" data-href={item.attributes.path.alias} onClick={handleNewsClick.bind(this, item)}>{item.attributes.title}</a></h2>
                            
                            <div dangerouslySetInnerHTML={{__html: summary}}></div>
    
                            <hr />
                        </div>
                    )
                }) : <div>Loading</div>)}
                </div>
             
             ))}
             </div>
                <div className="col-md-3">
                   Load sibling menu
                </div>
            </div>
            

        </div>
    )
}

export default News;