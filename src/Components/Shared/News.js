import React, { Component, useState, useEffect } from "react";

function News(props){

    const [news, setNews] = useState();
    const limit = props.limit;


    useEffect(() => {
        // code to run on component mount

        
            fetch(`/jsonapi/node/news_item?sort=-field_active_date&page[limit]=${limit}`)
                .then(response=>response.json())
                .then(data => {

                    setNews(data.data); 
                })

        
      }, []);



    return (
        <ul className="widget-list">
        
            
           
                {(news? news.map(item=> {

                    let summary = item.attributes.body.value;
                    summary = summary.substring(0, 500);
                    return(
                        <li key={item.id}>
                            <h3>{item.attributes.field_active_date}</h3>
                            <h4>
                                <a href="#" data-href={item.attributes.path.alias}>{item.attributes.title}
                                </a>
                            </h4>
                            
                            
                        </li>
                    )
                }) : <div>loading</div>)} 
         </ul>
    )
}

export default News;