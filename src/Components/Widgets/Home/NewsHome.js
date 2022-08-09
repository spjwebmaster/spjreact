import React, { Component, useState, useEffect } from "react";
import News from "../../Shared/News";

function NewsHome(props){

    const [news, setNews] = useState();
    const limit = props.limit;


    return (
        <div className="section newsHome p-5 alignfull bg-danger text-white">
            <div className="container">
            <h2>SPJ News</h2>
                <News limit="3" />
                <a href="/news">See All news</a>
            </div>
        </div>
    )
}

export default NewsHome;