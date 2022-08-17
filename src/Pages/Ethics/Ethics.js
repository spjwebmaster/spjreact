
import React, { Component, useState, useEffect } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Sidebar from "../../Components/Shared/Sidebar"
  

function Ethics(props){

    let params = useParams();
    let location = useLocation();
    const [data, setData] = useState();
    const pathname = location.pathname;


    useEffect(() => {
        // code to run on component mount

        fetch(`/router/translate-path?path=${pathname}`)
            .then(response=>response.json())
            .then(data => {

                let uuid = data.entity.uuid;
                let newFetch = "/jsonapi/node/page/" + uuid;

                fetch(newFetch).then(resp=>resp.json()).then(data=>{

                    setData(data.data) 
                })
                    
         })
        
      }, [pathname]);

      let breadData = [];

    return (
        <div>

            <h1>Ethics</h1>
            

            <div className="row">
                <div className="col-md-9">

               
                    {(data? <div>
                    
                    
                        <br />
                        
                        <h2>{data.attributes.title}</h2>
                        
                        <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}}></div>

                    </div>: (
                        <div>
                            Loading
                        </div>
                    
                    ))}
                </div>
                <div className="col-md-3">


                <Sidebar location={location} menu={props.menu} />

                <hr />
               

                <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
          <a href="/ethics/codeofethics" className="nav-item nav-link dropdown-toggle" data-drupal-link-system-path="node/174">Code of Ethics</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/casestudies" className="nav-item nav-link" data-drupal-link-system-path="node/301">Ethics Case Studies</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/committee" className="nav-item nav-link" data-drupal-link-system-path="node/308">Ethics Committee</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/ethicsfaq" className="nav-item nav-link" data-drupal-link-system-path="node/304">Ethics FAQ</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/hotline" className="nav-item nav-link" data-drupal-link-system-path="node/309">Ethics Hotline</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/ethicsweek" className="nav-item nav-link dropdown-toggle" data-drupal-link-system-path="node/4127">Ethics Week</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/book" className="nav-item nav-link" data-drupal-link-system-path="node/300">Media Ethics Book</a>
      </li>

                    <li className="nav-item">
          <a href="/ethics/positionpapers" className="nav-item nav-link" data-drupal-link-system-path="node/299">Position Papers</a>
      </li>

        </ul>
        
                </div>
            </div>
            

        </div>
    )
}

export default Ethics;