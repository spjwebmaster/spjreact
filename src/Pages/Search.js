import React, { Component, useState, useEffect } from "react";
import {
    Routes, 
    Route, 
    Link,
    useLocation,
    useNavigate,
    useParams,
    BrowserRouter,
    Redirect,
    Navigate
  } from "react-router-dom";
function Search(props){

    let params = useParams();
    let location = useLocation();
    const [results, setResults] = useState([]);

    useEffect(() => {
        // code to run on component mount
        

            const term = (params.term? params.term:null);
            if(term) {

                fetch(`/jsonapi/index/default_index?filter[fulltext]=${term}`)
                    .then(response=>response.json())
                    .then(data => {
                        setResults(data.data)
                        console.log(data)
                    })
            }
      }, []);

    return (
        <div>
            <h1>Search page</h1>
            <section className="search_box">
                <input type="text" className="form-control" placeholder="Search" />
            </section>

            {(results? results.map(res=>{

                let alias = (res.attributes.path? res.attributes.path.alias: "-");
                return(
                    <div key={res.id}>
                        <h3>{res.attributes.title}</h3>
                        <span>{alias}</span><br />
                        <span className="badge bg-info">{res.type}</span>


                        <hr />
                    </div>
                )
            }) : <div>No results</div>)}


        </div>
    )
}

export default Search;