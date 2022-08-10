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

function NotFound() {

    const [redir, setRedir] = useState(false);
    let params = useParams();
    let location = useLocation();
    console.log("not found", params, location);

    if(location.pathname=="/news.asp"){
        let newhref = "/news/" + location.search;
        return <Navigate replace to={newhref} />;
    }
    return (
        <div>
            Not Found
        </div>
    );
}
export default NotFound;