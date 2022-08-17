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
  import Highlighter from "react-highlight-words";

function Search(props){

    const splitter = function(string){

        let bigOle = [];
        let splits = string.split(" ");
        splits.forEach(element => {

            var reg = `("${element}")(?![^<]*>|[^<>]*</)`; 
            console.log("reg", reg)
            bigOle.push(
            <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[element]}
                autoEscape={true}
                textToHighlight={element}
            />);
        });

        //console.log("bigOle", bigOle)
        return "splittehere"

    }
    const highlightMatchesInString= function(string, query) {
        // the completed string will be itself if already set, otherwise, the string that was passed in
        var completedString = completedString || string;
        query.forEach(function(item) {
            var reg = `("${item}")(?![^<]*>|[^<>]*</)`; 
            // explanation: http://stackoverflow.com/a/18622606/1147859
            var regex = new RegExp(reg, "i");
            // If the regex doesn't match the string just exit
            if (!string.match(regex)) {
                return;
            }
            // Otherwise, get to highlighting
            var matchStartPosition = string.match(regex).index;
            var matchEndPosition = matchStartPosition + string.match(regex)[0].toString().length;
            var originalTextFoundByRegex = string.substring(matchStartPosition, matchEndPosition);
            completedString = completedString.replace(regex, `<mark class="sch-Result_Highlight">${originalTextFoundByRegex}</mark>`);
        });
        return completedString;
    }

    let params = useParams();
    let location = useLocation();
    const term = (params.term? params.term:null);
    const [results, setResults] = useState([]);
    
    const [search, setSearch] = useState(term)
    const setContent = html => {

        var stripedHtml = html.replace(/<[^>]+>/g, '');
        return stripedHtml
    }

    const handleChange = e => {
        console.log(e.target.value);
        setSearch(e.target.value)
      };

    const setTerm = function(node){
        console.log(node)
        //setSearch(node.target.value);
    }
    const runTerm = function(){
        window.location.href=  "/search/" + search;
    }

    
    useEffect(() => {
        // code to run on component mount
        

            
            if(term) {

                //let url = `/jsonapi/views/search_block/page_1?views-filter%5Bkeys%5D=${term}`
                //console.log("fetch", url)
                let url = `/jsonapi/index/default_index?filter[fulltext]=${term}`;
                fetch(url)
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
                <div className="input-group">
                <input type="text" className="form-control" onChange={handleChange} value={search} placeholder="Search" />
                <button className="btn btn-primary" onClick={()=>runTerm(this)}>Search</button>
                </div>
            </section>

            <hr />

            {(results.length? results.map(res=>{

                let alias = (res.attributes.path? res.attributes.path.alias: "-");
                return(
                    <div key={res.id}>
                        <h3><a href={alias}>{res.attributes.title}</a></h3>
                        <span className="badge bg-info">{res.type}</span>
                        <br />
                        {splitter((res.attributes.body? res.attributes.body.value: ""))}
                        <hr />
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[term]}
                            autoEscape={true}
                            textToHighlight={setContent((res.attributes.body? res.attributes.body.value: ""))}
                        />
                       
                       
                        <hr />
                        
                    </div>
                )
            }) : <div>No results</div>)}


        </div>
    )
}

export default Search;